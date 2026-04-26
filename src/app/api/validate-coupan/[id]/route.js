import { NextResponse } from "next/server";
import Events from "@/models/Events";
import { connectDB } from "@/lib/db";

export async function POST(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { coupan } = await req.json();

    if (!coupan) {
      return NextResponse.json(
        { message: "Coupon is required", coupan: false },
        { status: 400 }
      );
    }

    const product = await Events.findById(id);
    console.log("products",product,id)
    if (!product) {
      return NextResponse.json(
        { message: "Product not found", coupan: false },
        { status: 404 }
      );
    }
    let product_coupan=product.coupan
    if (Number(product_coupan) === Number(coupan)) {
      return NextResponse.json({ message: "success", isCoupan: true ,coupan});
    }
     if(Number(product_coupan) !== Number(coupan)) {
      return NextResponse.json({ message: "Invalid coupon", isCoupan: false,coupan});
    }
  } catch (error) {
    return NextResponse.json(
      { message: "server error", coupan: false },
      { status: 500 }
    );
  }
}
