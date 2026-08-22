import { ColumnOptions } from "typeorm";

export const nameCategorySchema : ColumnOptions = {
    type: "varchar",
    length: 60
} as const