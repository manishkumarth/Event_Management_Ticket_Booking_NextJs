import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/db";
import BookedTicket from "@/models/Tickets";
import Events from "@/models/Events";

export async function POST(req) {
  try {
    await connectDB();

    const token = await getToken({ req });

    if (!token || !token.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { order_id, eventId, quantity } = await req.json();

    if (!order_id || !eventId) {
      return NextResponse.json(
        { message: "Missing required data" },
        { status: 400 }
      );
    }

    // 🔹 Step 1: Verify payment from Cashfree
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

    // ❌ Payment not successful
    if (data.order_status !== "PAID") {
      return NextResponse.json({
        success: false,
        message: "Payment not completed",
      });
    }

    // 🔹 Step 2: Prevent duplicate ticket
    const existing = await BookedTicket.findOne({ orderId: order_id });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Ticket already created",
        data: existing,
      });
    }

    // 🔹 Step 3: Get event
    const event = await Events.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    // 🔹 Step 4: Check seats
    if (event.availableSeats < quantity) {
      throw new Error("Not enough seats");
    }

    // 🔹 Step 5: Create ticket 🎟️
    const ticket = await BookedTicket.create({
      user: token.id,
      event: event._id,

      ticketId: "TICKET_" + Date.now(),

      orderId: order_id,
      paymentId: data.cf_order_id,
      paymentStatus: "paid",

      quantity: quantity,
      totalPrice: data.order_amount,

      // snapshot
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      priceAtBooking: event.price,
    });

    // 🔹 Step 6: Update seats
    event.availableSeats -= quantity;
    await event.save();

    return NextResponse.json({
      success: true,
      message: "Ticket created successfully",
      data: ticket,
    });

  } catch (error) {
    console.log("VERIFY ERROR:", error);

    return NextResponse.json(
      { error: "verification failed" },
      { status: 500 }
    );
  }
}