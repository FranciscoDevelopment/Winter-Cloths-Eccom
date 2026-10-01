import { ErrorResponseT, RefreshResponseT } from "@/src/types/auth-responses.type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const refreshToken = request.cookies.get("refresh_token")?.value;

    if (!refreshToken) {
        return NextResponse.json({ message: "No active session" }, { status: 401 });
    }

    const response = await fetch(`${process.env.API_URL}/auth/refresh`, {

        method: "POST",
        headers: { Authorization: `Bearer ${refreshToken}` },
        cache: "no-store"

    });


    const data : RefreshResponseT | ErrorResponseT = await response.json();

    if (!response.ok) {

        const res = NextResponse.json(data, { status: response.status });

        res.cookies.delete("refresh_token"); // 👈 refresh inválido/vencido: matamos la cookie local también

        return res;

    }

    const { refresh_token, ...rest } = data as RefreshResponseT; // 👈 rotación: nos llega un refresh_token nuevo

    const res = NextResponse.json(rest, { status: response.status });

    res.cookies.set("refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    });

    return res;

}
