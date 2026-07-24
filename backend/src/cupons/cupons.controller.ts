import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuponsService } from './cupons.service';
import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponDto } from './dto/update-cupon.dto';

@Controller('cupons')
export class CuponsController {
  constructor(private readonly cuponsService: CuponsService) {}

  @Post()
  create(@Body() createCuponDto: CreateCuponDto) {
    return this.cuponsService.create(createCuponDto);
  }

  @Get()
  findAll() {
    return this.cuponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuponsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuponDto: UpdateCuponDto) {
    return this.cuponsService.update(+id, updateCuponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuponsService.remove(+id);
  }
}
