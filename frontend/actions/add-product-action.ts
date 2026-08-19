"use server"

import { ProductFormSchema } from "@/src/schema";

type actionStateT = {
    errors : string[] ;
    success : string
}

export async function addNewProduct( prevState : actionStateT , formData : FormData ) {

    console.log("from addProduct action functionality")

    const product = ProductFormSchema.safeParse({

        name: formData.get("name") ,

        price: formData.get("price") ,

        inventory: formData.get("inventory") ,

        categoryId: formData.get("categoryId")

    })

    if(!product.success) {

        return{
            errors: product.error.issues.map( (issue) => issue.message ) ,
            success: ""
        }

    }

    return{
        errors: [] ,
        success: ""
    }

}