"use client"
import { useState } from "react"
import { toast } from "react-toastify"

function ValidateTicketWithId() {

    const [ticketId, setTicketId] = useState("")
    const [validateText, setValidateText] = useState("")

    const handleValidate = async () => {
        if (!ticketId.trim()) {
            toast.warn("Please Enter Ticket ID")
            return
        }
        try {
            const response = await fetch(`/api/validate-ticket/${ticketId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const result = await response.json()
            console.log("result", result)
            if (result) {
                setValidateText(result)
                document.getElementById('my_modal_6').showModal()
            }
            console.log("result", result)
        } catch (error) {
            alert("server error", error)
        }
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

            <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box rounded-3xl bg-white text-black text-center shadow-2xl">

                    <button
                        className="absolute right-4 top-4 text-xl text-gray-500 hover:text-black"
                        onClick={() => document.getElementById("my_modal_6").close()}
                    >
                        ✕
                    </button>

                    <div className="mb-4 text-5xl">
                        {validateText?.isValid ? "✅" : "❌"}
                    </div>

                    <h2 className="text-2xl font-bold mb-2">
                        Ticket Status
                    </h2>

                    <p className="text-gray-600 text-lg">
                        {validateText?.message}
                    </p>
                </div>
            </dialog>
        </div>
    )
}

export default ValidateTicketWithId