import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TrimPipe } from 'src/common/pipes/trim-param/trim.pipe';
import { RoleEnum } from 'src/common/types/role.types';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { JwtPayloadT } from 'src/common/types/jwt.types';

@Controller('transactions')
export class TransactionsController {
  
  constructor(private readonly transactionsService: TransactionsService) {}


  @Auth()
  @Post()
  create( @CurrentUser('sub') userId : string , @Body() createTransactionDto: CreateTransactionDto ) {
    return this.transactionsService.create(createTransactionDto, userId);
  }


  @Auth( RoleEnum.ADMIN )
  @Get()
  findAll( @Query("transactionDate", TrimPipe) transactionDate : string ) {

    return this.transactionsService.findAll( transactionDate ) ;
  
  }

  @Auth()
  @Get(':id')
  findOne( @Param('id') id : string, @CurrentUser() requester : JwtPayloadT ) {
    return this.transactionsService.findOne(+id, requester);
  }

  @Auth( RoleEnum.ADMIN )
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateTransactionDto: UpdateTransactionDto,
    @CurrentUser() requester : JwtPayloadT
  ) {
    return this.transactionsService.update(+id, updateTransactionDto, requester);
  }

  @Auth( RoleEnum.ADMIN )
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() requester : JwtPayloadT ) {
    return this.transactionsService.remove(+id, requester);
  }

}
