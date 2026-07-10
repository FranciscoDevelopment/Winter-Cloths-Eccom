import { IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {        // equivalente a un req.body global

    @IsNotEmpty({
        message: "The name field can not be empty"
    })
    name! : string

}
