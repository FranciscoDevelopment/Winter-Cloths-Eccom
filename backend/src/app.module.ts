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
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [

    ThrottlerModule.forRoot(
      [
        {
          ttl: 60000,
          limit: 10
        }
      ]
    ) ,
    
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
  
    UsersModule,
  
    AuthModule
  
  ],
  controllers: [AppController],
  providers: [
    {provide: APP_GUARD, useClass: ThrottlerGuard},
    AppService,
    S3UploadService
  ],
})
export class AppModule {}
