import { ConfigService } from "@nestjs/config"
import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { join } from "path"

export const typeOrmConfig = ( configService : ConfigService ) : TypeOrmModuleOptions => {

    return {
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASS'),
    database: configService.get('DATABASE_NAME'),
    ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
    extra: { family: 4 },   // ← fuerza IPv4 en el driver pg
    logging: true,
    entities: [ join(__dirname + '../../**/*.entity.{js,ts}') ],
    synchronize: true,
    migrationsRun: false,
        
    }   

}