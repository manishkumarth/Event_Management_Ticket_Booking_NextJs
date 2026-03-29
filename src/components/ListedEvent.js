"use client"
import { useContext, useEffect, useState } from "react";
import EventCard from "./EventCard";
import { SearchContext } from "@/app/context/searchContext";

const EventsList = () => {
  
  const eventsData = [
    {
      id: 1,
      EventName: "City Marathon 2025",
      EventDes: "Join thousands of runners in the annual city marathon.",
      EventDate: "12 Feb 2025",
      EventPrice: "Free",
      EventImage:
        "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
    },
    {
      id: 2,
      EventName: "Yoga & Wellness Camp",
      EventDes: "A peaceful yoga session for mind and body balance.",
      EventDate: "20 Feb 2025",
      EventPrice: "₹499",
      EventImage:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      id: 3,
      EventName: "Stand-up Comedy Night",
      EventDes: "Laugh out loud with top stand-up comedians.",
      EventDate: "5 Mar 2025",
      EventPrice: "₹799",
      EventImage:
        "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
    },
    {
      id: 4,
      EventName: "Art Exhibition 2025",
      EventDes: "Explore modern art from emerging artists.",
      EventDate: "15 Mar 2025",
      EventPrice: "₹299",
      EventImage:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
  ];

  const { searchInput } = useContext(SearchContext);

  const [data, setData] = useState([...eventsData])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchInput.trim()) {
        setData(eventsData);
        return;
      }
      const filtedData = eventsData.filter((ele) =>
        ele.EventDes.toLowerCase().includes(searchInput.toLowerCase())
      );
      setData(filtedData);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <div className="container mx-auto px-4 py-8">
      {
        data.length === 0 ? <>no event found</> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((event) => (
            <EventCard
              key={event.id}
              EventName={event.EventName}
              EventDes={event.EventDes}
              EventDate={event.EventDate}
              EventPrice={event.EventPrice}
              EventImage={event.EventImage}
            />
          ))}
        </div>
      }
    </div>
  );
};
export default EventsList;
