"use server"

import { OrderSchema } from "@/src/schema";
import { orderToSubmitT } from "@/src/types/submit-order.types"


export async function submitOrder ( data : unknown ) : Promise<orderToSubmitT> {

    console.log("desde Submit order") ;

    const order = OrderSchema.parse(data) ;

    return {
        errors: [] ,
        success: ""
    }

}