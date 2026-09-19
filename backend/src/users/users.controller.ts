import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

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

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  */


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }


}
