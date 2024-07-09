import React, { ChangeEvent } from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col w-full mb-6">
      <label className="block mb-1">Search</label>
      <div className="flex">
        <input
          type="text"
          className="w-full border border-gray-600 rounded-md px-3 py-2 bg-gray-700 text-white"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
