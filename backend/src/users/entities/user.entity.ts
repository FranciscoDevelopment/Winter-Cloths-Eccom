import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { emailUserSchema, hashedRefreshTokenUserSchema, nameUserSchema, passwordUserSchema, roleUserSchema } from "../schemas/user.schema"
import { Exclude } from "class-transformer"
import { Transaction } from "src/transactions/entities/transaction.entity"
import { RoleEnum } from "src/common/types/role.types"

@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id! : string


    @Column( emailUserSchema )
    email! : string


    @Column( passwordUserSchema )
    @Exclude()
    password! : string


    @Column( nameUserSchema )
    name! : string


    @Column( roleUserSchema )
    role! : RoleEnum


    @Column( hashedRefreshTokenUserSchema )
    @Exclude()
    hashedRefreshToken! : string | null


    @CreateDateColumn()
    createdAt! : Date


    @UpdateDateColumn()
    updatedAt! : Date


    @OneToMany( () => Transaction, (transaction) => transaction.user )
    transactions! : Transaction[]


    constructor( partial : Partial<User> ) {

        Object.assign( this, partial )

    }

}
