"use client"; 
import { useState } from "react";
import { FaSearch } from "react-icons/fa"; 

const SearchBar = ({ order }) => {
  const [search, setSearch] = useState("");

  
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };



  return (
    <div className="flex items-center border border-[#1E1E1E] rounded-xl px-7 w-1/2">
      <FaSearch className="text-[#1E1E1EB2]" />
      <input
        type="text"
        placeholder={`Search ${order}`}
        className="px-2 py-2 text-xl outline-none appearance-none border-0 ml-5 focus:ring-0 w-full"
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
