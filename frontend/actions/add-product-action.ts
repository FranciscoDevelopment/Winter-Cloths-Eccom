"use server"

import { ErrorResponseSchema, ProductFormSchema } from "@/src/schema";
import { error } from "console";
import { success } from "zod/v4";

type actionStateT = {
    errors : string[] ;
    success : string
}

export async function addNewProduct( accessToken : string | null , prevState : actionStateT , formData : FormData ) {

    const product = ProductFormSchema.safeParse({

        name: formData.get("name") ,

        price: formData.get("price") ,

        inventory: formData.get("inventory") ,

        categoryId: formData.get("categoryId"),

        imageUrl: formData.get("image")

    })

    if(!product.success) {

        return{
            errors: product.error.issues.map( (issue) => issue.message ) ,
            success: ""
        }

    }
    

    const productJson = JSON.stringify(product.data) ;

    const url = `${process.env.API_URL}/products` ;


    const request = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...( accessToken  ?  {Authorization: `Bearer ${accessToken}`}  :  {} )
        },
        body: productJson
    } ) ;


    const response = await request.json()


    if( !request.ok ) {

        const errors = ErrorResponseSchema.parse(response)

        const messages = Array.isArray( errors.message.message )
            ? errors.message.message
            : [errors.message.message]
        ;

        return {
            errors: messages,
            success: ""
        }
    }

    return{
        errors: [] ,
        success: `Product ${response.name} added successfully` // response.message
    }

}