import { IsDateString, IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class CreateCuponDto {

    @IsNotEmpty( {message: "Cupon name is required"} )
    name! : string

    @IsNotEmpty( {message: "Descount porcentage is required"} )
    @IsInt( {message: "Descount porcentage has to be between 1 and 100"} )
    @Max( 100, {message: "The max of descount porcentage is 100"} )
    @Min( 1, {message: "The min of descount porcentage is 1"} )
    porcentage! : number


    @IsNotEmpty( {message: "The date is required" } )
    @IsDateString( {}, {message: "Invalid date"} )
    expirationDate! : Date

}
