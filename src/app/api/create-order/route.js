
import { NextResponse } from "next/server";
import BookedTicket from "@/models/Tickets";
import { getToken } from "next-auth/jwt";
export async function POST(req) {
  try {
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
          return_url: "http://localhost:3000/payment-success?order_id={order_id}"
        },
      }),
    });

    const data = await response.json();
    
    if(data){
      // BookedTicket({})
    }
    console.log("Cashfree Response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Cashfree API error");
    }

    return NextResponse.json(data);

  } catch (error) {
    console.log("ERROR:", error);
    return NextResponse.json(
      { error: error.message || "server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
    try {
      const orderId = "order_" + Date.now();
  
      const response = await fetch(process.env.CashFreeOrderAPI, {
        method: "POST",
        headers: {
            'x-api-version': '2023-08-01',
            'x-client-id': process.env.CashFreeClientId,
            'x-client-secret': process.env.CashFreeClientSecret,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: 100,
          order_currency: "INR",
          customer_details: {
            customer_id: "cust_" + Date.now(),
            customer_email: "test@gmail.com",
            customer_phone: "9999999999"
          }
        })
      });
  
      const data = await response.json();
  
      return Response.json(data);
  
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }
>>>>>>> cdcbcdc6bb44fdf9f27407369c3a455c252af747
