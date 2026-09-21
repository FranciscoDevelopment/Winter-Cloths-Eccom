import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({})   // sin secret/signOptions por default: AuthService y RefreshTokenGuard pasan secret + expiresIn a mano en cada signAsync()/verifyAsync(), leyéndolos de ConfigService (global) recién en ese momento
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
