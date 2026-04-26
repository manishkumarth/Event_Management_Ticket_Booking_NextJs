// app/api/get-product/[id]/route.js
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import Events from "@/models/Events";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;       
    console.log("Fetching product with ID:", id);

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const singleProduct = await Events.findById(id);

    if (!singleProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "success",
      data: singleProduct,
<<<<<<< HEAD
      
=======
>>>>>>> cdcbcdc6bb44fdf9f27407369c3a455c252af747
    });

  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
<<<<<<< HEAD
      { message: "Server error"},
=======
      { message: "Server error", error: error.message },
>>>>>>> cdcbcdc6bb44fdf9f27407369c3a455c252af747
      { status: 500 }
    );
  }
}