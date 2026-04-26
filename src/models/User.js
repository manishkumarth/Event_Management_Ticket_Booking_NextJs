// const mongoose = require("mongoose");
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      sparse: true, // important for optional email
    },

    password: {
      type: String, // only for email users
    },

    googleId: {
      type: String,
      sparse:true
    },
    githubId:{
      type:String,
      sparse:true
    },

    profilePic: {
      type: String,
    },
<<<<<<< HEAD
   role:{
    type:String,
    enum:["user","admin"],
    required:true,
   },
=======

>>>>>>> cdcbcdc6bb44fdf9f27407369c3a455c252af747
    authProvider: {
      type: String,
      enum: ["local", "google", "email","github"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User