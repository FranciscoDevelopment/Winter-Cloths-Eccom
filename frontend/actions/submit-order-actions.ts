"use server"

import { ErrorResponseSchema, OrderSchema, SuccessResponseSchema } from "@/src/schema";
import { orderToSubmitT } from "@/src/types/submit-order.types"
import { revalidateTag } from "next/cache";


export async function submitOrder ( data : unknown ) : Promise<orderToSubmitT> {

    const order = OrderSchema.parse(data) ;

    const orderToJson = JSON.stringify({...order}) ;

    const url = `${process.env.API_URL}/transactions`

    const request = await fetch( url, {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: orderToJson
    } )


    const responseData = await request.json() ;


    if( !request.ok ) {
        const errors = ErrorResponseSchema.parse( responseData ) ;

        return {
            errors: errors.message.map( (issue) => issue ),
            success: ""
        }
    } ;


    const success = SuccessResponseSchema.parse( responseData ) ;

    // reactualiza render de stock on-live
    revalidateTag("products-by-category") ;

    return {
        errors: [] ,
        success: success.message
    }


}