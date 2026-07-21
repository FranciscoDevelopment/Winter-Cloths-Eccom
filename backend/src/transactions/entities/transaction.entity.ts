import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { date_TransactionSchema, total_TransactionsSchema } from "../schemas/transaction.schema";
import { quantity_TransactionContentsSchema } from "../schemas/transaction-contents.schema";
import { Product } from "src/products/entities/product.entity";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id! : number

    @Column( total_TransactionsSchema )
    total! : number

    @Column( date_TransactionSchema )
    transactionDate! : Date

}


@Entity()
export class TransactionContents {

    @PrimaryGeneratedColumn()
    id! : number

    @Column( quantity_TransactionContentsSchema )
    quantity! : number

    @Column()
    priceAtTransactionDate! : number

    @ManyToOne( () => Product, ( product ) => product.id )
    product! : Product

    //@ManyToOne( () => Transaction )
    //transaction! : Transaction

}
