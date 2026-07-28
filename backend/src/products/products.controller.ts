import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, ParseFilePipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-product-byId.dto';
import { PAGINATION_LIMIT, SKIP_DEFAULT } from './settings/pagination';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { Multer } from 'multer';
import { uploadImageFileOptions } from './schemas/upload-file.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create( 
    @Body() createProductDto: CreateProductDto ,
    @UploadedFile( uploadImageFileOptions ) file? : Express.Multer.File
  ) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll( @Query() query : GetProductsQueryDto ) {

    console.log( query )


    const categoryId = query.category_id ?? null

    const take = query.take ?? PAGINATION_LIMIT ;

    const skip = query.skip ?? SKIP_DEFAULT ;

    return this.productsService.findAll( categoryId, take, skip );
  }


  @Get( "length" )
  findAllAndLength ( @Query() query : GetProductsQueryDto ) {

    console.log( query )

    const categoryId = query.category_id ?? null ;

    const take = query.take ?? PAGINATION_LIMIT ;

    const skip = query.skip ?? SKIP_DEFAULT ;

    return this.productsService.findAllAndLength( categoryId, take, skip ) 

  }


  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    //const productToUpdate = await this.findOne( id )
    
    return await this.productsService.update( +id, updateProductDto )
  }


  @Delete(':id')
  remove(@Param('id', IdValidationPipe ) id: string) {
    return this.productsService.remove(+id);
  }
}
