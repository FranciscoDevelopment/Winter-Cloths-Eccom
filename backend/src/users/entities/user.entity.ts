import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { emailUserSchema, hashedRefreshTokenUserSchema, nameUserSchema, passwordUserSchema, roleUserSchema } from "../schemas/user.schema"
import { Role } from "../enums/role.enum"

@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id! : string


    @Column( emailUserSchema )
    email! : string


    @Column( passwordUserSchema )
    password! : string


    @Column( nameUserSchema )
    name! : string


    @Column( roleUserSchema )
    role! : Role


    @Column( hashedRefreshTokenUserSchema )
    hashedRefreshToken! : string | null


    @CreateDateColumn()
    createdAt! : Date


    @UpdateDateColumn()
    updatedAt! : Date

}
