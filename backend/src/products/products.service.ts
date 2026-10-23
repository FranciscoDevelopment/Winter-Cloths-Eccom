import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { S3UploadService } from 'src/s3-upload/s3-upload.service';
import { TransactionContents } from 'src/transactions/entities/transaction.entity';


@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository( Product )
    private readonly productsRepository$ : Repository< Product >,

    @InjectRepository( Category )
    private readonly categoryRepository$ : Repository< Category > ,

    private readonly s3UploadService : S3UploadService,

    @InjectRepository( TransactionContents )
    private readonly transactionContentsRepository$ : Repository<TransactionContents>
  ) {}

  
  async create(createProductDto: CreateProductDto, files? : Express.Multer.File[] ) {

    const category = await this.categoryRepository$.findOneBy( {id: createProductDto.categoryId } ) ;

    if( !category ) {

      let errors : string[] = [] ;

      errors.push( "The category doesn't exist" )

      throw new NotFoundException( errors )

    }

    const savedProduct = await this.productsRepository$.save(
      {
        ...createProductDto,
        category: category,
      }
    )


    if( files?.length ) {

      savedProduct.images = await this.s3UploadService.uploadFiles( files, "products", savedProduct.id ) ;

      await this.productsRepository$.save( savedProduct )

    }
    else if( createProductDto.images?.length ) {

      savedProduct.images = createProductDto.images ;

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
        relations: {category: true },
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


    
    const linkedRows = await this.transactionContentsRepository$
      .createQueryBuilder('trans_contents')
      .select('DISTINCT trans_contents.productId', 'productId')
      .where('trans_contents.productId IN (:...ids)', {ids: products.length ? products.map( (product) => product.id ) : [0] }) 
      .getRawMany()
    ;


    const linkedIds = new Set( linkedRows.map( (row) => row.productId ) ) ;


    const productsWithCanDelete = products.map( (product) => {

      return {
        ...product,
        canDelete: !linkedIds.has(product.id)
      }

    } )


    return {
      products: productsWithCanDelete,
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

    if( updateProductDto.images?.length ) {
      product.images = updateProductDto.images
    }

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


  async activate ( id : number ) {

    await this.findOne(id) ;

    await this.productsRepository$.update( id, {isActive: true} )

    return {
      message: `Product #${id} is visible on the storefront again`
    }

  }


  async deactivate ( id : number ) {

    await this.findOne(id) ;

    await this.productsRepository$.update( id, {isActive: false} )

    return {
      message: `Product #${id} has been hidden from the storefront`
    }

  }



  async remove (id: number) {
  
    const productToDelete = await this.findOne( id ) ;

    const linkedTransaction = await this.transactionContentsRepository$.findOne(
      
      {where: {product: {id} } }
    
    )


    if( linkedTransaction ) {
      throw new ConflictException("This product can't be deleted because it has purchase history. Disable it instead.")
    }


    await this.productsRepository$.remove( productToDelete ) ;

    return {message: `Product #${id} has been deleted`}
  
  }


  async uploadImage ( productId : number, files : Express.Multer.File[] ) {

    const imageUrls = await this.s3UploadService.uploadFiles( files, "products", productId ) ;


    await this.productsRepository$.update( productId, {images: imageUrls} )


    return imageUrls
  }


  uploadImageStandalone ( files : Express.Multer.File[] ) : Promise<string[]> {

    return this.s3UploadService.uploadFiles( files, "products" ) ;

  }

}
