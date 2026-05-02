"use client";

import QRCode from "react-qr-code";
import { FaDownload, FaShareSquare, FaCopy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function TicketHistory({ ticketData, onDelete, currentFilter = "All" }) {
    const [showModal, setShowModal] = useState(false);
    const [qrSize, setQrSize] = useState(140);

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth;
            if (width < 480) setQrSize(80);
            else if (width < 768) setQrSize(100);
            else setQrSize(140);
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Correct and Robust isValid Check
    const isValid = Boolean(
        ticketData.isValid === true ||
        ticketData.isValid === "true" ||
        ticketData.isValid === 1
    );

    // Filter Logic
    if (currentFilter === "Active" && !isValid) return null;
    if (currentFilter === "Expire" && isValid) return null;

    const formatDateTime = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return (
            date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }) +
            ", " +
            date.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })
        );
    };

    const copyTicketId = () => {
        navigator.clipboard.writeText(ticketData.ticketId);
        toast.success("Ticket ID copied!");
    };

    const downloadQR = async () => {
        if (!isValid) {
            toast.error("Ticket expired or already used");
            return;
        }

        const svg = document.querySelector(`#qr-${ticketData._id} svg`);
        if (!svg) return;

        try {
            const svgData = new XMLSerializer().serializeToString(svg);
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width * 2;
                canvas.height = img.height * 2;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const link = document.createElement("a");
                link.download = `QR_${ticketData.ticketId}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
            };

            img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
        } catch (error) {
            console.error("Download failed", error);
            toast.error("Failed to download QR");
        }
    };

    const shareQR = async () => {
        if (!isValid) {
            toast.error("Ticket expired or already used");
            return;
        }

        const svg = document.querySelector(`#qr-${ticketData._id} svg`);
        if (!svg) return;

        try {
            const svgData = new XMLSerializer().serializeToString(svg);
            const img = new Image();

            img.onload = async () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width * 2;
                canvas.height = img.height * 2;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const dataUrl = canvas.toDataURL("image/png");
                const blob = await (await fetch(dataUrl)).blob();

                const file = new File([blob], `Ticket_${ticketData.ticketId}.png`, {
                    type: "image/png",
                });

                if (navigator.share) {
                    await navigator.share({
                        title: `${ticketData.eventTitle} Ticket`,
                        text: `🎟️ Ticket ID: ${ticketData.ticketId}`,
                        files: [file],
                    });
                }
            };

            img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
        } catch (error) {
            console.error("Share failed", error);
            toast.error("Failed to share ticket");
        }
    };

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 200 }}
                className="flex flex-row justify-between items-center py-4 px-4 sm:px-5 shadow bg-[#2f2d2d85] rounded-2xl border border-gray-700"
            >
                <div id={`qr-${ticketData._id}`}>
                    <QRCode size={qrSize} value={ticketData.ticketId} />
                </div>

                <div className="flex-1 mx-4 sm:mx-6 hidden sm:block">
                    <h3 className="font-semibold text-base sm:text-lg text-white">
                        {ticketData.eventTitle}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-400">
                        {ticketData.eventDate} • {ticketData.eventTime}
                    </p>

                    <div className="mt-2">
                        <span
                            className={`text-[10px] sm:text-xs px-3 py-1 rounded-full font-medium ${
                                isValid
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                            }`}
                        >
                            {isValid ? "ACTIVE" : "EXPIRED"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 text-lg sm:text-xl">
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-blue-500 hover:text-blue-400 font-medium"
                    >
                        View
                    </button>

                    <button
                        onClick={downloadQR}
                        className={isValid ? "text-blue-500 hover:text-blue-400" : "text-gray-500"}
                        disabled={!isValid}
                    >
                        <FaDownload />
                    </button>

                    <button
                        onClick={shareQR}
                        className={isValid ? "text-green-500 hover:text-green-400" : "text-gray-500"}
                        disabled={!isValid}
                    >
                        <FaShareSquare />
                    </button>

                    <button
                        onClick={() => onDelete(ticketData._id)}
                        className="text-red-500 hover:text-red-400"
                    >
                        <MdDelete />
                    </button>
                </div>
            </motion.div>

            {/* ====================== FULL MODAL ====================== */}
            {showModal && (
                <div className="fixed inset-0 bg-black/90 z-[9999] flex justify-center items-start pt-[100px] sm:pt-[120px] md:pt-[140px] p-4 overflow-y-auto">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#1a1a1a] rounded-3xl w-full max-w-[380px] overflow-hidden shadow-2xl border border-gray-700"
                    >
                        <div className="px-5 py-4 border-b border-gray-700 flex justify-between items-center bg-[#1f1f1f]">
                            <h2 className="text-lg font-bold text-white truncate">
                                {ticketData.eventTitle}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-3xl text-gray-300 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6 bg-[#111] flex flex-col items-center gap-4">
                            <div className="bg-white p-4 rounded-2xl">
                                <QRCode size={220} value={ticketData.ticketId} />
                            </div>

                            <span
                                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                    isValid
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-red-400"
                                }`}
                            >
                                {isValid ? "Valid Ticket" : "Expired / Used Ticket"}
                            </span>
                        </div>

                        <div className="p-5 space-y-5 text-white">
                            <div>
                                <p className="text-gray-400 text-xs mb-2">Ticket ID</p>
                                <div className="bg-[#252525] rounded-xl px-4 py-3 flex justify-between items-center">
                                    <span className="font-mono text-sm break-all">
                                        {ticketData.ticketId}
                                    </span>
                                    <button onClick={copyTicketId} className="text-blue-400">
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5 text-sm">
                                <div>
                                    <p className="text-gray-400 text-xs">Payment</p>
                                    <p className={`font-semibold mt-1 ${ticketData.paymentStatus === "paid" ? "text-green-400" : "text-yellow-400"}`}>
                                        {ticketData.paymentStatus.toUpperCase()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-xs">Ticket Status</p>
                                    <p className={`font-semibold mt-1 ${isValid ? "text-green-400" : "text-red-400"}`}>
                                        {isValid ? "Valid" : "Expired"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-xs">Amount</p>
                                    <p className="mt-1">₹{ticketData.totalPrice}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-xs">Booked On</p>
                                    <p className="text-xs text-gray-300 mt-1">
                                        {formatDateTime(ticketData.createdAt)}
                                    </p>
                                </div>

                                <div className="col-span-2">
                                    <p className="text-gray-400 text-xs">Location</p>
                                    <p className="text-sm text-gray-300 mt-1 leading-relaxed">
                                        {ticketData.eventLocation}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-700 flex gap-3">
                            <button
                                onClick={downloadQR}
                                disabled={!isValid}
                                className={`flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium ${
                                    isValid
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-gray-700 cursor-not-allowed"
                                }`}
                            >
                                <FaDownload /> Download QR
                            </button>

                            <button
                                onClick={shareQR}
                                disabled={!isValid}
                                className={`flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium ${
                                    isValid
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-gray-700 cursor-not-allowed"
                                }`}
                            >
                                <FaShareSquare /> Share Ticket
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}

export default TicketHistory;