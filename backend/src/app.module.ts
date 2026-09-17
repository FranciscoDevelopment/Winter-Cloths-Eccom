import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CuponsModule } from './cupons/cupons.module';
import { S3UploadService } from './s3-upload/s3-upload.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService]
    })

    ,
  
    CategoriesModule,
  
    ProductsModule,
  
    TransactionsModule,
  
    CuponsModule,
  
    UsersModule
  
  ],
  controllers: [AppController],
  providers: [AppService, S3UploadService],
})
export class AppModule {}
