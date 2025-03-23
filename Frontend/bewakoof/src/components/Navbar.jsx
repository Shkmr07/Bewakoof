import logo from "@/assets/logo.svg";
import bewakoof from "@/assets/bewakoofMB.jpeg";
import React from "react";
import { Input } from "@/components/ui/input";
import { CiHeart, CiUser } from "react-icons/ci";
import { BsBag } from "react-icons/bs";
import { HiMenuAlt1 } from "react-icons/hi";
import { LuShoppingBag } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart, FaUserAlt, FaTruck, FaHeart } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { GiSonicShoes } from "react-icons/gi";
import { IoSnow, IoWallet } from "react-icons/io5";
import { useState } from "react";

export default function Navbar() {
  const [modal, setModal] = useState(false);

  return (
    <nav className="relative">
      {/* For Desktop View */}

      <div className="hidden lg:flex lg:items-center lg:gap-8 lg:px-32 lg:py-3 border-b border-slate-300">
        <div className="w-40 cursor-pointer">
          <img className="w-full" src={logo} alt="Bewakoof Logo" />
        </div>

        <ul className="flex items-center gap-4 flex-1/2">
          {["MEN", "WOMEN", "MOBILE COVER"].map((item, idx) => (
            <li
              key={idx}
              className="text-sm font-semibold cursor-pointer tracking-wide"
            >
              {item}
            </li>
          ))}
        </ul>

        <Input
          type="email"
          placeholder="Search"
          className="w-2xs bg-slate-200"
        />

        <div className="w-0.5 h-4 bg-slate-300"></div>
        <div className="flex items-center gap-4 cursor-pointer">
          <p className="text-sm font-semibold tracking-wide">LOGIN</p>
          <CiHeart className="text-2xl" />
          <BsBag className="text-xl" />
        </div>
      </div>

      {/* For Mobile View */}

      {modal && (
        <div
          className={`absolute top-0 left-0 w-[90%] rounded-r-2xl p-5 flex flex-col gap-4 min-h-screen bg-white shadow-lg transition-transform duration-500 ${
            modal ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* User Profile Section */}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-slate-300 rounded-full p-1">
                <CiUser className="text-3xl" />
              </div>
              <div>
                <p className="font-semibold text-lg ">Hey There!</p>
                <p className="text-blue-900 tracking-wide">Login / Signup</p>
              </div>
            </div>
            <MdClose
              className="text-xl"
              onClick={() => setModal((prev) => !prev)}
            />
          </div>

          {/* Shopping Section */}

          <div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-400 tracking-wider">
                SHOP IN
              </span>
              <div className="flex-1 border-t border-gray-100"></div>
            </div>

            <div className="mt-5 flex flex-col gap-5">
              {[
                { svg: <FcBusinessman />, name: "Men" },
                { svg: <FcBusinesswoman />, name: "Women" },
                { svg: <GiSonicShoes />, name: "Accessories" },
                { svg: <IoSnow />, name: "Winter" },
              ].map((item, idx) => (
                <div className="flex items-center space-x-4">
                  <div className="bg-slate-300 p-1 rounded-full">
                    {React.cloneElement(item.svg, { className: "text-4xl" })}
                  </div>
                  <p className="tracking-wider text-gray-500">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* My Profile */}

          <div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-400 tracking-wider">
                MY PROFILE
              </span>
              <div className="flex-1 border-t border-gray-100"></div>
            </div>

            <div className="flex gap-2 flex-wrap mt-4">
              {[
                { svg: <FaUserAlt />, name: "My Account" },
                { svg: <FaTruck />, name: "Delivery" },
                { svg: <FaHeart />, name: "Wishlist" },
                { svg: <IoWallet />, name: "Wallet" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="w-20 h-20 border-2 rounded-lg flex justify-center items-center">
                    {React.cloneElement(item.svg, {
                      className: "text-2xl text-[#ffc801]",
                    })}
                  </div>

                  <p className="text-sm text-center tracking-wider font-semibold text-slate-600">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Us */}

          <div>
            <div className="mt-1 flex items-center space-x-4">
              <span className="text-sm text-slate-400 tracking-wider">
                CONTACT US
              </span>
              <div className="flex-1 border-t border-gray-100"></div>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-600">
              Help & Support
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              Feedback & Suggestions
            </p>
          </div>

          {/* About Us */}

          <div>
            <div className="mt-1 flex items-center space-x-4">
              <span className="text-sm text-slate-400 tracking-wider">
                ABOUT US
              </span>
              <div className="flex-1 border-t border-gray-100"></div>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-600">
              Our Story
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-600">Fanbook</p>
          </div>
        </div>
      )}

      <div className="lg:hidden bg-[#ffc801] flex items-center justify-between px-3">
        <div className="flex items-center gap-3">
          <HiMenuAlt1
            className="text-2xl md:text-3xl"
            onClick={() => setModal((prev) => !prev)}
          />
          <div className="w-13 md:w-15">
            <img className="w-full" src={bewakoof} alt="Bewakoof" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <IoSearchOutline className="text-2xl md:text-3xl" />
          <FaRegHeart className="text-xl md:text-2xl" />
          <LuShoppingBag className="text-xl md:text-2xl" />
        </div>
      </div>
    </nav>
  );
}
