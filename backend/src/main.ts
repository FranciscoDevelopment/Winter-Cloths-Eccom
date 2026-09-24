import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv'
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet'
import { AllExeptionsFilter } from './common/filters/all-expetions.filter';


dotenv.config();

const port = Number( process.env.API_REST_PORT_SOURCE )  || Number( process.env.PORT ) || Number( 3001 )

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  const config = app.get( ConfigService )

  app.use( helmet() )

  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN'),
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
  }) ;


  app.useGlobalPipes( 
    new ValidationPipe(
      {
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        //transformOptions: {
        //  enableImplicitConversion: true
        //}
      }
    ) 
  
  )

  app.useGlobalFilters( new AllExeptionsFilter )

  await app.listen(port) ;
  
}
bootstrap();
