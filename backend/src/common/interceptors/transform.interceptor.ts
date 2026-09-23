import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export interface responseI<T> {
    success : boolean;
    data : T;
    timestamp : string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, responseI<T>> {

    intercept( context: ExecutionContext, next: CallHandler<T> ) : Observable< responseI<T> > {

        return next.handle().pipe(

            map( (data) => {
                return {
                    success: true,
                    data,
                    timestamp: new Date().toISOString()
                }
            } )

        )

    }

}