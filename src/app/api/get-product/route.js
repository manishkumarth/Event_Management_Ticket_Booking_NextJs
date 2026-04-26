import { NextResponse } from "next/server";
import Events from "@/models/Events";
import { connectDB } from "@/lib/db";
export async function GET(){
    try{
       await connectDB()
        const product=await Events.find()
        return NextResponse.json({message:"success","data":product})
    }catch(error){
        return NextResponse.json({message:"server error"})
    }

}