import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CuponsService } from './cupons.service';
import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponDto } from './dto/update-cupon.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { ApplyCuponDto } from './dto/apply-cupon.dto';

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
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.cuponsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe ) id: string, 
    @Body() updateCuponDto: UpdateCuponDto
  ) {
    return this.cuponsService.update(+id, updateCuponDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.cuponsService.remove(+id);
  }


  @Post( '/apply-cupon' )   // cupons/apply-cupon
  @HttpCode( HttpStatus.OK )  // 200
  applyCupon( @Body() applyCuponDto : ApplyCuponDto ) {


    console.log( applyCuponDto )

    return this.cuponsService.applyCupon( applyCuponDto.cupon_name )

  }


}
