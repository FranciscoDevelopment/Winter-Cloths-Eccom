import { ColumnOptions } from "typeorm"

export const productNameSchema : ColumnOptions = {

    type: "varchar",
    length: 60

} as const

export const imageProductSchema : ColumnOptions = {

    type: "varchar" ,
    length: 120,
    nullable: true ,
    default: "default.svg"

} as const

export const priceProductSchema : ColumnOptions = {

    type: "decimal"

} as const

export const inventoryProductSchema : ColumnOptions = {
    type: "int"
} as const

export const categoryIdProductSchema : ColumnOptions = {
    type: "int"
} as const