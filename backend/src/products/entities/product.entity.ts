import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { categoryIdProductSchema, descriptionProductSchema, imagesProductSchema, inventoryProductSchema, isActiveProductSchema, priceProductSchema, productNameSchema } from "../schemas/products.schema"
import { Category } from "src/categories/entities/category.entity"


@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id!:number

    @Column( productNameSchema )
    name! : string


    @Column( imagesProductSchema )
    images! : string[]


    @Column( descriptionProductSchema )
    description! : string | null


    @Column( priceProductSchema )
    price! : number


    @Column( inventoryProductSchema )
    inventory! : number


    @Column( isActiveProductSchema )
    isActive! : boolean


    @ManyToOne( () => Category )
    category! : Category


    @Column( categoryIdProductSchema )
    categoryId! : number


}
