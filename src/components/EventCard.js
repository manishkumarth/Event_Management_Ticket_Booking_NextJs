import React from "react";

const EventCard = ({ EventName, EventDes, EventDate, EventPrice, EventImage }) => {
  return (
    <div className="card w-full bg-base-100 shadow-md hover:shadow-xl transition">
      {/* Event Image */}
      {EventImage && (
        <figure>
          <img src={EventImage} alt={EventName} className="w-full h-48 object-cover" />
        </figure>
      )}

      <div className="card-body">
        {/* Event Title */}
        <h2 className="card-title text-lg font-semibold">
          {EventName}
        </h2>

        {/* Description */}
        <p className="text-sm text-base-content/70">
          {EventDes}
        </p>

        {/* Date & Price */}
        <div className="flex justify-between items-center mt-4">
          <span className="badge badge-outline">
            📅 {EventDate}
          </span>
          <span className="badge badge-outline">
            💲 {EventPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
