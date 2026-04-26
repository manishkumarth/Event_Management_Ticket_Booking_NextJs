// app/api/events/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
<<<<<<< HEAD
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
=======
import { authOption } from "@/app/api/auth/[...nextauth]/options";   // ← Change this path to your actual auth route
import { connectDB } from "@/lib/db";
import Events from "@/models/Events";

export async function POST(req) {
    try {
        // Step 1: Check if user is logged in
        const session = await getServerSession(authOption);

        if (!session || !session.user) {
>>>>>>> cdcbcdc6bb44fdf9f27407369c3a455c252af747
            return NextResponse.json(
                { message: "Unauthorized. Please login first." },
                { status: 401 }
            );
        }
<<<<<<< HEAD
        
        const userId = token.id;  
=======

        // Step 2: Get user ID from session
        const userId = session.user.id;        // Best way (if you added id in session)
        // Alternative: const userId = session.user.email;  // if you don't have id

>>>>>>> cdcbcdc6bb44fdf9f27407369c3a455c252af747
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
<<<<<<< HEAD
            coupan,
=======
>>>>>>> cdcbcdc6bb44fdf9f27407369c3a455c252af747
        } = body;

        // Basic validation
        if (!title || !description || !date || !time || !location || !category || !image) {
            return NextResponse.json(
                { message: "Please provide all required fields" },
                { status: 400 }
            );
        }
<<<<<<< HEAD
       
=======

>>>>>>> cdcbcdc6bb44fdf9f27407369c3a455c252af747
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
<<<<<<< HEAD
            organizerId: userId,
            coupan           // ← This is how you get logged-in user ID
=======
            organizerId: userId,           // ← This is how you get logged-in user ID
>>>>>>> cdcbcdc6bb44fdf9f27407369c3a455c252af747
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