import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { totalTransactionsSchema } from "../schemas/transaction.schema";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id! : number

    @Column( totalTransactionsSchema )
    total! : number

    
}
