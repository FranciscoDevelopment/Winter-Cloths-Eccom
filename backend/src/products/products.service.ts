import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository( Product )
    private readonly productsRepository$ : Repository< Product >,

    @InjectRepository( Category )
    private readonly categoryRepository$ : Repository< Category >
  ) {}

  
  async create(createProductDto: CreateProductDto) {

    const category = await this.categoryRepository$.findOneBy( {id: createProductDto.categoryId } ) ;

    if( !category ) {

      let errors : string[] = [] ;

      errors.push( "The category doesn't exist" )

      throw new NotFoundException( errors )

    }
    

    return this.productsRepository$.save( 
      {
        ...createProductDto,
        category: category,
        //categoryId: category.id
    
      } 
    )

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

    const [ data, totalProducts ] = await this.productsRepository$.findAndCount(

      {
        where: whereClause,
        relations: {category: true} ,
        order: {id: "DESC"},
        take: take,
        skip
      }

    )

    return {
      data,
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


  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }


  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  
}
