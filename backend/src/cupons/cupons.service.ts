import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponDto } from './dto/update-cupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cupon } from './entities/cupon.entity';
import { endOfDay, isAfter } from 'date-fns';

@Injectable()
export class CuponsService {

  constructor( 
    @InjectRepository( Cupon )
    private readonly cuponRepository$ : Repository<Cupon> 
  ) {}

  errors : string[] = []

  create(createCuponDto: CreateCuponDto) {
    return this.cuponRepository$.save( createCuponDto ) ;
  }

  findAll() {
    return this.cuponRepository$.find()
  }

  async findOne(id: number) {

    const cupon = await this.cuponRepository$.findOneBy( {id} )
    
    if( !cupon ) throw new NotFoundException( `The cupon #${id} doesn't exist` )

    return cupon
  
  }

  async update(id: number, updateCuponDto: UpdateCuponDto) {
    
    const cupon = await this.findOne(id) ;

    cupon.porcentage = updateCuponDto.porcentage  // Only update the porcentage

    return await this.cuponRepository$.save( cupon )

  }

  async remove(id: number) {
  
    const cupon = await this.findOne( id ) ;

    await this.cuponRepository$.remove( cupon )

    return `Cupon #${id} deleted`

  }


  async applyCupon ( cuponName : string ) {
    console.log( cuponName )

    const cupon = await this.cuponRepository$.findOneBy( {name: cuponName} ) ;


    if( !cupon ) throw new NotFoundException( `The cupon doesn't exist` ) ;

    console.log(  )


    const currentDate = new Date() 

    const expirationDate = endOfDay( cupon.expirationDate )


    if( isAfter( currentDate, expirationDate ) ) {

      throw new UnprocessableEntityException( 'Cupon already expired' )

    }

    return {
      message: "Valid cupon",
      cupon: cupon
    }

  } 


}
