import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { TrimPipe } from 'src/common/pipes/trim-param/trim.pipe';
import { Public } from 'src/common/decorators/public.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RoleEnum } from 'src/common/types/role.types';

@Controller('categories')
export class CategoriesController {
  
  constructor(private readonly categoriesService: CategoriesService) {}


  @Auth( RoleEnum.ADMIN )
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {

    return this.categoriesService.create(createCategoryDto) ;
  }

  
  @Public()
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }


  @Public()
  @Get("length")
  findAllAndLength() {
    return this.categoriesService.findAllAndLength() ;
  }


  @Public()
  @Get(':id')
  findOne(
    @Param( 'id', IdValidationPipe ) id: string ,
    @Query("products", TrimPipe) products? : string
  ) {  
    return this.categoriesService.findOne(+id, products);
  }


  @Auth( RoleEnum.ADMIN )
  @Patch(':id')
  update(@Param('id', IdValidationPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }


  @Auth( RoleEnum.ADMIN )
  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.categoriesService.remove(+id);
  }

}
