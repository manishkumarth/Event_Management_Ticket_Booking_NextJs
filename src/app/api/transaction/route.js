import { connectDB } from "@/lib/db";
import BookedTicket from "@/models/Tickets";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
    try {
        await connectDB();

        const token = await getToken({ req });

        if (!token || !token.id) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const transactions = await BookedTicket.find({
            user: token.id
        }).sort({ createdAt: -1 });
        console.log("transactions",transactions)
        const formattedData = transactions.map((item) => ({
            id: item._id,
            bookedDate: new Date(item.createdAt).toLocaleDateString(),
            status: item.paymentStatus,
            eventName: item.eventTitle,
            transId: item.paymentId,
            ticketId:item.ticketId,
            bookTime: item.eventTime,
            bookedTimeDate:item.createdAt
        }));

        return NextResponse.json({
            success: true,
            data: formattedData
        });

    } catch (err) {
        console.log(err);

        return NextResponse.json(
            {
                success: false,
                message: "Server Error"
            },
            { status: 500 }
        );
    }
}