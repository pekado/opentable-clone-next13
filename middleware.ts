import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import jwt from "jsonwebtoken"

export async function middleware (req: NextRequest, res: NextResponse) {
    const bearerToken = req.headers.get("authorization") as string
    if (!bearerToken) {
        return new NextResponse(JSON.stringify({ status: 401, errorMessage: "Unauthorize request" }))
    }
    const token = bearerToken.split(" ")[1]
    if (!token) {
        return new NextResponse(JSON.stringify({ status: 401, errorMessage: "Unauthorize request" }))
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    try {
        await jose.jwtVerify(token, secret)
    } catch (error) {
        return new NextResponse(JSON.stringify({ status: 401, errorMessage: "Unauthorize request" }))

    }
    const payload = jwt.decode(token) as { email: string }

    if (!payload) {
        return new NextResponse(JSON.stringify({ status: 401, errorMessage: "Unauthorize request" }))

    }
}

export const config = {
    matcher: [ "api/auth/user"]
}