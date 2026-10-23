"use server"

import type { ErrorResponseT, UserT } from "@/src/types/auth-responses.type"

type actionStateT = {
    errors : string[] ;
    success : string ;
    updatedUser? : UserT
}

export async function updateProfile( accessToken : string | null, prevState : actionStateT, formData : FormData ) {

    const name = formData.get("name")?.toString().trim() || undefined ;
    const email = formData.get("email")?.toString().trim() || undefined ;
    const password = formData.get("password")?.toString().trim() || undefined ;

    const payload : Record<string, string> = {} ;

    if( name ) payload.name = name ;
    if( email ) payload.email = email ;
    if( password ) payload.password = password ;

    const url = `${process.env.API_URL}/users/me` ;

    const request = await fetch( url, {

        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...( accessToken ? { Authorization: `Bearer ${accessToken}` } : {} )
        },
        body: JSON.stringify( payload )

    } ) ;

    const response = await request.json() ;

    if( !request.ok ) {

        const errorBody = response as ErrorResponseT ;

        const messages = Array.isArray( errorBody.message?.message )
            ? errorBody.message.message
            : [ errorBody.message?.message ?? "Something went wrong" ] ;

        return {
            errors: messages,
            success: ""
        }

    }

    const updatedUser : UserT = response.data ; // 👈 el PATCH /users/me pasa por TransformInterceptor, hay que desenvolver

    return {
        errors: [],
        success: "Profile updated successfully",
        updatedUser
    }

}
