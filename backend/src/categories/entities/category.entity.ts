import { Product } from "src/products/entities/product.entity"
import { ProductReferenceForCategory } from "src/products/utils/productReferenceForCategory"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id! : number


    @Column(
        {
            type: 'varchar',
            length: 60
        }
    )
    name! : string


    @OneToMany( () => Product, ProductReferenceForCategory, {cascade: true} )
    products! : Product[]


    
}
