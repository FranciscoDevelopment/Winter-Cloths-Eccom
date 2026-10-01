import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { cupon_TransactionSchema, date_TransactionSchema, discount_TransactionSchema, total_TransactionsSchema, user_TransactionSchema } from "../schemas/transaction.schema";
import { priceAtTransactionDate_TransactionContentsSchema, quantity_TransactionContentsSchema } from "../schemas/transaction-contents.schema";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id! : number

    @ManyToOne( () => User, user_TransactionSchema )
    @JoinColumn( {name: 'userId'} )
    user! : User

    @Column()
    userId! : string

    @Column( total_TransactionsSchema )
    total! : number

    @Column( cupon_TransactionSchema )
    cupon! : string ;

    @Column( discount_TransactionSchema )
    discount! : number



    @Column( date_TransactionSchema )
    transactionDate! : Date

    @OneToMany( () => TransactionContents, ( transactionContents ) => transactionContents.transaction )
    contents! : TransactionContents[]
}


@Entity()
export class TransactionContents {

    @PrimaryGeneratedColumn()
    id! : number

    @Column( quantity_TransactionContentsSchema )
    quantity! : number

    @Column( priceAtTransactionDate_TransactionContentsSchema )
    priceAtTransactionDate! : number

    @ManyToOne( () => Product, ( product ) => product.id , {cascade: true})
    product! : Product

    @ManyToOne( () => Transaction , ( transaction ) => transaction.contents, {cascade: true} )
    transaction! : Transaction

}
