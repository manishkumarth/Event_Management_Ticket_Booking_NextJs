"use client"
import { useEffect, useState } from "react"
import Payment from "./Payment"
function TransationHistory() {
    const [transData, setTransData] = useState([])
    const getTransHistory = async () => {
        const data = await fetch("/api/transaction", {
            method: "GET"
        })
        const res = await data.json()
        setTransData(res.data)
        console.log("response", res)
    }


    useEffect(() => {
        getTransHistory()
        
    }, [])
    return (
        <>
            {/* <h1> this is ticket history {transData}</h1> */}
            <div className="overflow-x-auto">
                <Payment />
                <div>
                    <button className="border">failed</button>
                    <button className="border">success</button>
                </div>
                {
                    transData.length === 0 ? <p>No transaction</p>
                        :
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Event Name</th>
                                    <th>BookedDate</th>
                                    <th>Time</th>
                                    <th>Transaction Id</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody className="border p-10">
                                {
                                    transData?.map((item) =>
                                    (
                                        <tr className="border shadow my-20 bg-[#2f2d2d85]" key={item.id}>
                                            <th>{item.eventName}</th>
                                            <td>{item.bookedDate}</td>
                                            <td>{item.bookTime}</td>
                                            <td>{item.transId}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </div>
        </>
    )
}
export default TransationHistory