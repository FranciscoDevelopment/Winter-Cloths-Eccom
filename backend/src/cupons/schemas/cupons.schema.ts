import { ColumnOptions } from "typeorm";

export const name_CuponsSchema : ColumnOptions = {

    type: "varchar",
    length: 10

} as const

export const porcentage_CuponSchema : ColumnOptions = {
    type: "int"
} as const

export const expirationDate_CuponSchema : ColumnOptions = {
    type: "date"
} as const