import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CuponsService } from './cupons.service';
import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponDto } from './dto/update-cupon.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { ApplyCuponDto } from './dto/apply-cupon.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RoleEnum } from 'src/common/types/role.types';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('cupons')
export class CuponsController {
  
  constructor(private readonly cuponsService: CuponsService) {}


  @Auth( RoleEnum.ADMIN )
  @Post()
  create(@Body() createCuponDto: CreateCuponDto) {
    return this.cuponsService.create(createCuponDto);
  }


  @Auth(RoleEnum.ADMIN)
  @Get()
  findAll() {
    return this.cuponsService.findAll();
  }


  @Auth(RoleEnum.ADMIN)
  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.cuponsService.findOne(+id);
  }


  @Auth( RoleEnum.ADMIN )
  @Patch(':id')
  update(
    @Param('id', IdValidationPipe ) id: string, 
    @Body() updateCuponDto: UpdateCuponDto
  ) {
    return this.cuponsService.update(+id, updateCuponDto);
  }


  @Auth( RoleEnum.ADMIN )
  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.cuponsService.remove(+id);
  }


  @Public()
  @Post( '/apply-cupon' )   // cupons/apply-cupon
  @HttpCode( HttpStatus.OK )  // 200
  applyCupon( @Body() applyCuponDto : ApplyCuponDto ) {

    return this.cuponsService.applyCupon( applyCuponDto.cupon_name )

  }

}
