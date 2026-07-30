import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import BadParamInRequest from 'src/utils/BadParamInRequest';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { GetProductsQueryDto } from 'src/products/dto/get-product-byId.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {

    console.log( createCategoryDto ) ;

    return this.categoriesService.create(createCategoryDto) ;
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get("length")
  findAllAndLength() {
    return this.categoriesService.findAllAndLength() ;
  }

  @Get(':id')
  findOne(
    @Param( 'id', IdValidationPipe ) id: string ,   // @Param('id') id : string ==== const id = req.params.id
    @Query("products") products? : string
  ) {  
    
    console.log( id )

    return this.categoriesService.findOne(+id, products);
  }

  @Patch(':id')
  update(@Param('id', IdValidationPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.categoriesService.remove(+id);
  }
}
