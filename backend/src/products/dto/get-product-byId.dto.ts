import { IsNumber, IsNumberString, IsOptional } from 'class-validator'

export class GetProductsQueryDto {

    @IsOptional()
    @IsNumberString( {}, {message: "The category identification has to be a number"} )
    category_id? : number


    @IsOptional()
    @IsNumberString( {}, {message: "The pagination quantity has to be a number"} )
    take? : number


    @IsOptional()
    @IsNumberString( {}, {message: "The skip quantity has to be a number"} )
    skip? : number

}