import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFiles, UseInterceptors, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-product-byId.dto';
import { PAGINATION_LIMIT, SKIP_DEFAULT } from './settings/pagination';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { memoryStorage } from 'multer';
import { uploadImageFileOptions, uploadImageFileOptionsRequired } from './schemas/upload-file.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RoleEnum } from 'src/common/types/role.types';
import { Public } from 'src/common/decorators/public.decorator';

const MAX_PRODUCT_IMAGES = 3 as const ;

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}


  @Auth( RoleEnum.ADMIN )
  @Post()
  @UseInterceptors( FilesInterceptor("files", MAX_PRODUCT_IMAGES, {storage: memoryStorage() } ) )
  async create(
    @Body() createProductDto: CreateProductDto ,
    @UploadedFiles( uploadImageFileOptions ) files? : Express.Multer.File[]
  ) {
    return this.productsService.create(createProductDto, files);
  }


  @Public()
  @Get()
  findAll( @Query() query : GetProductsQueryDto ) {

    const categoryId = query.category_id ?? null

    const take = query.take ?? PAGINATION_LIMIT ;

    const skip = query.skip ?? SKIP_DEFAULT ;

    return this.productsService.findAll( categoryId, take, skip );
  }


  @Public()
  @Get( "length" )
  findAllAndLength ( @Query() query : GetProductsQueryDto ) {

    const categoryId = query.category_id ?? null ;

    const take = query.take ?? PAGINATION_LIMIT ;

    const skip = query.skip ?? SKIP_DEFAULT ;

    return this.productsService.findAllAndLength( categoryId, take, skip )

  }


  @Public()
  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.findOne(+id);
  }


  @Auth(RoleEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {

    return await this.productsService.update( +id, updateProductDto )
  }


  @Auth(RoleEnum.ADMIN)
  @Post(":id/image")
  @UseInterceptors( FilesInterceptor( "files", MAX_PRODUCT_IMAGES, {storage: memoryStorage() } ) )
  uploadImagePost(
    @Param('id', IdValidationPipe) id : string,
    @UploadedFiles( uploadImageFileOptions ) files : Express.Multer.File[]
  ) {
    if( !files?.length ) {
      throw new BadRequestException("At least one image is required for this request")
    }
    return this.productsService.uploadImage( +id, files )

  }


  @Auth(RoleEnum.ADMIN)
  @Patch(":id/image")
  @UseInterceptors( FilesInterceptor( "files", MAX_PRODUCT_IMAGES, {storage: memoryStorage() } ) )
  uploadImage(
    @Param('id', IdValidationPipe) id : string,
    @UploadedFiles( uploadImageFileOptionsRequired ) files : Express.Multer.File[]
  ) {
    if( !files?.length ) {
      throw new BadRequestException("At least one image is required for this request")
    }
    return this.productsService.uploadImage( +id, files )
  }


  @Auth(RoleEnum.ADMIN)
  @Post("upload-only-image")
  @UseInterceptors( FilesInterceptor( "files", MAX_PRODUCT_IMAGES, {storage: memoryStorage() } ) )
  uploadImageStandalone(
    @UploadedFiles(uploadImageFileOptionsRequired) files : Express.Multer.File[]
  ) {

    if( !files?.length ) throw new BadRequestException("At least one image is required") ;

    return this.productsService.uploadImageStandalone( files )

  }


  @Auth(RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id', IdValidationPipe ) id: string) {
    return this.productsService.remove(+id);
  }

}
