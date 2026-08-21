import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, ParseFilePipe, UseInterceptors, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-product-byId.dto';
import { PAGINATION_LIMIT, SKIP_DEFAULT } from './settings/pagination';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { memoryStorage, Multer } from 'multer';
import { uploadImageFileOptions, uploadImageFileOptionsRequired } from './schemas/upload-file.schema';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors( FileInterceptor("file", {storage: memoryStorage() } ) )
  async create( 
    @Body() createProductDto: CreateProductDto ,
    @UploadedFile( uploadImageFileOptions ) file? : Express.Multer.File
  ) {
    return this.productsService.create(createProductDto, file);
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

    return await this.productsService.update( +id, updateProductDto )
  }


  @Post(":id/image")
  @UseInterceptors( FileInterceptor( "file", {storage: memoryStorage() } ) )
  uploadImagePost(
    @Param('id', IdValidationPipe) id : string,
    @UploadedFile( uploadImageFileOptions ) file : Express.Multer.File
  ) {
    if( !file ) {
      throw new BadRequestException("The image is required for this request")
    }
    return this.productsService.uploadImage( +id, file )

  }


  @Patch(":id/image")
  @UseInterceptors( FileInterceptor( "file", {storage: memoryStorage() } ) )
  uploadImage(
    @Param('id', IdValidationPipe) id : string,
    @UploadedFile( uploadImageFileOptionsRequired ) file : Express.Multer.File
  ) {
    if( !file ) {
      throw new BadRequestException("The image is required for this request")
    }
    return this.productsService.uploadImage( +id, file )
  }


  @Post("upload-only-image")
  @UseInterceptors( FileInterceptor( "file", {storage: memoryStorage() } ) )
  uploadImageStandalone(
    @UploadedFile(uploadImageFileOptionsRequired) file : Express.Multer.File 
  ) {
    
    if( !file ) throw new BadRequestException("Image is required") ;

    return this.productsService.uploadImageStandalone( file )
  
  }


  @Delete(':id')
  remove(@Param('id', IdValidationPipe ) id: string) {
    return this.productsService.remove(+id);
  }

}
