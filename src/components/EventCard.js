import { useRouter } from "next/navigation";
import React from "react";

const EventCard = ({ 
  _id, 
  title, 
  description, 
  date, 
  time, 
  location, 
  price, 
  totalSeats, 
  availableSeats, 
  category, 
  image 
}) => {
  const router=useRouter()
  // Format the date nicely (optional)
  const formattedDate = date 
    ? new Date(date).toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }) 
    : 'TBD';

    const getDetailsPage=()=>{
      router.push(`/products/${_id}`)
    }
  return (
    <div onClick={getDetailsPage} className="card w-full bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Event Image */}
      {image && (
        <figure className="relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover" 
          />
          {/* Optional: Category badge on image */}
          {category && (
            <div className="absolute top-3 right-3">
              <span className="badge badge-primary badge-sm">{category}</span>
            </div>
          )}
        </figure>
      )}

      <div className="card-body p-5">
        {/* Event Title */}
        <h2 className="card-title text-xl font-bold line-clamp-2">
          {title}
        </h2>

        {/* Location */}
        {location && (
          <p className="text-sm text-base-content/70 flex items-center gap-1">
            📍 {location}
          </p>
        )}

        {/* Description */}
        <p className="text-sm text-base-content/70 line-clamp-3 mt-2">
          {description}
        </p>

        {/* Date & Time */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge badge-outline text-xs">
            📅 {formattedDate}
          </span>
          {time && (
            <span className="badge badge-outline text-xs">
              ⏰ {time}
            </span>
          )}
        </div>

        {/* Price & Seats */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-base-200">
          <div>
            <span className="text-lg font-semibold text-primary">
              ₹{price}
            </span>
            <span className="text-xs text-base-content/60 ml-1">/ ticket</span>
          </div>

          <div className="text-right">
            <span className="text-xs text-base-content/60">Seats Left</span>
            <p className="font-medium text-sm">
              {availableSeats} / {totalSeats}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;