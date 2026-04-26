"use client";

import { useState } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaImage, FaTag } from "react-icons/fa";

function CreateEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
    totalSeats: "",
    category: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newEvent = {
      ...event,
      organizerId: "u1",
      availableSeats: parseInt(event.totalSeats) || 0,
      price: parseFloat(event.price) || 0,
    };

    try {
      const res = await fetch("/api/create-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      const data = await res.json();

      if (res.ok) {
        alert(" Event created successfully!");
        
        // Reset form
        setEvent({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          price: "",
          totalSeats: "",
          category: "",
          image: ""
        });
      } else {
        alert("Failed to create event: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-10 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Create New Event</h1>
            <p className="text-purple-100">Fill in the details to host your amazing event</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Event Title</label>
              <input
                type="text"
                name="title"
                value={event.title}
                onChange={handleChange}
                required
                placeholder="e.g. Tech Innovation Summit 2026"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 placeholder-gray-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
              <textarea
                name="description"
                value={event.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe your event in detail..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 placeholder-gray-500 resize-y"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <FaCalendarAlt /> Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={event.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <FaClock /> Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={event.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt /> Location
              </label>
              <input
                type="text"
                name="location"
                value={event.location}
                onChange={handleChange}
                required
                placeholder="Venue address or online link"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Price & Seats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Ticket Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={event.price}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="0 for free events"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <FaUsers /> Total Seats
                </label>
                <input
                  type="number"
                  name="totalSeats"
                  value={event.totalSeats}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Number of seats"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Category & Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <FaTag /> Category
                </label>
                <select
                  name="category"
                  value={event.category}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="">Select Category</option>
                  <option value="Tech">Technology</option>
                  <option value="Music">Music</option>
                  <option value="Business">Business</option>
                  <option value="Art">Art & Culture</option>
                  <option value="Sports">Sports</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <FaImage /> Event Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={event.image}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-2xl text-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? "Creating Event..." : "🚀 Create Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;