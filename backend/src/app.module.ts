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
import { RolesGuard } from './auth/guards/role/roles.guard';


@Module({
  imports: [

    ThrottlerModule.forRoot(
      [
        {
          name: 'long',
          ttl: 120000,
          limit: 10
        },
        {
          name: 'short',
          ttl: 1000,
          limit: 3
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
    {provide: APP_GUARD, useClass: RolesGuard },
    AppService,
    S3UploadService
  ],
})
export class AppModule {}
