import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { date_TransactionSchema, total_TransactionsSchema } from "../schemas/transaction.schema";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id! : number

    @Column( total_TransactionsSchema )
    total! : number

    @Column( date_TransactionSchema )
    transactionDate! : Date
}
