import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtPayloadT } from "src/common/types/jwt.types";
import { ROLES_KEY } from "src/common/decorators/role.decorator";
import { RoleEnum } from "src/common/types/role.types";
import { Observable } from "rxjs";


@Injectable()
export class RolesGuard implements CanActivate {

    constructor( private readonly reflector : Reflector ) {}


    canActivate(context: ExecutionContext): boolean  {
        
        const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>( ROLES_KEY, [

            context.getHandler(),
            context.getClass()

        ] )


        if( !requiredRoles || requiredRoles.length === 0 ) return true ;


        const {user} = context.switchToHttp().getRequest<{user?: JwtPayloadT}>()


        if( !user ) {

            throw new ForbiddenException('The user could not be determined') ;

        }


        const hashPermission = requiredRoles.includes( user.role as RoleEnum )


        if(!hashPermission){
            throw new ForbiddenException('You do not have permission to perform this action')
        }


        return true

    }

}