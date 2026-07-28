import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Product } from 'src/products/entities/product.entity';
import { Cupon } from 'src/cupons/entities/cupon.entity';
import { CuponsService } from 'src/cupons/cupons.service';
import { CuponsModule } from 'src/cupons/cupons.module';

@Module({
  imports: [ 
    TypeOrmModule.forFeature( [ Transaction, TransactionContents , Product ] ),
    CuponsModule 
  ] ,
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
