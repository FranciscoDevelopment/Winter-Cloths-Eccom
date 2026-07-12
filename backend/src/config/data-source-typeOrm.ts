import { DataSource } from "typeorm";
import { join } from "path";
import * as dotenv from 'dotenv'

// Lee el .env manualmente
dotenv.config()


export const appDataSourceForTypeOrmCliCommands = new DataSource( {

    type: "postgres" ,
    host:  process.env.DATABASE_HOST ,
    port: Number(process.env.DATABASE_PORT) ,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS ,
    database: process.env.DATABASE_NAME,

    entities: [ join( __dirname, '../../**/*.entity.{js,ts}' ) ] ,
    migrations: [ join(__dirname, '../../migrations/**/*.{js,ts}') ]



} )