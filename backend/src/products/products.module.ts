import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { S3UploadService } from 'src/s3-upload/s3-upload.service';
import { TransactionContents } from 'src/transactions/entities/transaction.entity';

@Module({
  imports: [ TypeOrmModule.forFeature( [ Product, Category, TransactionContents ] ) ] ,
  controllers: [ProductsController],
  providers: [ProductsService, S3UploadService]
})
export class ProductsModule {}
