import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';

@Injectable()
export class TransactionsService {

  constructor (
    @InjectRepository( Transaction )
    private readonly transactionRepository$ : Repository< Transaction > ,
  
    @InjectRepository( TransactionContents )
    private readonly transactionContentsRepository$ : Repository< TransactionContents > ,

    @InjectRepository( Product )
    private readonly productRepository$ : Repository< Product >
  ) {}

  errors : string[] = []

  async create(createTransactionDto: CreateTransactionDto) {
  
    // first of all , the global repository manager

    await this.productRepository$.manager.transaction( async ( transactionEntityManager ) => {

      const transaction = new Transaction() ;
      
      const totalPrice = createTransactionDto.contents.reduce( (total, item) => total + (item.quantity * item.priceAtTransactionDate) , 0)

      transaction.total = totalPrice ;
  
      //await transactionEntityManager.save( transaction )
  
  
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
          
  
        productToBuy.inventory -= contents.quantity ;     // productToBuy.inventory = productToBuy.inventory - contents.quantity
        

        const transactionContent = new TransactionContents() ;

        transactionContent.priceAtTransactionDate = contents.priceAtTransactionDate ;
        transactionContent.product = productToBuy ;
        transactionContent.quantity = contents.quantity
        transactionContent.transaction = transaction

        await transactionEntityManager.save( transaction ) ;

        await transactionEntityManager.save( transactionContent ) ;

        /* equivalente a await transactionEntityManager.save( transactionContent ) ;
        await this.transactionContentsRepository$.save(
          {
            ...contents,
            transaction,
            product: productToBuy
          }
        )
        */
      }


    } )

    return "Sale successfully registered"

  }


  findAll( transactionDate? : string ) {
    
    const options : FindManyOptions<Transaction> = {
      relations: {contents: {product: true} }
    }

    if( transactionDate ) {
      const formattedDate : Date = parseISO(  transactionDate) ;
      console.log( formattedDate  )

      if( !isValid(formattedDate) ) throw new BadRequestException( "Invalid date" ) ;

      const startOfTheDay = startOfDay( formattedDate )

      const endOfTheDay = endOfDay( formattedDate ) ;

      console.log( startOfTheDay )
      console.log( endOfTheDay )


      options.where = {
        transactionDate: Between( startOfTheDay, endOfTheDay )
      } 
      

    }


    return this.transactionRepository$.find( options ) ;

  }


  async findOne(id: number) {
  
    const options : FindManyOptions<Transaction> = {
      where: {id: id} ,
      relations: {contents: {product: true } }
    }

    const transaction = await this.transactionRepository$.findOne( options )

    if( !transaction ) throw new NotFoundException( `Transaction #${id} not founded`) ;

    return transaction

  }


  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }


  async remove(id: number) {
    
    const transaction = await this.findOne( id ) ;

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
