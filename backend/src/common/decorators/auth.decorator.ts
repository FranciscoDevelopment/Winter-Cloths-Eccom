import { applyDecorators } from "@nestjs/common";
import { RoleEnum } from "../types/role.types";

export function Auth( ...roles : RoleEnum[] ) {

    return applyDecorators( )

}