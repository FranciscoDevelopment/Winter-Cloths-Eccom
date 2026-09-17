import { ColumnOptions } from "typeorm"
import { Role } from "../enums/role.enum"

export const emailUserSchema : ColumnOptions = {

    type: "varchar",
    unique: true

} as const


export const passwordUserSchema : ColumnOptions = {

    type: "varchar"

} as const


export const nameUserSchema : ColumnOptions = {

    type: "varchar",
    length: 60

} as const


export const hashedRefreshTokenUserSchema : ColumnOptions = {

    type: "varchar",
    nullable: true

} as const


export const roleUserSchema : ColumnOptions = {
    type: "enum",
    enum: Role,
    default: Role.USER
} as const