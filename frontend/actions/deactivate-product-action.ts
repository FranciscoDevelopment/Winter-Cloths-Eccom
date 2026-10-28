"use server"

import { productT } from "@/src/schema";
import { revalidatePath } from "next/cache";

export async function deactivateProduct( productId : productT['id'], accessToken : string | null ) {

    const url = `${process.env.API_URL}/products/${productId}/deactivate`


    await fetch( url, {

        method: "PATCH",
    
        headers: accessToken ? {Authorization: `Bearer ${accessToken}`} : undefined 

    } )


    revalidatePath("admin/products")

}