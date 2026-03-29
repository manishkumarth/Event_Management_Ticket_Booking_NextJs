// models/Event.js   (or models/Events.js)

import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,          
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,           
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,                 
      default: 0,
    },
    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["Tech", "Music", "Business", "Art", "Sports", "Education", "Other"], 
    },
    image: {
      type: String,
      required: true,
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",            
      required: true,
    },
  },
  { 
    timestamps: true          
  }
);

const Events = mongoose.models.Events || mongoose.model("Events", eventSchema);

export default Events;