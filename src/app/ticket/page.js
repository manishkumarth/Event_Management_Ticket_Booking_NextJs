<<<<<<< HEAD
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
=======
import ViewTicket from "@/components/ViewTicket"

function Ticket(){
    const ticket_data=[
        {
            id:"1001",
            eventName:"movie",
            isValid:false,
        },
        {
            id:"1002",
            eventName:"local party",
            isValid:true,
        },
        {
            id:"1003",
            eventName:"delhi show",
            isValid:false,
        },
        {
            id:"1004",
            eventName:"Arijit shingh show",
            isValid:true,
        },
        {
            id:"1005",
            eventName:"bike riding",
            isValid:false,
        },
        {
            id:"1006",
            eventName:"movie",
            isValid:true,
        },
    ]
    return(
>>>>>>> cdcbcdc6bb44fdf9f27407369c3a455c252af747
        <div className="flex flex-col gap-4 mx-10 mt-5">
            <div>
                <button>expire</button>
                <button>active</button>
            </div>
<<<<<<< HEAD
            <AnimatePresence>
            {
                data.map((data) => (
                    <TicketHistory key={data._id} ticketData={data} onDelete={deleteItem} />
                ))
            }
            </AnimatePresence>

=======
            {
                ticket_data.map((data)=>(
                    <ViewTicket key={data.id} ticketData={data} />
                ))
            }
      
>>>>>>> cdcbcdc6bb44fdf9f27407369c3a455c252af747
        </div>
    )
}
export default Ticket