"use client";
import { useContext, useEffect, useState } from "react";
import EventCard from "./EventCard";
import { SearchContext } from "@/app/context/searchContext";

const EventsList = () => {
    const { searchEvent, selectedCategory } = useContext(SearchContext);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/get-product");
                const result = await res.json();

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

    // Combined Search + Category Filter
    const filteredEvents = events.filter((event) => {
        const matchesSearch = !searchEvent.trim() || 
            event.title?.toLowerCase().includes(searchEvent.toLowerCase()) ||
            event.description?.toLowerCase().includes(searchEvent.toLowerCase()) ||
            event.location?.toLowerCase().includes(searchEvent.toLowerCase()) ||
            event.category?.toLowerCase().includes(searchEvent.toLowerCase());

        const matchesCategory = !selectedCategory || 
            event.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

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

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="alert alert-error">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-base-content/70">No events found</p>
                    {(searchEvent || selectedCategory) && (
                        <p className="text-sm mt-2">
                            Try changing your {searchEvent ? "search term" : "filter"}
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