import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'
import { checkTheRespectiveKey, hashingKey } from 'src/common/hashing/hash-bcrypt';
import { createHash } from 'node:crypto';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login-user.dto';
import { tokensT } from 'src/common/types/jwt.types';


@Injectable()
export class AuthService {

  constructor(
    private readonly usersService : UsersService,
    private readonly jwtService : JwtService,
    private readonly configService : ConfigService
  ) {}
  
  async register( registerUserDto : CreateUserDto ) {

    const user = await this.usersService.create( registerUserDto ) ;

    const tokens = await this.generateTokens(user.id, user.email, user.role)


    return {
      user: new User(user),
      ...tokens
    }

  }


  async login( loginDto : LoginDto ) {

    const user = await this.usersService.findByEmailWithPassword( loginDto.email ) ;

    if( !user ) throw new UnauthorizedException('Invalid credentials') ;


    const passwordChecking = await checkTheRespectiveKey( loginDto.password, user.password ); 

    if( !passwordChecking ) throw new UnauthorizedException('Invalid credentials') ;


    const tokens = await this.generateTokens( user.id, user.email, user.role ) ;


    return {
      user: new User(user),
      ...tokens
    }

  }


  async refresh( userId : string, refreshToken : string ) {

    const user = await this.usersService.findByIdWithRefreshToken(userId) ;

    if( !user?.hashedRefreshToken ) throw new ForbiddenException('Access denied') ;


    const coincide = await checkTheRespectiveKey( this.resume(refreshToken), user.hashedRefreshToken )

    if( !coincide ) {

      await this.usersService.updateRefreshToken( user.id, null ) ;

      throw new ForbiddenException( 'Access denied' )

    }


    return this.generateTokens( user.id, user.email, user.role )

  }


  async logout( userId : string ) {
    await this.usersService.updateRefreshToken(userId, null)
  }

  
  private async generateTokens( userId : string, email : string, role : string ) : Promise<tokensT> {

    const payload = {sub: userId, email, role} ;

    const [ access_token, refresh_token ] = await Promise.all(
      [
        this.jwtService.signAsync( payload, {

          secret: this.configService.get<string>('JWT_SECRET'),

          expiresIn: this.expiresIn('JWT_EXPIRES_IN')

        } )
        ,
        this.jwtService.signAsync( payload, {

          secret: this.configService.get('JWT_REFRESH_SECRET'),

          expiresIn: this.expiresIn('JWT_REFRESH_EXPIRES_IN')

        } )
      ]
    )


    const hashedRefreshToken = await hashingKey( this.resume( refresh_token ) )


    await this.usersService.updateRefreshToken( userId, hashedRefreshToken )


    return {
      access_token,
      refresh_token
    }

  }


  private resume( token : string ) {

    return createHash('sha256').update(token).digest('hex')

  }


  private expiresIn( key : 'JWT_EXPIRES_IN' | 'JWT_REFRESH_EXPIRES_IN' ) {
  
    return this.configService.get<string>( key ) as JwtSignOptions['expiresIn']
  
  }


}
