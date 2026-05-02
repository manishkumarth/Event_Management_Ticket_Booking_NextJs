import { connectDB } from "@/lib/db";
import BookedTicket from "@/models/Tickets";
import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt'
export async function GET(req, { params }) {
    try {
        await connectDB()
        const token = await getToken({ req });

        if (!token || !token.id) {
            return NextResponse.json(
                { message: "Unauthorized. Please login first." },
                { status: 401 }
            );
        }
        const id = token.id
        console.log("id", id)

        const tickets = await BookedTicket.find({
            user: token.id
        });
        console.log("users", tickets)
        return NextResponse.json({
            message: "success",
            tickets
        })

    } catch (error) {
        return NextResponse.json({
            message: "server error",
        })
    }
}