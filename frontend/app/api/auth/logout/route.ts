import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const authHeader = request.headers.get("authorization");

    if (authHeader) {

        await fetch(`${process.env.API_URL}/auth/logout`, {
            method: "POST",
            headers: { Authorization: authHeader },
            cache: "no-store"
        }).catch(() => null); // 👈 best-effort: si falla, igual limpiamos la cookie local

    }

    const res = new NextResponse(null, { status: 204 });

    res.cookies.delete("refresh_token");

    return res;

}
