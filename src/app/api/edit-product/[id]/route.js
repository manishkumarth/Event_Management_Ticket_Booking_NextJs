import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/db";
import Events from "@/models/Events";

export async function PUT(req, { params }) {
    try {
        //  Check Auth
        const token = await getToken({ req });
       
        if (!token || !token.id) {
            return NextResponse.json(
                { message: "Unauthorized. Please login first." },
                { status: 401 }
            );
        }
        

        const userId = token.id;

        //  Get Event ID from params
        const { id } = await params;

        //  Connect DB
        await connectDB();

        //  Find Event
        const event = await Events.findById(id);

        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        //  Check Ownership (VERY IMPORTANT )
        if (event.organizerId.toString() !== userId) {
            return NextResponse.json(
                { message: "You are not allowed to update this event" },
                { status: 403 }
            );
        }

        //  Get Body Data
        const body = await req.json();

        const {
            title,
            description,
            date,
            time,
            location,
            price,
            totalSeats,
            category,
            image,
            coupan,
        } = body;

        //  Update Fields
        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.time = time || event.time;
        event.location = location || event.location;
        event.price = price !== undefined ? Number(price) : event.price;
        event.totalSeats = totalSeats !== undefined ? Number(totalSeats) : event.totalSeats;
        event.category = category || event.category;
        event.image = image || event.image;
        event.coupan = coupan || event.coupan;

        // Optional: adjust availableSeats if totalSeats changes
        if (totalSeats !== undefined) {
            const diff = Number(totalSeats) - event.totalSeats;
            event.availableSeats += diff;
        }

        //  Save Updated Event
        const updatedEvent = await event.save();

        return NextResponse.json(
            {
                message: "Event updated successfully",
                event: updatedEvent,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Update Event Error:", error);

        return NextResponse.json(
            { message: "Server error", },
            { status: 500 }
        );
    }
}