import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TrimPipe } from 'src/common/pipes/trim-param/trim.pipe';
import { RoleEnum } from 'src/common/types/role.types';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('transactions')
export class TransactionsController {
  
  constructor(private readonly transactionsService: TransactionsService) {}


  @Auth( RoleEnum.ADMIN )
  @Post()
  create(
    @CurrentUser('sub')
    @Body() createTransactionDto: CreateTransactionDto
  ) {
    return this.transactionsService.create(createTransactionDto);
  }


  @Auth( RoleEnum.ADMIN )
  @Get()
  findAll( @Query("transactionDate", TrimPipe) transactionDate : string ) {

    return this.transactionsService.findAll( transactionDate ) ;
  
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
