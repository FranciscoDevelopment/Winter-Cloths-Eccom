import { Injectable } from '@nestjs/common';
import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponDto } from './dto/update-cupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cupon } from './entities/cupon.entity';

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
    return `This action returns all cupons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cupon`;
  }

  update(id: number, updateCuponDto: UpdateCuponDto) {
    return `This action updates a #${id} cupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} cupon`;
  }
}
