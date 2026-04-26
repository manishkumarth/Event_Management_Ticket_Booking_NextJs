import mongoose from "mongoose";

const bookedTicketSchema = new mongoose.Schema(
    {
        // Who booked
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Which event
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Events",
            required: true,
        },

        // Unique ticket id (for QR / validation)
        ticketId: {
            type: String,
            required: true,
            unique: true,
        },

        // Order / Payment reference
        orderId: {
            type: String,
            required: true,
        },

        paymentId: {
            type: String, // from Cashfree
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },

        paymentMethod: {
            type: String, // UPI / Card etc
        },

        // 🔹 Booking details
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        //  Ticket status
        status: {
            type: String,
            enum: ["booked", "used", "cancelled"],
            default: "booked",
        },

        //  Snapshot
        eventTitle: {
            type: String,
            required: true,
        },

        eventDate: {
            type: String,
            required: true,
        },

        eventTime: {
            type: String,
            required: true,
        },

        eventLocation: {
            type: String,
            required: true,
        },

        priceAtBooking: {
            type: Number,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

const BookedTicket =
    mongoose.models.BookedTicket ||
    mongoose.model("BookedTicket", bookedTicketSchema);

export default BookedTicket;