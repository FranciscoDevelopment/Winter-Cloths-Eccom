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


  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }


  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }


  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

}
