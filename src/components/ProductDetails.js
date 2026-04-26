<<<<<<< HEAD
"use client";
import { useEffect, useState } from "react";
import Payment from "./Payment";
import { load } from "@cashfreepayments/cashfree-js";
function ProductDetails({ id }) {
    const [detailsData, setDetailsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [quantity, setQuantity] = useState(1);
    const [coupon, setCoupon] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [isCouponValid, setIsCouponValid] = useState(null);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

    // Base price before discount
    const baseTotal = detailsData ? detailsData.price * quantity : 0;
    // Final price after applying discount
    const totalPrice = Math.round(baseTotal * (1 - discountPercent / 100));

    const getProductDetails = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const res = await fetch(`/api/get-product/${id}`);
            if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

            const result = await res.json();
            const event = result.data;

            setDetailsData(event);
            setQuantity(1);
            setCoupon("");
            setDiscountPercent(0);
            setIsCouponValid(null);
        } catch (err) {
            console.error("Error fetching product details:", err);
            setError(err.message || "Failed to load event details");
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuantity = (action) => {
        if (!detailsData) return;

        if (action === "inc" && quantity < detailsData.availableSeats) {
            setQuantity((prev) => prev + 1);
            setDetailsData((prev) => ({
                ...prev,
                availableSeats: prev.availableSeats - 1,
            }));
        }

        if (action === "dec" && quantity > 1) {
            setQuantity((prev) => prev - 1);
            setDetailsData((prev) => ({
                ...prev,
                availableSeats: prev.availableSeats + 1,
            }));
        }
    };

    const handleCheckCoupon = async () => {
        if (!coupon.trim() || !detailsData) return;

        setIsApplyingCoupon(true);
        setIsCouponValid(null);

        try {
            const res = await fetch(`/api/validate-coupan/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    coupan: coupon
                })
            });

            const data = await res.json();

            if (res.ok && data.isCoupan) {
                const discount = Number(data.coupan);
                setDiscountPercent(discount);
                setIsCouponValid(true);
                console.log(`Coupon applied: ${discount}% discount`);
            } else {
                setIsCouponValid(false);
                setDiscountPercent(0);
            }
        } catch (err) {
            console.error("Coupon validation error:", err);
            setIsCouponValid(false);
            setDiscountPercent(0);
        } finally {
            setIsApplyingCoupon(false);
        }
    };

    const handleBookTicket = async () => {
        if (!detailsData) return;

        const bookingData = {
            ...detailsData,
            quantity,
            baseTotal,
            totalPrice,
            discountPercent,
            bookedAt: Date.now(),
            couponApplied: isCouponValid ? coupon.toUpperCase() : null,
        };
        console.log("booking data",bookingData)
        const response = await fetch("/api/create-order", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(bookingData)
        })
        const data = await response.json()
        console.log("response", data)
        const cashfree = await load({
            mode: "sandbox",
          });
        
          // 3. open payment
          await cashfree.checkout({
            paymentSessionId: data.payment_session_id,
            redirectTarget: "_self", // or "_self"
          });
    };

    // Fetch product on mount or id change
    useEffect(() => {
        if (id) getProductDetails();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading event details...</p>
                </div>
            </div>
        );
    }

    if (error || !detailsData) {
        return (
            <div className="min-h-screen  flex items-center justify-center px-4">
                <div className="text-center text-red-500 max-w-md">
                    <p className="text-xl mb-6">{error || "Failed to load event details"}</p>
                    <button
                        onClick={getProductDetails}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-900 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl">

                    {/* LEFT SIDE - Event Details */}
                    <div className="relative h-full min-h-[620px] flex flex-col">
                        {detailsData.image && (
                            <img
                                src={detailsData.image}
                                alt={detailsData.title}
                                className="w-full h-auto object-cover"
                            />
                        )}
                        <div className="p-8">
                            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                                {detailsData.title}
                            </h1>
                            <div className="flex flex-wrap gap-x-6 text-gray-300 text-lg">
                                <span>📅 {new Date(detailsData.date).toLocaleDateString("en-IN", {
                                    weekday: "short", month: "short", day: "numeric", year: "numeric"
                                })}</span>
                                <span>🕒 {detailsData.time}</span>
                                <span>📍 {detailsData.location}</span>
                            </div>
                        </div>

                        <div className="flex-1 ps-6 pb-5 space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
                                <p className="text-gray-300 leading-relaxed text-[17px]">
                                    {detailsData.description}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-y-6 text-base">
                                <div>
                                    <p className="text-gray-500">Category</p>
                                    <p className="font-medium text-white mt-1">{detailsData.category}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Price per Ticket</p>
                                    <p className="font-medium text-white mt-1">₹{detailsData.price}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Total Seats</p>
                                    <p className="font-medium text-white mt-1">{detailsData.totalSeats}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Seats Remaining</p>
                                    <p className="font-medium text-emerald-400 mt-1">{detailsData.availableSeats}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Booking Panel */}
                    <div className="p-5 lg:p-10 flex flex-col">
                        <h3 className="text-3xl font-bold mb-4 text-center lg:text-left">Book Tickets</h3>

                        {/* Quantity Selector */}
                        <div className="mb-8">
                            <p className="text-gray-400 mb-4">Number of Tickets</p>
                            <div className="flex items-center bg-gray-800 rounded-2xl px-4 justify-center py-2 w-[68%]">
                                <button
                                    onClick={() => handleQuantity("dec")}
                                    disabled={quantity === 1}
                                    className="w-14 h-14 text-4xl hover:bg-gray-700 rounded-xl transition-all disabled:opacity-50"
                                >
                                    −
                                </button>
                                <span className="text-4xl font-semibold w-20 text-center">{quantity}</span>
                                <button
                                    onClick={() => handleQuantity("inc")}
                                    disabled={quantity >= detailsData.availableSeats}
                                    className="w-14 h-14 text-4xl hover:bg-gray-700 rounded-xl transition-all disabled:opacity-50"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Coupon Section */}
                        <div className="mb-8">
                            <p className="text-gray-400 mb-3">Have a coupon code?</p>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={coupon}
                                    onChange={(e) => {
                                        setCoupon(e.target.value.toUpperCase());
                                        if (isCouponValid !== null) {
                                            setIsCouponValid(null);
                                        }
                                    }}
                                    placeholder="ENTER CODE"
                                    className="flex-1 bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-600 text-white placeholder-gray-500"
                                />
                                <button
                                    onClick={handleCheckCoupon}
                                    disabled={!coupon.trim() || isApplyingCoupon}
                                    className="md:px-10 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 rounded-2xl font-medium transition-all"
                                >
                                    {isApplyingCoupon ? "..." : "Apply"}
                                </button>
                            </div>

                            {isCouponValid === true && (
                                <p className="text-emerald-400 text-sm mt-3">
                                    {discountPercent}% Coupon applied successfully!
                                </p>
                            )}
                            {isCouponValid === false && (
                                <p className="text-red-500 text-sm mt-3"> Invalid coupon code</p>
                            )}
                        </div>

                        {/* Total Amount */}
                        <div className="border-t border-gray-700 pt-8 mt-auto">
                            <div className="flex justify-between items-baseline">
                                <span className="text-xl text-gray-400">Total Amount</span>
                                <div className="text-right">
                                    <span className="text-5xl font-bold text-white">₹{totalPrice}</span>
                                    {discountPercent > 0 && (
                                        <p className="text-emerald-400 text-sm mt-1">
                                            {discountPercent}% discount applied
                                        </p>
                                    )}
                                </div>
                            </div>

                            {quantity > 1 && (
                                <p className="text-right text-gray-500 mt-1">
                                    {quantity} × ₹{detailsData.price}
                                </p>
                            )}
                        </div>

                        {/* Book Button */}
                        <button
                            onClick={handleBookTicket}
                            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-5 rounded-2xl text-xl font-semibold transition-all active:scale-95"
                        >
                            Book Now - ₹{totalPrice}
                        </button>

                            <Payment />
                        <p className="text-center text-xs text-gray-500 mt-5">
                            Seats will be reserved immediately
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
=======
async function ProductDetails({ id }) {

    console.log("id is: ", id)
    const res = await fetch(`http://localhost:3000/api/get-product/${id}`);
    const data = await res.json();
    return (
        <>
            this is detials page
        </>
    )
}
export default ProductDetails
>>>>>>> cdcbcdc6bb44fdf9f27407369c3a455c252af747
