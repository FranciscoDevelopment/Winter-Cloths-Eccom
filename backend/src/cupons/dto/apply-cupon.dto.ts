import { IsNotEmpty } from "class-validator";

export class ApplyCuponDto {

    @IsNotEmpty( {message: "The cupon name is required"} )
    cupon_name! : string

}