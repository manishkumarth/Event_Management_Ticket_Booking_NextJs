import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import {getToken} from 'next-auth/jwt'
export async function GET(req, { params }) {
    try {
        await connectDB()
        const token = await getToken({ req });

        if (!token || !token.id || (token.role!=="admin")) {
            return NextResponse.json(
                { message: "Unauthorized. Please login first." },
                { status: 401 }
            );
        }
        console.log("token", token)

        const users = await User.find()
        console.log("users",users)
        return NextResponse.json({
            message: "success",
            users
        })
    } catch (error) {
        return NextResponse.json({
            message: "server error",
        })
    }
}