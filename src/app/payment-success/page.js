"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
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
   <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-md mx-auto"
            >
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <FaCheckCircle className="text-green-500 text-[120px] drop-shadow-lg" />
                </div>

                {/* Title */}
                <h1 className="text-5xl font-bold text-white mb-3">
                    Payment Successful!
                </h1>

                <p className="text-gray-400 text-lg mb-10">
                    Thank you for your purchase. Your ticket has been booked successfully.
                </p>

                {/* Ticket Button */}
                <Link href="/ticket">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-green-600 hover:bg-green-700 transition-all 
                                   text-white font-semibold text-lg py-4 px-8 rounded-2xl
                                   flex items-center justify-center gap-3 shadow-lg shadow-green-500/30"
                    >
                        View My Tickets
                        <span className="text-xl">→</span>
                    </motion.button>
                </Link>

                <p className="text-gray-500 text-sm mt-8">
                    You will receive a confirmation email shortly
                </p>
            </motion.div>
        </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}