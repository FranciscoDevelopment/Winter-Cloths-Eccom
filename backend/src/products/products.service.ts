import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { S3UploadService } from 'src/s3-upload/s3-upload.service';


@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository( Product )
    private readonly productsRepository$ : Repository< Product >,

    @InjectRepository( Category )
    private readonly categoryRepository$ : Repository< Category > ,

    private readonly s3UploadService : S3UploadService
  ) {}

  
  async create(createProductDto: CreateProductDto, file? : Express.Multer.File ) {

    const category = await this.categoryRepository$.findOneBy( {id: createProductDto.categoryId } ) ;

    if( !category ) {

      let errors : string[] = [] ;

      errors.push( "The category doesn't exist" )

      throw new NotFoundException( errors )

    }


    // 1. Guardar producto sin imagen para obtener el id

    const savedProduct = await this.productsRepository$.save( 
      {
        ...createProductDto,
        category: category,
      } 
    )

    
    // 2) Si hay imagen, subirla y actualizar

    if( file ) {

      savedProduct.image = await this.s3UploadService.uploadFile( file, "products", savedProduct.id ) ;

      await this.productsRepository$.save( savedProduct )

    }

    return savedProduct ;

  }


  async findAll( categoryId : number | null, take? : number , skip? : number ) {

    if( categoryId ) {

      const data = await this.productsRepository$.find(
        {
          where: {category: {id: categoryId} } ,
        }
      )

      return data

    }

    return this.productsRepository$.find(
      {
        relations: {category: true },       // Equivalente en product.entity     @ManyToOne( () => Category, {eager: true} )
        order: {id: "DESC" },
        take: take,
        skip
      }    
    )

  }


  async findAllAndLength ( id? : number | null, take? : number, skip? : number ) {

    const whereClause = id ? {category: {id} } : {}  ;

    const [ products, totalProducts ] = await this.productsRepository$.findAndCount(

      {
        where: whereClause,
        relations: {category: true} ,
        order: {id: "DESC"},
        take: take,
        skip
      }

    )

    return {
      products: products,
      total: totalProducts
    }

  }


  async findOne(id: number) {

    const product = await this.productsRepository$.findOne(
      {
        where: {id},
        relations: {category: true}
      }
    ) ;

    if( !product ) throw new NotFoundException( `The #${id} product doesn't exist` ) ;


    return product 

  }


  async update(id: number, updateProductDto: UpdateProductDto) {
    
    const product = await this.findOne(id) ;

    Object.assign( product, updateProductDto )

    if( updateProductDto.categoryId ) {

      const categoryToUpdate = await this.categoryRepository$.findOneBy(
        {
          id: updateProductDto.categoryId
        }
      )

      if( !categoryToUpdate ) {

        let errors : string[] = [] ;

        errors.push( "The respective category doen't exist" ) ;

        throw new NotFoundException( errors ) ;

      }

      product.category = categoryToUpdate ;

    }


    return await this.productsRepository$.save( product ) ;
    
  }


  async remove (id: number) {
  
    const productToDelete = await this.findOne( id ) ;

    await this.productsRepository$.remove( productToDelete ) ;
    return {message: `Product #${id} has been deleted`}
  
  }


  async uploadImage ( productId : number, file : Express.Multer.File ) {

    const imageUrl = await this.s3UploadService.uploadFile( file, "products", productId ) ;


    await this.productsRepository$.update( productId, {image: imageUrl} )


    return imageUrl

  }

  
}
