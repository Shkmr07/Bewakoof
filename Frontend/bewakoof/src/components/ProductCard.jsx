import React from "react";
import { FaStar } from "react-icons/fa6";

const ProductCard = ({ image, name, description, price, onClick }) => {
  return (
    <div className="border-1 border-slate-300 cursor-pointer" onClick={onClick}>
      <div className="relative">
        <img src={image} alt={name} />

        <div className="absolute bottom-2 left-2 bg-white flex items-center gap-1 px-2 py-1 rounded-xl">
          <FaStar className="text-yellow-500 text-xs" />
          <p className="text-xs">4.5</p>
        </div>
      </div>
      <div className="flex flex-col gap-0.5  p-2">
        <h2 className="text-sm font-semibold">{name}</h2>
        <p className="text-sm text-gray-500 truncate w-full">{description}</p>
        <div className="flex items-center gap-2">
          <p>₹{price}</p>
          <p className="line-through text-sm text-slate-400">
            ₹{`${price > 600 ? "1099" : price > 400 ? "1199" : "1499"}`}
          </p>
          <p className="text-sm font-semibold text-green-600">{`${
            price > 600 ? "44 % off" : price > 400 ? "45% off" : "68% off"
          }`}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
