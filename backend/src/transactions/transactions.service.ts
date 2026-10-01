import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';
import { CuponsService } from 'src/cupons/cupons.service';
import { JwtPayloadT } from 'src/common/types/jwt.types';
import { RoleEnum } from 'src/common/types/role.types';


@Injectable()
export class TransactionsService {

  constructor (
    @InjectRepository( Transaction )
    private readonly transactionRepository$ : Repository< Transaction > ,
  
    @InjectRepository( TransactionContents )
    private readonly transactionContentsRepository$ : Repository< TransactionContents > ,

    @InjectRepository( Product )
    private readonly productRepository$ : Repository< Product > ,

    private readonly cuponsService : CuponsService 
  
  ) {}

  errors : string[] = []

  async create(createTransactionDto: CreateTransactionDto, userId : string) {

    await this.productRepository$.manager.transaction( async ( transactionEntityManager ) => {

      const transaction = new Transaction() ;
      
      transaction.userId = userId ;

      const totalPrice = createTransactionDto.contents.reduce( (total, item) => total + (item.quantity * item.priceAtTransactionDate) , 0)

      transaction.total = totalPrice ;

      if( createTransactionDto.cupon ) {

        const cuponResponse = await this.cuponsService.applyCupon( createTransactionDto.cupon )
        
        const discount = ( cuponResponse.cupon.porcentage / 100 ) * totalPrice ;

        transaction.discount = discount ;

        transaction.cupon = cuponResponse.cupon.name ;

        transaction.total -= discount

      }
    
  
      for( const contents of createTransactionDto.contents ) {
  
        const productToBuy = await transactionEntityManager.findOneBy( Product, {id: contents.productId } )
        

        if( !productToBuy ) {
  
          this.errors.push( `The input product #${contents.productId} doen't exist` ) ;
  
          throw new NotFoundException( this.errors ) ;
        }

        
        if( contents.quantity > productToBuy.inventory ) {

          this.errors.push( `The article ${productToBuy.name} exceeds in quantity the available in stock` )

          throw new BadRequestException( this.errors ) ;
        } 
        
        productToBuy.inventory -= contents.quantity ;
        

        const transactionContent = new TransactionContents() ;

        transactionContent.priceAtTransactionDate = contents.priceAtTransactionDate ;
        transactionContent.product = productToBuy ;
        transactionContent.quantity = contents.quantity
        transactionContent.transaction = transaction

        await transactionEntityManager.save( transaction ) ;

        await transactionEntityManager.save( transactionContent ) ;

      }

    } )

    return {
      message: "Purchase registered successfully"
    }

  }


  findAll( transactionDate? : string ) {
    
    const options : FindManyOptions<Transaction> = {
      relations: {contents: {product: true} }
    }

    if( transactionDate ) {
      const formattedDate : Date = parseISO(  transactionDate) ;

      if( !isValid(formattedDate) ) throw new BadRequestException( "Invalid date" ) ;

      const startOfTheDay = startOfDay( formattedDate )

      const endOfTheDay = endOfDay( formattedDate ) ;


      options.where = {
        transactionDate: Between( startOfTheDay, endOfTheDay )
      } 
      

    }

    return this.transactionRepository$.find( options ) ;

  }


  async findOne(id: number, requester : JwtPayloadT) {
    

    const transaction = await this.transactionRepository$.findOne(
      {
        where: {id},
        relations: { contents: {product: true} }
      }
    )

    if( !transaction ) throw new NotFoundException( `Transaction #${id} not founded`) ;


    const isOwner = transaction.userId === requester.sub ;


    const isAdmin = requester.role === RoleEnum.ADMIN ;


    if( !isOwner && !isAdmin ) throw new ForbiddenException( 'Access denied for this transaction' ) ;


    return transaction ;

  }


  async update(id: number, updateTransactionDto: UpdateTransactionDto, requester : JwtPayloadT) {

    const transactionToUpdate = await this.findOne( id, requester ) ;  // ya carga contents y products


    await this.productRepository$.manager.transaction( async ( entityManager ) => {


      if( updateTransactionDto.contents ) {

        for( const content of transactionToUpdate.contents ) {

          const product = await entityManager.findOneBy( Product, {id: content.product.id} ) ;

          if( !product ) {
            
            this.errors.push( `Product #${content.product.id} no longer exists` ) ;
            
            throw new NotFoundException( this.errors ) ;

          }

          product.inventory = product.inventory + content.quantity ;

          await entityManager.save( product ) ;

        }

        await entityManager.remove( TransactionContents, transactionToUpdate.contents ) ;


        const newContentsUpdated : TransactionContents[] = [] ;

        for ( const contentDto of updateTransactionDto.contents ) {

          const product = await entityManager.findOneBy( Product, {id: contentDto.productId } ) ;

          if( !product ) {

            this.errors.push( `Product #${contentDto.productId} doesn't exist` );
            throw new NotFoundException( this.errors )

          }

          if( contentDto.quantity > product.inventory ) {

            this.errors.push( `${product.name} exceeds available stock` ) ;

            throw new BadRequestException( this.errors )

          }

          product.inventory -= contentDto.quantity ;

          await entityManager.save( product ) ;

          
          const newContent = new TransactionContents() ;

          newContent.product = product ;

          newContent.quantity = contentDto.quantity ;

          newContent.priceAtTransactionDate = contentDto.priceAtTransactionDate ;

          newContent.transaction = transactionToUpdate;

          newContentsUpdated.push( newContent ) ;

        }

        await entityManager.save( newContentsUpdated )

        transactionToUpdate.total = updateTransactionDto.contents.reduce(
          ( sum, item ) => sum + (item.quantity*item.priceAtTransactionDate)
        , 0)

      }


      if( updateTransactionDto.total !== undefined && !updateTransactionDto.contents ) {
        transactionToUpdate.total = updateTransactionDto.total
      }

      await entityManager.save( transactionToUpdate ) ;
    } )

    return `Transaction #${id} updated successfully` ;

  }


  async remove(id: number, requester : JwtPayloadT) {
    
    const transaction = await this.findOne( id, requester ) ;

    for( const contents of transaction.contents ) {

      const productToBeRefunded = await this.productRepository$.findOneBy( {id: contents.product.id } ) ;

      if( !productToBeRefunded ) {
        
        this.errors.push( `Currently, the respective product/s doesn't exist for the operation` ) ;
  
        throw new NotFoundException( this.errors ) ;
      }
      
      productToBeRefunded.inventory = productToBeRefunded.inventory + contents.quantity ;

      await this.productRepository$.save( productToBeRefunded ) ;

      
      const transactionContentsToDelete = await this.transactionContentsRepository$.findOneBy( {id: contents.id} ) ;

      if( !transactionContentsToDelete ){
        
        this.errors.push( `The respective contents doesn't exist in the #${transaction.id} transaction` ) ;
  
        throw new NotFoundException( this.errors ) ;
      }

      await this.transactionContentsRepository$.remove( transactionContentsToDelete ) ;

    }

    await this.transactionRepository$.remove( transaction ) ;

    return {message: `#${id} Transaction deleted`}

  }

}
