"use server"

import { ErrorResponseSchema, CategoryFormSchema } from "@/src/schema";


type actionStateT = {

    errors : string[] ;
    success : string

}


export async function addNewCategory( accessToken : string | null , prevState : actionStateT, formData : FormData ) {

    const category = CategoryFormSchema.safeParse(
        {
            name: formData.get("name")
        }
    )


    if(!category.success) {

        return {
            errors: category.error.issues.map( (issue) => issue.message ) ,
            success: ""
        }
    }


    const categoryJson = JSON.stringify( category.data )


    const url = `${process.env.API_URL}/categories` ;


    const request = await fetch( url, {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...( accessToken ? {Authorization: `Bearer ${accessToken}`} : {} )
        },
        body: categoryJson

    } )


    const response = await request.json()


    if( !request.ok ) {

        const errors = ErrorResponseSchema.parse(response) ;


        const messages = Array.isArray( errors.message.message )
            ? errors.message.message
            : [errors.message.message]
        ;


        return {
            errors: messages,
            success: ""
        }

    }


    return {
        errors: [],
        success: `Category ${response.name} added successfully`
    }

}