import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Throttle } from '@nestjs/throttler';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { RefreshTokenGuard } from './guards/refresh-token/refresh-token.guard';
import { JwtPayloadT } from 'src/common/types/jwt.types';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';


@UseInterceptors( ClassSerializerInterceptor )
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}


  @Public()
  @Post('register')
  async register( @Body() registerUserDto : CreateUserDto ) {

    return await this.authService.register( registerUserDto )

  }




  @Throttle( {default: {limit: 5, ttl: 60000}} )
  @Post('login')
  @HttpCode( HttpStatus.OK )
  async login( @Body() loginUserDto : LoginDto ) {

    return await this.authService.login(loginUserDto)

  }


  @Public()
  @UseGuards( RefreshTokenGuard )
  @Post('refresh')
  @HttpCode( HttpStatus.OK )
  async refresh( @Req() req : Request ) {

    const user = req['user'] as JwtPayloadT ;

    const refreshToken = req['refreshToken'] as string ;


    return await this.authService.refresh( user.sub, refreshToken )

  }


  @Post('logout')
  @HttpCode( HttpStatus.NO_CONTENT )
  async logout( @CurrentUser('sub') userId : string ) {

    return await this.authService.logout(userId)

  }

}
