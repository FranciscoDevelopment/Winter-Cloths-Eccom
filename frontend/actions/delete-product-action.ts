"use server"

import { revalidatePath } from "next/cache"

export async function deleteProduct( productId : number, accessToken : string | null ) {

    const url = `${process.env.API_URL}/products/${productId}` ;


    const request = await fetch( url, {

        method: "DELETE",

        headers: accessToken
                ? {Authorization: `Bearer ${accessToken}`}
                : undefined
    } ) ;
         
    await request.json() ;

    revalidatePath("admin/products")

}