"use client";

import { createContext, useState } from "react";

export const SearchContext = createContext();

function SearchConProvider({ children }) {
    const [searchEvent, setSearchEvent] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(""); // New: For category filter
    const [isSearch, setIsSearch] = useState(false);

    return (
        <SearchContext.Provider 
            value={{
                searchEvent,
                setSearchEvent,
                selectedCategory,
                setSelectedCategory,
                isSearch,
                setIsSearch
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export default SearchConProvider;