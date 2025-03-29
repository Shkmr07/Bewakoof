import React from "react";

const ProductCard = ({ image, name, description, price }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white transition-transform transform hover:scale-105 duration-300">
      <div className="relative">
        <img
          className="w-full h-auto object-cover object-center rounded-t-lg" // h-auto for original image height
          src={image}
          alt={name}
        />
        <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-700 text-sm px-2 py-1 rounded-full flex items-center">
          ⭐ 4.5
          <button className="ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.25l2.89 5.845 6.51.953-4.74 4.624 1.12 6.57L12 18.25l-5.77 3.04 1.12-6.57-4.74-4.624 6.51-.953L12 4.25z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="font-semibold text-xl mb-2 text-gray-800 truncate">
          {name}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 overflow-hidden text-ellipsis">
          {description}
        </p>
        <span className="text-lg font-bold text-gray-900">₹{price}</span>
      </div>
    </div>
  );
};

export default ProductCard;