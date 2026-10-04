import { NextRequest, NextResponse } from "next/server" ;

export async function GET( request : NextRequest ) {

    const authHeader = request.headers.get("authorization") ;

    if( !authHeader ) return NextResponse.json( {message: "No token provided"}, {status: 401} ) ;


    const transactionDate = request.nextUrl.searchParams.get( "transactionDate" ) ;


    const response = await fetch( `${process.env.API_URL}/transactions?transactionDate=${transactionDate ?? ""}`, {

        headers: {Authorization: authHeader},
        cache: "no-store"
        
    } )


    const data = await response.json() ;


    return NextResponse.json( data, {status: response.status } )

}