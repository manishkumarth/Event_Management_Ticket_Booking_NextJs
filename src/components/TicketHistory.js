
"use client"
import QRCode from "react-qr-code";
import { FaDownload } from "react-icons/fa"
import { MdDelete } from 'react-icons/md'
import { FaShareSquare } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { GrStatusGood } from "react-icons/gr";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
function TicketHistory({ ticketData, onDelete }) {
    const [dialogData, setDialogData] = useState("")
    const [qrSize, setQrSize] = useState(140);

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth;
            if (width < 480) setQrSize(60);
            else if (width < 768) setQrSize(80);
            else setQrSize(100);
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 200, transition: { duration: 0.3 } }}
                className="flex flex-row justify-between py-2 px-5 shadow bg-[#2f2d2d85]">
                <div>
                    <QRCode className="" size={qrSize} value={ticketData._id + " " + ticketData.isValid + " " + ticketData.eventName} />
                </div>
                <div className="flex justify-center md:gap-10 gap-5 md:text-lg text-sm">
                    <button
                        className={`${ticketData.isValid ? "text-blue-600" : "text-gray-400"}`} disabled={ticketData.isValid ? false : true}
                        onClick={() => {
                            document.getElementById('my_modal_5').showModal()
                            setDialogData(ticketData._id + " " + ticketData.isValid)
                            console.log(ticketData._id + " " + ticketData.isValid)
                        }
                        }>view</button>
                    <button>{ticketData.isValid ? <><GrStatusGood className="text-green-600" /> </> : <><GrStatusGood className="text-red-600" /> </>}</button>
                    <button><HiOutlineExclamationCircle /> </button>
                    <button className={`${ticketData.isValid ? "text-blue-600" : "text-gray-400"}`} disabled={ticketData.isValid ? false : true}><FaDownload /></button>
                    <button className={`${ticketData.isValid ? "text-blue-600" : "text-gray-400"}`} disabled={ticketData.isValid ? false : true}><FaShareSquare /></button>
                    <button onClick={() => onDelete(ticketData._id)} className={`${ticketData.isValid ? "text-blue-600" : "text-gray-400"}`} disabled={ticketData.isValid ? false : true}> <MdDelete /> </button>
                </div>
            </motion.div>


            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <p className="py-4">your ticket</p>
                    {
                        <QRCode value={ticketData._id + " " + ticketData.isValid + " " + ticketData.eventName} />
                    }
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}
export default TicketHistory;