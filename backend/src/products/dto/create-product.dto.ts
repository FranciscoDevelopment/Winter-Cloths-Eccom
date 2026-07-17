import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty( {message: "The product name is required"} )
    @IsString( {message: "The value is not valid"} )
    name! : string ;

    @IsNotEmpty( {message: "The price is required"} )
    @IsNumber({maxDecimalPlaces: 2}, {message: "The price is not valid"})
    price! : number ;

    @IsNotEmpty( {message: "The product stock inventory is required"} )
    @IsNumber( {maxDecimalPlaces: 0}, {message: "The stock inventory is not valid"} )
    inventory! : number;

    @IsNotEmpty( {message: "The category is required"} )
    @IsInt( {message: "The category is invalid"} )
    categoryId! : number ;

}
