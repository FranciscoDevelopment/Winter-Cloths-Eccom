"use server"

import { ErrorResponseSchema, OrderSchema, SuccessResponseSchema } from "@/src/schema";
import { orderToSubmitT } from "@/src/types/submit-order.types"
import { revalidateTag } from "next/cache";


export async function submitOrder ( data : unknown, accessToken : string | null ) : Promise<orderToSubmitT> {

    const order = OrderSchema.parse(data) ;

    const orderToJson = JSON.stringify({...order}) ;

    const url = `${process.env.API_URL}/transactions`

    const request = await fetch( url, {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: orderToJson
    } )


    const responseData = await request.json() ;


    if( !request.ok ) {

        const errorBody = ErrorResponseSchema.parse( responseData ) ;

        const messages = Array.isArray(errorBody.message.message)
            ? errorBody.message.message
            : [errorBody.message.message]

        return {
            errors: messages, 
            success: "" 
        }

    } ;


    const success = SuccessResponseSchema.parse( responseData ) ;

    revalidateTag("products-by-category") ;

    return {
        errors: [] ,
        success: success.message
    }

}