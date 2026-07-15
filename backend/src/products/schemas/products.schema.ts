import { ColumnOptions } from "typeorm"

export const productNameSchema : ColumnOptions = {

    type: "varchar",
    length: 60

}

export const imageProductSchema : ColumnOptions = {

    type: "varchar" ,
    length: 120,
    nullable: true ,
    default: "default.svg"

}

export const priceProductSchema : ColumnOptions = {

    type: "decimal"

}

export const inventoryProductSchema : ColumnOptions = {
    type: "int"
}