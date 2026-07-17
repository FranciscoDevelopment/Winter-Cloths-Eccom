import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(

    @InjectRepository( Category )
    private readonly categoryRepository$ : Repository<Category>

  ) {}


  create(createCategoryDto: CreateCategoryDto) {

   const newCategory = new Category() ;
   
   newCategory.name = createCategoryDto.name ;

   return this.categoryRepository$.save( newCategory )

  }


  findAll() {
    return this.categoryRepository$.find() 
  }


  findAllAndLength () {
    return this.categoryRepository$.findAndCount() ;
  }


  async findOne(id: number) {

    const category = await this.categoryRepository$.findOneBy( {id} ) ;

    if( !category )  throw new NotFoundException( "The category doesn't exist" )  //404 ; 

    return category    

  }


  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    
    const category = await this.findOne( id ) ;

    category.name = updateCategoryDto.name


    return await this.categoryRepository$.save( category )

  }


  async remove(id: number) {
    
    const category = await this.findOne( id ) ;

    await this.categoryRepository$.remove( category )

    return `Category #${id} deleted`

  }

}
