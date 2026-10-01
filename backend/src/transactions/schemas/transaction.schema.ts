import { name_CuponsSchema } from "src/cupons/schemas/cupons.schema";
import { ColumnOptions, RelationOptions } from "typeorm";

export const total_TransactionsSchema : ColumnOptions = {

    type: "decimal",

} as const

export const date_TransactionSchema : ColumnOptions = {

    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)"

} as const 

export const cupon_TransactionSchema : ColumnOptions = {
    nullable: true,
    ...name_CuponsSchema

} as const

export const discount_TransactionSchema : ColumnOptions = {

    type: "decimal",
    nullable: true,
    default: 0

} as const

export const user_TransactionSchema : RelationOptions = {

    onDelete: 'CASCADE',
    eager: false

}
