"use client"
import TicketHistory from "@/components/TicketHistory"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
function Ticket() {
    const [data,setData]=useState( [
        {
            _id: "1001",
            eventName: "movie",
            isValid: false,
        },
        {
            _id: "1002",
            eventName: "local party",
            isValid: true,
        },
        {
            _id: "1003",
            eventName: "delhi show",
            isValid: false,
        },
        {
            _id: "1004",
            eventName: "Arijit shingh show",
            isValid: true,
        },
        {
            _id: "1005",
            eventName: "bike riding",
            isValid: false,
        },
        {
            _id: "1006",
            eventName: "movie",
            isValid: true,
        },
    ])
    const deleteItem=async(id)=>{
      const  ticket_data=data.filter((item)=> item._id!==id)
        setData(ticket_data)
        console.log("deleted",ticket_data)
    }
    return (
        <div className="flex flex-col gap-4 mx-10 mt-5">
            <div>
                <button>expire</button>
                <button>active</button>
            </div>
            <AnimatePresence>
            {
                data.map((data) => (
                    <TicketHistory key={data._id} ticketData={data} onDelete={deleteItem} />
                ))
            }
            </AnimatePresence>

        </div>
    )
}
export default Ticket