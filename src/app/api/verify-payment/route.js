import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/db";
import BookedTicket from "@/models/Tickets";
import Events from "@/models/Events";

export async function POST(req) {
  try {
    await connectDB();

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token || !token.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { order_id } = await req.json();

    if (!order_id) {
      return NextResponse.json(
        { message: "Order ID missing" },
        { status: 400 }
      );
    }

    // Step 1: Verify payment from Cashfree
    const response = await fetch(
      `https://sandbox.cashfree.com/pg/orders/${order_id}`,
      {
        method: "GET",
        headers: {
          "x-api-version": "2023-08-01",
          "x-client-id": process.env.CashFreeClientId,
          "x-client-secret": process.env.CashFreeClientSecret,
        },
      }
    );

    const data = await response.json();

    console.log("Cashfree Verify Response:", data);

    // Step 2: Check payment status
    if (data.order_status !== "PAID") {
      await BookedTicket.findOneAndUpdate(
        { orderId: order_id },
        {
          paymentStatus: "failed",
        }
      );

      return NextResponse.json({
        success: false,
        message: "Payment not completed",
      });
    }

    // Step 3: Get pending ticket
    const pendingTicket = await BookedTicket.findOne({
      orderId: order_id,
    });

    if (!pendingTicket) {
      return NextResponse.json(
        { message: "Pending ticket not found" },
        { status: 404 }
      );
    }

    // Step 4: Get event
    const event = await Events.findById(pendingTicket.event);

    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    // Step 5: Check seats
    if (event.availableSeats < pendingTicket.quantity) {
      return NextResponse.json(
        { message: "Not enough seats available" },
        { status: 400 }
      );
    }

    // Step 6: Prevent duplicate payment update
    if (pendingTicket.paymentStatus === "paid") {
      return NextResponse.json({
        success: true,
        message: "Ticket already verified",
        data: pendingTicket,
      });
    }

    // Step 7: Update pending ticket → paid
    const updatedTicket = await BookedTicket.findOneAndUpdate(
      { orderId: order_id },
      {
        paymentStatus: "paid",
        paymentId: data.cf_order_id,
        isValid:true
      },
      { new: true }
    );

    // Step 8: Reduce seats
    event.availableSeats -= pendingTicket.quantity;
    await event.save();

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      data: updatedTicket,
    });

  } catch (error) {
    console.log("VERIFY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "verification failed",
      },
      { status: 500 }
    );
  }
}