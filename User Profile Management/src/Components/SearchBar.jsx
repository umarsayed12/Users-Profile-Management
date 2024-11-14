import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center">
        <svg
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search profiles..."
          className="ml-2 flex-1 py-2 px-3 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;
