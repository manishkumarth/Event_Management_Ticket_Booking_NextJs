"use client";
import { useState } from "react";

export default function Payment() {
    const [loading, setLoading] = useState(false);
    const datas={id:'123543'}

    const handlePayment = async ({TicketData}) => {
        try {
            setLoading(true);
            // 1. Create order from backend
            const res = await fetch("/api/create-order", {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(datas)
            });

            const data = await res.json();
            console.log("Order Data:", data);

            // 2. Open Cashfree Payment Page
            if (data.payment_session_id) {

                const cashfree = window.Cashfree({
                    mode: "sandbox"
                });

                cashfree.checkout({
                    paymentSessionId: data.payment_session_id,
                    redirectTarget: "_self"
                });

            } else {
                alert("Payment session not received");
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "50px" }}>
            <h1>Cashfree Payment</h1>

            <button onClick={handlePayment}>
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </div>
    );
}