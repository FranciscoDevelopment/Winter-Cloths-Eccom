import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RoleEnum } from 'src/common/types/role.types';
import { Auth } from 'src/common/decorators/auth.decorator';
import type { JwtPayloadT } from 'src/common/types/jwt.types';

@UseInterceptors( ClassSerializerInterceptor )
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /*
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  */

  @Get()
  async findAll() {

    const users = await this.usersService.findAll() ;

    return users.map( (user) => new User( user ) )
  
  }


  @Get('me')
  async getMe( @CurrentUser('sub') userId : string ) {

    const user = await this.usersService.findOne(userId)

    return new User( user )

  }


  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
  
    const user = await this.usersService.findOne(id) ;

    return new User( user )

  }

  
  
  @Patch(':id')
  @Auth( RoleEnum.ADMIN )
  async update(
    @Param('id', ParseUUIDPipe) id : string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user : JwtPayloadT
  ) {

    const userUpdate = await this.usersService.update( id, updateUserDto, user )

    return new User( userUpdate )
  
  }
  


  @Delete(':id')
  @Auth( RoleEnum.ADMIN )
  async remove(@Param('id', ParseUUIDPipe) id : string) {
    return await this.usersService.remove(id) 
  }


}
