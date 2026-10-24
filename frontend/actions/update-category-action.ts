"use server"

import { ErrorResponseSchema, CategoryFormSchema, categoryT } from "@/src/schema";
import { success } from "zod/v4";


type actionStateT = {

    errors : string[],

    success : string

}

export async function updateCategory ( categoryId : categoryT['id'] , accessToken : string | null, prevState : actionStateT, formData : FormData ) {

    const category = CategoryFormSchema.safeParse(

        {
            name: formData.get("name")
        }

    )

    if( !category.success ) {

        return {
            errors: category.error.issues.map( (issue) => issue.message ),
            success: ""
        }

    } ;


    const categoryJson = JSON.stringify( category.data ) ;

    const url = `${process.env.API_URL}/categories/${categoryId}`


    const request = await fetch( url, {

        method: "PATCH",
        
        headers: {
            "Content-Type": "application/json",
            ...( accessToken ? {Authorization: `Bearer ${accessToken}`} : {} )
        },

        body: categoryJson

    } ) ;


    const response = await request.json() ;


    if(!request.ok) {

        const errors = ErrorResponseSchema.parse(response) ;

        
        const messages = Array
            .isArray( errors.message.message ) 
                ? errors.message.message
                : [errors.message.message]
        ;


        return {
            error: messages,
            success: ""
        }

    }

    return {
        errors: [],
        success: `Category ${response.name} updated successfully`
    }

}