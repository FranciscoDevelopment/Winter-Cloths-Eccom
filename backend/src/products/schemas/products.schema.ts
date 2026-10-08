import { ColumnOptions } from "typeorm"

export const productNameSchema : ColumnOptions = {

    type: "varchar",
    length: 60

} as const

export const imagesProductSchema : ColumnOptions = {

    type: "text" ,
    array: true,
    default: '{}'

} as const

export const descriptionProductSchema : ColumnOptions = {

    type: "text",
    nullable: true
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
