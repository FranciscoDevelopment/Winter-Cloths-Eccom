import { IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {

    @IsNotEmpty({
        message: "The name field can not be empty"
    })
    name! : string

}
