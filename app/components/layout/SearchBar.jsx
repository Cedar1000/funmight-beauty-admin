"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

const SearchBar = ({ order, onSearch, searchResults, getLink }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (onSearch) {
      onSearch(value); 
    }
  };

  return (
    <div className="relative w-1/2">
      {/* Search Input */}
      <div className="flex items-center border border-[#1E1E1E] rounded-xl px-7">
        <FaSearch className="text-[#1E1E1EB2]" />
        <input
          type="text"
          placeholder={`Search ${order}`}
          className="px-2 py-2 text-xl outline-none appearance-none border-0 ml-5 focus:ring-0 w-full"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Search Results Dropdown */}
      {searchResults?.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white shadow-lg border border-gray-200 rounded-lg mt-2 z-10">
          {searchResults.map((result) => (
            <li
              key={result.id}
              className="p-4 hover:bg-gray-100 cursor-pointer"
            >
              <Link href={getLink(result)} passHref>
                <div className="flex items-center gap-4">
                  {/* <img
                    src={result.image || "/placeholder.png"}
                    alt={result.name}
                    className="w-12 h-12 object-cover rounded"
                  /> */}
                  <div>
                    <p className="font-bold">{result.firstName || result.name} {result.lastName}</p>
                    {/* <p className="text-sm text-gray-500">
                      {result.description}
                    </p> */}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
