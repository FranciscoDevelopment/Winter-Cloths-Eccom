import { NextRequest, NextResponse } from "next/server";

export function middleware( request : NextRequest ) {

    const hasSession = request.cookies.has( "refresh_token" )


    if( !hasSession ) {

        const loginUrl = new URL( "/login", request.url ) ;

        loginUrl.searchParams.set( "redirectTo", request.nextUrl.pathname ) ;

        
        return NextResponse.redirect(loginUrl) ;

    }

    return NextResponse.next() ;

}

export const config = {
    matcher: ["/admin/:path*"]
}