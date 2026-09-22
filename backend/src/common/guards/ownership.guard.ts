import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { RoleEnum } from "../types/role.types";
import { Request } from "express";
import { JwtPayloadT } from "../types/jwt.types";


type requestWithUserT = Request & {user? : JwtPayloadT} ;

@Injectable()
export class OwnershipGuard implements CanActivate {

    canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest<requestWithUserT>() ;


        const user = request.user ;

        if( !user ) throw new ForbiddenException('The user could not be determined') ;

        
        const idRequested = request.params.id ;


        if( user.role === RoleEnum.ADMIN ) return true ;


        if( user.sub === idRequested ) return true ;
        
        
        throw new ForbiddenException('Access denied for this resource')
    
    }

}