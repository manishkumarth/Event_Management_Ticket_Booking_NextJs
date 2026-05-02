"use client"

import TicketHistory from "@/components/TicketHistory";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

function Ticket() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("All"); // All, Active, Expire

    const getTickets = async () => {
        try {
            const response = await fetch("/api/get-ticket");
            const result = await response.json();

            if (response.ok && result.tickets) {
                const formattedTickets = result.tickets.map((ticket) => ({
                    ...ticket,
                    eventName: ticket.eventTitle,
                    isValid: ticket.paymentStatus === "paid"
                }));

                setData(formattedTickets);
            }
        } catch (error) {
            toast.warn("Server Error");
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = (id) => {
        setData(prev => prev.filter((item) => item._id !== id));
    };

    useEffect(() => {
        getTickets();
    }, []);

    // Filter tickets based on activeFilter
    const filteredTickets = data.filter((ticket) => {
        if (activeFilter === "All") return true;
        if (activeFilter === "Active") return ticket.isValid === true;
        if (activeFilter === "Expire") return ticket.isValid === false;
        return true;
    });

    return (
        <div className="flex flex-col gap-6 mx-4 md:mx-10 mt-6">
            {/* Filter Buttons */}
            <div className="flex gap-3 flex-wrap">
                <button 
                    onClick={() => setActiveFilter("All")}
                    className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                        activeFilter === "All" 
                            ? "bg-white text-black" 
                            : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    }`}
                >
                    All Tickets
                </button>

                <button 
                    onClick={() => setActiveFilter("Active")}
                    className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                        activeFilter === "Active" 
                            ? "bg-green-600 text-white" 
                            : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    }`}
                >
                    Active
                </button>

                <button 
                    onClick={() => setActiveFilter("Expire")}
                    className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                        activeFilter === "Expire" 
                            ? "bg-red-600 text-white" 
                            : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    }`}
                >
                    Expired
                </button>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="animate-pulse flex justify-between items-center p-5 bg-[#2f2d2d40] rounded-xl">
                            <div className="w-[80px] h-[80px] bg-gray-600 rounded"></div>
                            <div className="flex gap-4">
                                {[1,2,3,4,5].map(i => (
                                    <div key={i} className="w-9 h-9 bg-gray-600 rounded"></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <AnimatePresence mode="popLayout">
                    {filteredTickets.length > 0 ? (
                        filteredTickets.map((ticket) => (
                            <TicketHistory
                                key={ticket._id}
                                ticketData={ticket}
                                onDelete={deleteItem}
                                currentFilter={activeFilter}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-400 mt-16 py-10">
                            No {activeFilter !== "All" ? activeFilter.toLowerCase() : ""} tickets found
                        </div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
}

export default Ticket;