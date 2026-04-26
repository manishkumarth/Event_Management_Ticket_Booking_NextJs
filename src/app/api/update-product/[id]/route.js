import { NextResponse } from "next/server";
import Events from "@/models/Events";
import { connectDB } from "@/lib/db";

export async function PUT(req, { params }) {
    try {
        await connectDB();
        const newData = await req.json();
        const { id } =await params;

        console.log("id and data", id, newData);

        if (!id) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        const product = await Events.findByIdAndUpdate(id, newData, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return NextResponse.json(
                { message: "product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "update successfully", product },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json(
            { message: "server error", error: error.message },
            { status: 500 }
        );
    }
}
