import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashingKey } from 'src/common/hashing/hash-bcrypt';
import { JwtPayloadT } from 'src/common/types/jwt.types';
import { RoleEnum } from 'src/common/types/role.types';


const SELECT_PUBLIC = {
  id: true,
  email: true, 
  name: true,
  role: true,
  createdAt: true,
  updatedAt: true
} as const


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository( User )
    private readonly userRepository$ : Repository<User>

  ) {}


  async create(createUserDto: CreateUserDto) {
  
    const existingUser = await this.userRepository$.findOneBy(
      {
        email: createUserDto.email,
      }
    )

    if( existingUser ) {

      let errors : string[] = [] ;

      errors.push( `User with email "${createUserDto.email}" is already login` ) ;

      throw new ConflictException( errors )

    }
  

    const hash = await hashingKey( createUserDto.password ) ;


    const newUser = this.userRepository$.create(
      {
        ...createUserDto,
        password: hash
      },
      
    )


    const savedUser = await this.userRepository$.save( newUser );


    const { password, hashedRefreshToken, ...publicUser } = savedUser ;


    return publicUser


  }


  async findAll() {

    return await this.userRepository$.find(
      {
        select: SELECT_PUBLIC,
        order: {createdAt: 'asc'}
      }
    )
  
  }

  async findOne(id: string) {
    
    const user = await this.userRepository$.findOne(
      {
        where: {id},
        select: SELECT_PUBLIC
      }
    )

    if( !user ) throw new NotFoundException('User not founded') ;


    return user

  }


  async findByEmail ( email : string ) {

    return await this.userRepository$.findOne(
      {
        where: {email},

        select: SELECT_PUBLIC
        
      }
    )

  }


  async findByEmailWithPassword ( email : string) {

    return await this.userRepository$.findOne(
      {
        where: {email},
      }
    )

  }


  async findByIdWithRefreshToken( id : string ) {

    return await this.userRepository$.findOne(
      {
        where: {id},
        select: {
          ...SELECT_PUBLIC,
          hashedRefreshToken: true
        }
      }
    )

  }


  async update(id: string, updateUserDto: UpdateUserDto , requester : JwtPayloadT ) {
  

    const isSelf = requester.sub === id ;

    const isAdmin = ( requester.role as RoleEnum ) === RoleEnum.ADMIN ;


    if( !isSelf && !isAdmin ) {

      throw new ForbiddenException('Only can edit your own profile')

    }


    await this.findOne(id)


    if( updateUserDto.email ) {

      const inUsing = await this.userRepository$.findOne(
        {
          where: {email: updateUserDto.email},
          select: {id: true}
        }
      )


      if( inUsing && inUsing.id !== id ) throw new ConflictException( 'Already exist an user with that email' ) ;
      
    }


    if( updateUserDto.password ) {

      updateUserDto.password = await hashingKey( updateUserDto.password )

    }



    await this.userRepository$.update( id, updateUserDto )


    return this.findOne(id)
  
  }


  async remove(id: string) {
    
    const userToDelete = await this.findOne(id) ;

    await this.userRepository$.remove( userToDelete ) ;

    return {message: `User #${id} has been deleted`}

  }

  
}
