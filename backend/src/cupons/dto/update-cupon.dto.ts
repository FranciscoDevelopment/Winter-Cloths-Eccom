import { PartialType } from '@nestjs/mapped-types';
import { CreateCuponDto } from './create-cupon.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCuponDto extends PartialType(CreateCuponDto) {

    @IsNotEmpty( {message: "Porcentage is required to the update"} )
    porcentage! : number

}
