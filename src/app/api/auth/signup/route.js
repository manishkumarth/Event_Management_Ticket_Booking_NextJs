import User from "@/models/User"
import {connectDB} from "@/lib/db"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req) {
  const dbres= await connectDB()
  console.log(dbres)
  try {
 
    const { name, email, password } = await req.json()

    //  validation
    if (!name && !email && !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    //  check existing user
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      )
    }

    //  hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    //  create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      authProvider: "local",
      profilePic:"",
      githubId:"",
      googleId:""
    })

    return NextResponse.json(
      { message: "Register success", success: true },
      { status: 201 }
    )

  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}