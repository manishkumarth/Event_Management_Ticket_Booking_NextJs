import { NextResponse } from "next/server";

const transData = [
    {
        id: "001",
        bookedDate: "24-02-2026",
        status: "success",
        eventName: "movie",
        transId:"3123146546sdfsadfahj",
        bookTime:"11:56"
    },
    {
        id: "002",
        bookedDate: "24-02-2026",
        status: "failed",
        eventName: "singing",
        transId:"3123146546sdfsahdfsd",
        bookTime:"10:40"
    },
    {
        id: "003",
        bookedDate: "24-02-2026",
        status: "success",
        eventName: "clube party",
        transId:"3123146546sdfsah23455",
        bookTime:"16:40"
    },
    {
        id: "004",
        bookedDate: "24-02-2026",
        status: "failed",
        eventName: "footbal match",
        transId:"3123146546sdfsahd4545",
        bookTime:"9:40"
    },
    {
        id: "005",
        bookedDate: "24-02-2026",
        status: "success",
        eventName: "movie",
        transId:"31e6546sdfsahdfsd4545",
        bookTime:"14:25",
    },
    {
        id: "006",
        bookedDate: "24-02-2026",
        status: "failed",
        eventName: "local party",
        transId:"3123146546sdfs34333fd",
        bookTime:"10:10"
    },
]
export function GET(request) {
    try {
        return NextResponse.json({ success: true, data: transData })
    } catch (err) {
        console.log("something went wrong", err)
    }
}