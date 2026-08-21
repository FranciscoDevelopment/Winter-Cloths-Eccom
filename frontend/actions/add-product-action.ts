"use server"

import { ErrorResponseSchema, ProductFormSchema } from "@/src/schema";

type actionStateT = {
    errors : string[] ;
    success : string
}

export async function addNewProduct( prevState : actionStateT , formData : FormData ) {

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
            "Content-Type": "application/json"
        },
        body: productJson
    } ) ;


    const response = await request.json()


    if( !request.ok ) {

        const errors = ErrorResponseSchema.parse(response)

        return {
            errors: errors.message.map( (issue) => issue ),
            success: ""
        }
    }

    return{
        errors: [] ,
        success: `Product ${response.name} added successfully` // response.message
    }

}