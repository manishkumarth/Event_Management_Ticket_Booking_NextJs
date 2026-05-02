"use client";

import { act, useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaImage, FaTag } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function CreateEditEvent({ action, id }) {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
    totalSeats: "",
    category: "",
    image: "",
    coupan: ""
  });
  console.log(id)
  const router=useRouter()
  const [coupan, setCoupan] = useState({
    "arr": [10, 12, 15, 20, 25, 30, 36],
    "ans": ""
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const newEvent = {
      ...event,
      availableSeats: parseInt(event.totalSeats) || 0,
      price: parseFloat(event.price) || 0,
    };
    const img = newEvent.image.toLowerCase();

    if (!newEvent.title) {
      toast.warn("Please Enter Title")
      return
    } else if (!newEvent.description) {
      toast.warn("Please Enter Description")
      return
    } else if (!newEvent.date) {
      toast.warn("Please Enter Date")
      return
    } else if (!newEvent.time) {
      toast.warn("Please Enter Time")
      return
    } else if (!newEvent.location) {
      toast.warn("Please Enter Location")
      return
    } else if (!newEvent.price) {
      toast.warn("Please Enter Price")
      return
    } else if (!newEvent.totalSeats) {
      toast.warn("Please Enter Totalseat")
      return
    }
    else if (!newEvent.category) {
      toast.warn("Please Enter Category")
      return
    } else if (!newEvent.image) {
      toast.warn("Please Enter image")
      return
    }


    try {
      console.log("evetnsdata", newEvent)
      setLoading(true);
      let res = ""
      if (action === "create") {
        res = await fetch("/api/create-product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent),
        });
      } else {
        res = await fetch(`/api/edit-product/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent),
        });
        const data = await res.json();
        if (res.ok) {
          if (action === "create") {
            // alert(" Event created successfully!");
            toast.success("Event created successfully!")
          } else if (action === "edit") {
            // alert(" Event update successfully!");
            toast.success("Event update successfully!")
          }
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
            image: "",
            coupan: ""
          });

          router.push("/admin/dashboard/all-events")
        } else {
          if (action === "create") {
            alert("Failed to create event");
          } else if (action === "update") {
            alert("Failed to Event update");
          }
        }
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getEventData = async () => {
      const response = await fetch(`/api/get-product/${id}`)
      const data = await response.json()
      console.log("data", data)
      setEvent(data.data)
      console.log("datas", event)
    }
    if (action === "edit") {
      getEventData()
    }
  }, [action])
  return (
    <div className="min-h-screen bg-gray-950 py-1 px-4">
      <div className="md:w-full mx-auto">
        <div className="bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800">

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-5 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">{action === "create" && "Create New Event"} {action === "update" && "Edit Event"}</h1>
            <p className="text-purple-100">{action === "create" && "Fill in the details to host your amazing event"} {action === "update" && "Fill in the details to update your amazing event"}</p>
          </div>

          <form onSubmit={handleSubmit} className="pt-2 ps-5 pe-5 p space-y-0 w-full">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-indigo-500 mb-2">Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={event.title}
                  onChange={handleChange}

                  placeholder="e.g. Tech Innovation Summit 2026"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-2 text-white focus:outline-none focus:border-purple-500 placeholder-gray-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-indigo-500 mb-2">Description</label>
                <textarea
                  name="description"
                  value={event.description}
                  onChange={handleChange}

                  rows={5}
                  placeholder="Describe your event in detail..."
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-2 text-white focus:outline-none focus:border-purple-500 placeholder-gray-500 resize-y"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-indigo-500 mb-2 flex items-center gap-2">
                  <FaCalendarAlt /> Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={event.date}
                  onChange={handleChange}

                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-500 mb-2 flex items-center gap-2">
                  <FaClock /> Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={event.time}
                  onChange={handleChange}

                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-indigo-500 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt /> Location
              </label>
              <input
                type="text"
                name="location"
                value={event.location}
                onChange={handleChange}

                placeholder="Venue address or online link"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Price & Seats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-indigo-500 mb-2">Ticket Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={event.price}
                  onChange={handleChange}

                  min="0"
                  placeholder="0 for free events"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-500 mb-2 flex items-center gap-2">
                  <FaUsers /> Total Seats
                </label>
                <input
                  type="number"
                  name="totalSeats"
                  value={event.totalSeats}
                  onChange={handleChange}

                  min="1"
                  placeholder="Number of seats"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Category & Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-indigo-500 mb-2 flex items-center gap-2">
                  <FaTag /> Category
                </label>
                <select
                  name="category"
                  value={event.category}
                  onChange={handleChange}

                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="">Select Category</option>
                  <option value="Tech">Technology</option>
                  <option value="Music">Music</option>
                  <option value="Theatre & Drama">Theatre & Drama</option>
                  <option value="Stand-up Comedy">Stand-up Comedy</option>
                  <option value="Dance Shows">Dance Shows</option>
                  <option value="Poetry & Open Mic">Poetry & Open Mic</option>
                  <option value="Business">Business</option>
                  <option value="Art">Art & Culture</option>
                  <option value="Sports">Sports</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-500 mb-2 flex items-center gap-2">
                  <FaImage /> Event Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={event.image}
                  onChange={handleChange}

                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-500 mb-2 flex gap-2 items-center">
                  <BiSolidOffer /> Coupon
                </label>

                <select
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-2 text-white focus:outline-none focus:border-purple-500"
                  value={coupan.ans}
                  onChange={(e) => (
                    setEvent({ ...event, coupan: e.target.value },
                      setCoupan({ ...coupan, ans: e.target.value })
                    ))
                  }
                >
                  <option value="">Select Coupon</option>
                  {coupan.arr.map((elem, idx) => (
                    <option key={idx} value={elem}>
                      Offer {elem}%
                    </option>
                  ))}
                </select>
              </div>
              {/* Submit Button */}
              {
                action === "create" ?
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 rounded-2xl text-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? "Creating Event..." : "🚀 Create Event"}
                  </button>
                  :
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 rounded-2xl text-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? "Updating Event..." : "🚀 Update Event"}
                  </button>
              }
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEditEvent;
