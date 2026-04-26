"use client"
import { useState } from "react"

function ValidateTicketWithId() {

    const [ticketId, setTicketId] = useState("")

    const handleValidate = () => {
        if (!ticketId.trim()) {
            alert("Enter Ticket ID")
            return
        }

        console.log("Validating:", ticketId)

        // API call yaha karega tu
    }

    return (
        <div className="flex flex-col gap-4">

            <label className="text-gray-700 font-medium">
                Enter Ticket ID
            </label>

            <input
                type="text"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                placeholder="e.g. 1002"
                className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-400"
            />

            <button
                onClick={handleValidate}
                className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 active:scale-95 transition"
            >
                Validate Ticket
            </button>

        </div>
    )
}

export default ValidateTicketWithId