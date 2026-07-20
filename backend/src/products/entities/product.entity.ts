import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { categoryIdProductSchema, imageProductSchema, inventoryProductSchema, priceProductSchema, productNameSchema } from "../schemas/products.schema"
import { Category } from "src/categories/entities/category.entity"


@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id!:number

    @Column( productNameSchema )
    name! : string


    @Column( imageProductSchema )
    image! : string


    @Column( priceProductSchema )
    price! : number


    @Column( inventoryProductSchema )
    inventory! : number


    @ManyToOne( () => Category )
    category! : Category


    @Column( categoryIdProductSchema )
    categoryId! : number


}
