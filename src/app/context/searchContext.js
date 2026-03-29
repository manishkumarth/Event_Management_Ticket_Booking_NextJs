"use client"
const { createContext, useState } = require("react");

export const SearchContext=createContext();

function SearchConProvider({children}){
    const [searchInput,setSearchInput]=useState("");
    const [isSearch,setIsSearch]=useState(false);
    return(
        <SearchContext.Provider value={{searchInput,setSearchInput,isSearch,setIsSearch}}>
            {children}
        </SearchContext.Provider>
    )
}
export default SearchConProvider