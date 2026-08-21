import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { S3UploadService } from 'src/s3-upload/s3-upload.service';

@Module({
  imports: [ TypeOrmModule.forFeature( [ Product, Category ] ) ] ,
  controllers: [ProductsController],
  providers: [ProductsService, S3UploadService]
})
export class ProductsModule {}
