import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { ExecException } from "child_process";
import { Request, Response } from "express";
import { errorResponseI } from "../types/exeptions-filter-errors.types";

@Catch()
export class AllExeptionsFilter implements ExceptionFilter {

    private readonly logger = new Logger( AllExeptionsFilter.name ) ;


    catch(exception: unknown, host: ArgumentsHost) {
        
        const context = host.switchToHttp() ;

        const response = context.getResponse<Response>() ;

        const request = context.getRequest<Request>() ;


        const status = exception instanceof HttpException
                        ? exception.getStatus()
                        : HttpStatus.INTERNAL_SERVER_ERROR 

        
        const message = exception instanceof HttpException
                        ? exception.getResponse()
                        : "Internal servel error ocurred now.."


        this.logger.error( `${request.method} ${request.url}`, (exception as Error)?.stack ) ;


        const errorResponse : errorResponseI = {
            statusCode: status,
            path: request.url,
            timestamp: new Date().toISOString(),
            message
        }

        response.status( status ).json( errorResponse )

    }

}