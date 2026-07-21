import { ColumnOptions } from "typeorm";

export const total_TransactionsSchema : ColumnOptions = {

    type: "decimal",

} as const

export const date_TransactionSchema : ColumnOptions = {

    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)"

} as const 