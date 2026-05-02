"use client"
import { useEffect, useState } from "react"

function TransactionHistory() {
    const [transData, setTransData] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState("All")

    const getTransHistory = async () => {
        try {
            const response = await fetch("/api/transaction", { method: "GET" })
            const result = await response.json()

            if (result.success) {
                setTransData(result.data || [])
            }
        } catch (error) {
            console.error("Error fetching transactions:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTransHistory()
    }, [])

    const formatDateTime = (dateString) => {
        if (!dateString) return "N/A"
        const date = new Date(dateString)
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }) + ", " + date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    const getDisplayStatus = (status) => {
        if (!status) return "UNKNOWN"
        return status.toLowerCase() === "pending" ? "FAILED" : status.toUpperCase()
    }

    const getStatusBadge = (status) => {
        const lower = status?.toLowerCase()
        if (lower === "pending" || lower === "failed") return "bg-red-600 text-white"
        if (lower === "paid" || lower === "success") return "bg-green-600 text-white"
        return "bg-gray-600 text-white"
    }

    // Filter Logic
    const filteredData = transData.filter((item) => {
        const status = item.status?.toLowerCase()
        if (activeFilter === "All") return true
        if (activeFilter === "Paid") return status === "paid" || status === "success"
        if (activeFilter === "Failed") return status === "failed" || status === "pending"
        return true
    })

    // Skeleton Row
    const SkeletonRow = () => (
        <tr className="border shadow my-4 bg-[#2f2d2d85] animate-pulse">
            <th className="py-5 px-4"><div className="h-5 bg-gray-700 rounded w-48"></div></th>
            <td className="py-5 px-4"><div className="h-5 bg-gray-700 rounded w-52"></div></td>
            <td className="py-5 px-4"><div className="h-5 bg-gray-700 rounded w-36"></div></td>
            <td className="py-5 px-4"><div className="h-6 bg-gray-700 rounded-full w-24"></div></td>
        </tr>
    )

    return (
        <>
            <div className="w-full">
                {/* Filter Buttons */}
                <div className="flex gap-3 my-6 flex-wrap">
                    <button 
                        onClick={() => setActiveFilter("All")}
                        className={`px-5 py-2 rounded-lg border transition ${activeFilter === "All" ? "bg-white text-black border-white" : "border-gray-500 hover:bg-gray-800"}`}
                    >
                        All
                    </button>
                    <button 
                        onClick={() => setActiveFilter("Paid")}
                        className={`px-5 py-2 rounded-lg border transition ${activeFilter === "Paid" ? "bg-white text-black border-white" : "border-gray-500 hover:bg-gray-800"}`}
                    >
                        Paid
                    </button>
                    <button 
                        onClick={() => setActiveFilter("Failed")}
                        className={`px-5 py-2 rounded-lg border transition ${activeFilter === "Failed" ? "bg-white text-black border-white" : "border-gray-500 hover:bg-gray-800"}`}
                    >
                        Failed
                    </button>
                </div>

                {/* Table Container with Horizontal Scroll */}
                <div className="overflow-x-auto rounded-xl border border-gray-700 bg-[#1f1f1f]">
                    {loading ? (
                        <table className="table w-full min-w-[700px]">
                            <thead>
                                <tr className="text-left border-b border-gray-700">
                                    <th className="py-4 px-6 font-medium">Event Name</th>
                                    <th className="py-4 px-6 font-medium">Booked Date & Time</th>
                                    <th className="py-4 px-6 font-medium">Transaction ID</th>
                                    <th className="py-4 px-6 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array(4).fill(0).map((_, i) => <SkeletonRow key={i} />)}
                            </tbody>
                        </table>
                    ) : filteredData.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <p>No transactions found for this filter</p>
                        </div>
                    ) : (
                        <table className="table w-full min-w-[700px]">
                            <thead>
                                <tr className="text-left border-b border-gray-700">
                                    <th className="py-4 px-6 font-medium">Event Name</th>
                                    <th className="py-4 px-6 font-medium">Booked Date & Time</th>
                                    <th className="py-4 px-6 font-medium">Transaction ID</th>
                                    <th className="py-4 px-6 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredData.map((item) => (
                                    <tr 
                                        key={item.id} 
                                        className="hover:bg-[#2a2a2a] transition-colors"
                                    >
                                        <th className="py-5 px-6 font-medium text-left">{item.eventName}</th>
                                        <td className="py-5 px-6 font-medium whitespace-nowrap">
                                            {formatDateTime(item.bookedTimeDate)}
                                        </td>
                                        <td className="py-5 px-6 font-mono text-sm text-gray-300">
                                            {item.transId}
                                        </td>
                                        <td className="py-5 px-6">
                                            <span className={`px-4 py-1.5 rounded-full text-sm font-medium inline-block
                                                ${getStatusBadge(item.status)}`}>
                                                {getDisplayStatus(item.status)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    )
}

export default TransactionHistory