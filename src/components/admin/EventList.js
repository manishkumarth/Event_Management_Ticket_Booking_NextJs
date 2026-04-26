"use client"
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function EventList() {
    const [loadig, setLoding] = useState(false);
    const [data, setData] = useState([])
    const getAllEvents = async () => {
        try {
            setLoding(true)
            const res = await fetch("/api/get-product", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json()
            console.log(data)
            if (data.message == "success") {
                console.log("success")
                setData(data.data)
            }
        } catch (err) {
            console.log(err)
        }

    }
    const deleteEvent = (id) => {
        const updatedData = data.filter((item) => item._id !== id)
        setData(updatedData)
        toast.success("Event Deleted Successfully")
    }
    useEffect(() => {
        getAllEvents()
    }, [])
    return (
        <div className="p-5 md:overflow-hidden overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Category</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Time</th>
                        <th className="border p-2">Location</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Available</th>
                        <th className="border p-2">Coupon</th>
                        <th className="border p-2">Image</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <AnimatePresence>
                        {data?.map((item) => (
                            <motion.tr
                                layout
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: 200, transition: { duration: 0.3 } }}

                                key={item._id} className="border-mb shadow-red text-center">
                                <td className="p-2">{item.title}</td>
                                <td className="p-2">{item.category}</td>
                                <td className="p-2">{item.date}</td>
                                <td className="p-2">{item.time}</td>
                                <td className="p-2">{item.location}</td>
                                <td className="p-2">₹{item.price}</td>
                                <td className="p-2">{item.availableSeats}</td>
                                <td className="p-2">{item.coupan}%</td>

                                <td className="p-2">
                                    <img
                                        src={item.image}
                                        alt="event"
                                        className="w-20 h-12 object-cover mx-auto"
                                    />
                                </td>

                                <td className="p-2 flex gap-2 justify-center">
                                    <Link href={`/admin/dashboard/all-events/update-event/${item._id}`}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded">
                                        Edit
                                    </Link>
                                    <button onClick={() => deleteEvent(item._id)} className="px-3 py-1 bg-red-500 text-white rounded">
                                        Delete
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>

                </tbody>
            </table>
        </div >
    )
}
export default EventList