"use client";
import { useContext, useEffect, useState } from "react";
import EventCard from "./EventCard";
import { SearchContext } from "@/app/context/searchContext";

const EventsList = () => {
  const { searchInput } = useContext(SearchContext);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/get-product", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const result = await res.json();

        // Your API returns { message: "success", data: [...] }
        if (result.message === "success" && Array.isArray(result.data)) {
          setEvents(result.data);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Search functionality
  const filteredEvents = events.filter((event) => {
    if (!searchInput.trim()) return true;

    const searchTerm = searchInput.toLowerCase();
    return (
      event.title?.toLowerCase().includes(searchTerm) ||
      event.description?.toLowerCase().includes(searchTerm) ||
      event.location?.toLowerCase().includes(searchTerm) ||
      event.category?.toLowerCase().includes(searchTerm)
    );
  });

  // Loading State
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4 text-base-content/70">Loading events...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-base-content/70">No events found</p>
          {searchInput && (
            <p className="text-sm mt-2">
              No events match your search: <strong>"{searchInput}"</strong>
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              _id={event._id}
              title={event.title}
              description={event.description}
              date={event.date}
              time={event.time}
              location={event.location}
              price={event.price}
              totalSeats={event.totalSeats}
              availableSeats={event.availableSeats}
              category={event.category}
              image={event.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;