import { Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty( {message: "The product name is required"} )
    @IsString( {message: "The value is not valid"} )
    name! : string ;

    @IsNotEmpty( {message: "The price is required"} )
    @IsNumber({maxDecimalPlaces: 2}, {message: "The price is not valid"})
    @Type( () => Number )
    price! : number ;

    @IsNotEmpty( {message: "The product stock inventory is required"} )
    @IsNumber( {maxDecimalPlaces: 0}, {message: "The stock inventory is not valid"} )
    @Type( () => Number )
    inventory! : number;

    @IsNotEmpty( {message: "The category is required"} )
    @IsInt( {message: "The category is invalid"} )
    @Type( () => Number )
    categoryId! : number ;

    @IsOptional()
    @IsArray( {message: "Images must be an array"} )
    @ArrayMaxSize( 3, {message: "You can upload up to 3 images"} )
    @IsString( {each: true, message: "Each image must be a valid URL"} )
    images? : string[]

    @IsOptional()
    @IsString( {message: "The description is not valid"} )
    @MaxLength( 90, {message: "The description can't exceed 500 characters"} )
    description? : string

}
