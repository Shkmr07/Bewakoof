import React from "react";

const Sidebar = ({ onCategoryChange, onPriceChange }) => {
  return (
    <div className="hidden md:block w-64 p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Category</h3>
        <button
          className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100 cursor-pointer"
          onClick={() => onCategoryChange("Men")}
        >
          Men
        </button>
        <button
          className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100 cursor-pointer"
          onClick={() => onCategoryChange("Women")}
        >
          Women
        </button>
        <button
          className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100 cursor-pointer"
          onClick={() => onCategoryChange("Cover")}
        >
          Mobile Cover
        </button>
        <button
          className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100 cursor-pointer"
          onClick={() => onCategoryChange("all")}
        >
          All
        </button>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-md font-semibold mb-2">Price</h3>
        <button
          className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100 cursor-pointer"
          onClick={() => onPriceChange("low-to-high")}
        >
          Low to High
        </button>
        <button
          className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100 cursor-pointer"
          onClick={() => onPriceChange("high-to-low")}
        >
          High to Low
        </button>
      </div>
    </div>
  );
};

export default Sidebar;