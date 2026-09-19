import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashingKey } from 'src/common/hashing/hash-bcrypt';


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

  findOne(id: string) {
    
    

  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
