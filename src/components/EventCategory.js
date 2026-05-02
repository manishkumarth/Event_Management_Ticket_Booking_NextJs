"use client";

import React, { useContext } from 'react';
import { SearchContext } from "@/app/context/searchContext";   // Update path if needed

const EventCategory = () => {
    const { selectedCategory, setSelectedCategory } = useContext(SearchContext);

    const eventCategoryData = [
        { id: 1, btnColor: "btn-primary", category: "Tech" },
        { id: 2, btnColor: "btn-secondary", category: "Music" },
        { id: 3, btnColor: "btn-accent", category: "Business" },
        { id: 4, btnColor: "btn-info", category: "Sports" },
        { id: 5, btnColor: "btn-success", category: "Education" },
        { id: 6, btnColor: "btn-warning", category: "Theatre & Drama" }, 
        { id: 7, btnColor: "btn-error", category: "Stand-up Comedy" },
        { id: 8, btnColor: "btn-primary", category: "Dance Shows" },
        { id: 9, btnColor: "btn-secondary", category: "Art" },
        { id: 10, btnColor: "btn-accent", category: "Poetry & Open Mic" },
        { id: 11, btnColor: "btn-info", category: "Other" },
    ];

    return (
        <div className="flex flex-wrap gap-3">
            {eventCategoryData.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setSelectedCategory(item.category)}
                    className={`btn btn-outline md:text-lg md:px-5 md:py-3 px-4 text-sm transition-all
                        ${item.btnColor} 
                        ${selectedCategory === item.category ? "btn-active" : ""}`}
                >
                    {item.category}
                </button>
            ))}

            {/* Clear Filter Button */}
            {selectedCategory && (
                <button
                    onClick={() => setSelectedCategory("")}
                    className="btn btn-ghost md:text-lg px-4 text-sm"
                >
                    Clear Filter
                </button>
            )}
        </div>
    );
};

export default EventCategory;