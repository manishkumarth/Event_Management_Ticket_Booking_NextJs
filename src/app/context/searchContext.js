"use client"
const { createContext, useState } = require("react");

export const SearchContext=createContext();

function SearchConProvider({children}){
    const [searchEvent, setSearchEvent]=useState("");
    const [isSearch,setIsSearch]=useState(false);
    return(
        <SearchContext.Provider value={{searchEvent, setSearchEvent,isSearch,setIsSearch}}>
            {children}
        </SearchContext.Provider>
    )
}
export default SearchConProvider