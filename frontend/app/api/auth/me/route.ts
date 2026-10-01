import { ErrorResponseT, UserT } from "@/src/types/auth-responses.type";
import { NextRequest, NextResponse } from "next/server";

export async function GET ( request : NextRequest ) {

    const authHeader = request.headers.get('authorization') ;


    if( !authHeader ) return NextResponse.json( {message: "No token provided"}, {status: 401} )  ;


    const response = await fetch( `${process.env.API_URL}/users/me`, {

        method: "GET",
        headers: {Authorization: authHeader},
        cache: "no-store"

    } );


    const data : UserT | ErrorResponseT = await response.json() ;

    
    return NextResponse.json( data, {status: response.status} )

}