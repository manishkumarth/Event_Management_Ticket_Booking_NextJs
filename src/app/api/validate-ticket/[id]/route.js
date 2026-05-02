import BookedTicket from "@/models/Tickets";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { FaLessThanEqual } from "react-icons/fa6";

export async function POST(req, { params }) {
    try {
        const token = await getToken({ req });

        if (!token || !token.id || token.role !== "admin") {
            return NextResponse.json(
                { message: "Unauthorized. Please login first." },
                { status: 401 }
            );
        }

        const { id } =await params;

        const ticket = await BookedTicket.findOne({ticketId:id});
        console.log("id plus ticket",ticket,id)
        if (!ticket) {
            return NextResponse.json(
                { message: "Ticket not found" },
                { status: 404 }
            );
        }

        // already validated
        if (ticket.isValid === false) {
            return NextResponse.json(
                {
                    message: "Ticket already validated",
                    isValid: false
                },
                { status: 400 }
            );
        }

        // update validation
        ticket.isValid = false;
        await ticket.save();

        return NextResponse.json({
            message: "Ticket validated successfully",
            isValid: true
        });

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                message: "server error"
            },
            { status: 500 }
        );
    }
}