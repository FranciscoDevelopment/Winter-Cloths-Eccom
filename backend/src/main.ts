import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv'

dotenv.config();

const port = Number( process.env.PORT ) || Number( process.env.API_REST_PORT_SOURCE ) || Number( 3001 )

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes( 
    new ValidationPipe(
      {
        whitelist: true,
        transform: true
      }
    ) 
  
  )

  await app.listen(port) ;
}
bootstrap();
