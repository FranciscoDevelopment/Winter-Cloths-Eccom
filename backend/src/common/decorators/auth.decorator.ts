import { applyDecorators } from "@nestjs/common";
import { RoleEnum } from "../types/role.types";
import { Roles } from "./role.decorator";

export function Auth( ...roles : RoleEnum[] ) {

    return applyDecorators( Roles( ...roles ) )

}