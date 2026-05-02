import { NextResponse } from "next/server";
import BookedTicket from "@/models/Tickets";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  try {
    await connectDB();

    const reqData = await req.json();
    const token = await getToken({ req });

    if (!token || !token.id) {
      return NextResponse.json(
        { message: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    console.log("Incoming Data:", reqData);

    const amount = Number(reqData.totalPrice);

    if (!amount || isNaN(amount)) {
      throw new Error("Invalid order amount");
    }

    const orderId = "order_" + Date.now();

    const response = await fetch(process.env.CashFreeOrderAPI, {
      method: "POST",
      headers: {
        "x-api-version": "2023-08-01",
        "x-client-id": process.env.CashFreeClientId,
        "x-client-secret": process.env.CashFreeClientSecret,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: "cust_" + Date.now(),
          customer_email: reqData.email || "test@gmail.com",
          customer_phone: reqData.phone || "9999999999",
        },
        order_meta: {
          return_url:
            `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?order_id={order_id}`,
        },
      }),
    });
 
    const data = await response.json();

    console.log("Cashfree Response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Cashfree API error");
    }

    // Save Pending Ticket
    await BookedTicket.create({
      user: token.id,
      event: reqData.eventId,

      ticketId: "TICKET_" + Date.now(),

      orderId: orderId,
      paymentId: data.cf_order_id || "",

      paymentStatus: "pending",

      quantity: reqData.quantity,
      totalPrice: amount,

      eventTitle: reqData.eventTitle,
      eventDate: reqData.eventDate,
      eventTime: reqData.eventTime,
      eventLocation: reqData.eventLocation,
      priceAtBooking: reqData.priceAtBooking,
      isValid:false
    });

    return NextResponse.json(data);

  } catch (error) {
    console.log("ERROR:", error);

    return NextResponse.json(
      {
        error: error.message || "server error",
      },
      { status: 500 }
    );
  }
}