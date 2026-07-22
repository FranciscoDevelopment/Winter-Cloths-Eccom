import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Repository } from 'typeorm';

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

  
  async create(createTransactionDto: CreateTransactionDto) {
  
    const transaction = new Transaction() ;

    transaction.total = createTransactionDto.total ;

    await this.transactionRepository$.save( transaction )

    return "Sale successfully registered"

  }


  findAll() {
    return `This action returns all transactions`;
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
