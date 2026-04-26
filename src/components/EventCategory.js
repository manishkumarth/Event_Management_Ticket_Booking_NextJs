import React, { useContext } from 'react';

const EventCategory = () => {
    const eventCategoryData = [
        { id: 1, btnColor: "btn-primary", category: "Sports Tournaments" },
        { id: 2, btnColor: "btn-secondary", category: "Marathons" },
        { id: 3, btnColor: "btn-accent", category: "Yoga Sessions" },
        { id: 4, btnColor: "btn-info", category: "Fitness Bootcamps" },
        { id: 5, btnColor: "btn-success", category: "Esports Events" },
        { id: 6, btnColor: "btn-warning", category: "Theatre & Drama" },
        { id: 7, btnColor: "btn-error", category: "Stand-up Comedy" },
        { id: 8, btnColor: "btn-primary", category: "Dance Shows" },
        { id: 9, btnColor: "btn-secondary", category: "Art Exhibitions" },
        { id: 10, btnColor: "btn-accent", category: "Poetry & Open Mic" },
        { id: 11, btnColor: "btn-info", category: "Film Screenings" },
    ];
    return (
        <div className="flex flex-wrap gap-3">
            {eventCategoryData.map((item) => (
                <button
                    key={item.id}
                    className={`btn btn-outline md:text-lg md:px-4 md:py-3 px-2 text-[10px]
                    ${item.btnColor}`}
                >
                    {item.category}
                </button>
            ))}
        </div>

    );
}

export default EventCategory;
