import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";


export class TransactionContentsDto {

    @IsNotEmpty( {message: "The product ID is required"} )
    @IsInt( {message: "Product id invalid"} )
    productId! : number
    
    //@IsInt( {message: "Quantity not valid"} )

    @IsNotEmpty( {message: "Quantity is required"} )
    @IsInt( {message: "Invalid quantity"} )
    quantity! : number

    @IsNotEmpty( {message: "Price is required"} )
    @IsNumber( {maxDecimalPlaces: 2 }, {message: "Invalid price"} )
    priceAtTransactionDate! : number
}


export class CreateTransactionDto {

    // id, total, transactionDate, contents

    @IsNotEmpty( {message: "The total is required"} )
    @IsNumber( {maxDecimalPlaces: 2}, {message: "The total value is not valid"} )
    total! : number

    @IsOptional()
    cupon! : string

    @IsArray()
    @ArrayNotEmpty( {message: "The contents can not be empty"} )
    @ValidateNested()
    @Type( () => TransactionContentsDto )
    contents! : TransactionContentsDto[]
    
}


