// // app/payment-success/page.js
// "use client";

// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";

// export default function PaymentSuccess() {
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get("order_id");

//   useEffect(() => {
//     if (!orderId) return;

//     const verify = async () => {
//       const res = await fetch("/api/verify-payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ order_id: orderId }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         console.log("Payment Verified ✅");
//       } else {
//         console.log("Payment Failed ❌");
//       }
//     };
    

//     verify();
//   }, [orderId]);

//   return (
//     <>
//     <h1>Payment success</h1>
//     <Link href="/ticket">Go to Ticket Page</Link>
    
//     </>
//   )
// }



"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (!orderId) return;

    const verify = async () => {
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: orderId }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Payment Verified ✅");
      } else {
        console.log("Payment Failed ❌");
      }
    };

    verify();
  }, [orderId]);

  return (
    <>
      <h1>Payment success</h1>
      <Link href="/ticket">Go to Ticket Page</Link>
    </>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}