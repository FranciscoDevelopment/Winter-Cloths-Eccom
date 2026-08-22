import { Product } from "src/products/entities/product.entity"
import { ProductReferenceForCategory } from "src/products/utils/productReferenceForCategory"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { nameCategorySchema } from "../schemas/category.schema"

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id! : number


    @Column( nameCategorySchema )
    name! : string


    @OneToMany( () => Product, ProductReferenceForCategory, {cascade: true} )
    products! : Product[]
    
}
