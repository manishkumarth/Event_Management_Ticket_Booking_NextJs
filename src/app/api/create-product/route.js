// app/api/events/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOption } from "@/app/api/auth/[...nextauth]/options";  
import { connectDB } from "@/lib/db";
import Events from "@/models/Events";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
    try {
        
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });
        
        if (!token || !token.id) {
            return NextResponse.json(
                { message: "Unauthorized. Please login first." },
                { status: 401 }
            );
        }
        
        const userId = token.id;  
        // Step 3: Connect to Database
        await connectDB();

        // Step 4: Get data from request body
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

        // Basic validation
        if (!title || !description || !date || !time || !location || !category || !image) {
            return NextResponse.json(
                { message: "Please provide all required fields" },
                { status: 400 }
            );
        }
       
        // Step 5: Create new event with organizerId
        const newEvent = new Events({
            title,
            description,
            date,
            time,
            location,
            price: Number(price) || 0,
            totalSeats: Number(totalSeats) || 0,
            availableSeats: Number(totalSeats) || 0,
            category,
            image,
            organizerId: userId,
            coupan           // ← This is how you get logged-in user ID
        });

        const savedEvent = await newEvent.save();

        return NextResponse.json(
            {
                message: "Event created successfully",
                event: savedEvent,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Create Event Error:", error);

        // Handle duplicate title error (if unique: true in schema)
        if (error.code === 11000) {
            return NextResponse.json(
                { message: "An event with this title already exists" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}