import React from 'react';

export default function ImageCard({ image, name }) {
  return (
    <div className="relative w-full flex flex-col items-center"> {/* Make the container full width of it's parent */}
      <div>
        <img src={image} alt={name} className="w-full h-auto object-cover" /> {/* Responsive image */}
      </div>
      <p className=" text-xs md:text-sm font-semibold  bg-white p-1 rounded-md">{name}</p>
    </div>
  );
}