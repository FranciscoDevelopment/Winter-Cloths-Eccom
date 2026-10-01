import type { AuthResponseT, ErrorResponseT } from "@/src/types/auth-responses.type";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

    const credentials = await request.json();

    const response = await fetch(`${process.env.API_URL}/auth/login`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        cache: "no-store"

    });

    const data : AuthResponseT | ErrorResponseT  = await response.json();

    if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
    }

    const { refresh_token, ...rest } = data as AuthResponseT;

    const res = NextResponse.json(rest, { status: response.status });

    res.cookies.set("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7 // 👈 debería coincidir con JWT_REFRESH_EXPIRES_IN del backend
    });

    return res;

}
