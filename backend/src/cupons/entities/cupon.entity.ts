import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { expirationDate_CuponSchema, name_CuponsSchema, porcentage_CuponSchema } from "../schemas/cupons.schema";

@Entity()
export class Cupon {

    @PrimaryGeneratedColumn()
    id! : number

    @Column( name_CuponsSchema )
    name! : string

    @Column( porcentage_CuponSchema )
    porcentage! : number

    @Column( expirationDate_CuponSchema )
    expirationDate! : Date

}
