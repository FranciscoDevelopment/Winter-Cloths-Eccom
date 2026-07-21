import { ColumnOptions } from "typeorm";

export const quantity_TransactionContentsSchema : ColumnOptions = {

    type: "int"

} as const

export const priceAtTransactionDate_TransactionContentsSchema : ColumnOptions = {

    type: "decimal"

} as const