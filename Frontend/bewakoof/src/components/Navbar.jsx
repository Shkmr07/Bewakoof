import logo from "@/assets/logo.svg";
import bewakoof from "@/assets/bewakoofMB.jpeg";
import { Input } from "@/components/ui/input";
import { CiHeart, CiSearch } from "react-icons/ci";
import { BsBag } from "react-icons/bs";
import { HiMenuAlt1 } from "react-icons/hi";
import { LuShoppingBag } from "react-icons/lu";
import { useState } from "react";

export default function Navbar() {

    const [modal,setModal] = useState(false)

  return (
    <nav className="relative">
      {/* For Desktop View */}

      <div className="hidden lg:flex lg:items-center lg:gap-8 lg:px-32 lg:py-4 border-b border-slate-300">
        <div className="w-40">
          <img className="w-full" src={logo} alt="Bewakoof Logo" />
        </div>

        <ul className="flex items-center gap-4 flex-1/2">
          {["MEN", "WOMEN", "MOBILE COVER"].map((item, idx) => (
            <li key={idx} className="text-sm font-semibold tracking-wide">
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
        <div className="flex items-center gap-4">
          <p className="text-sm font-semibold tracking-wide">LOGIN</p>
          <CiHeart className="text-2xl" />
          <BsBag className="text-xl" />
        </div>
      </div>

      {/* For Mobile View */}

      <div className="lg:hidden bg-[#ffc801] flex items-center justify-between px-3">
        <div className="flex items-center gap-3">
          <HiMenuAlt1 className="text-2xl md:text-3xl" />
          <div className="w-12 md:w-15">
            <img className="w-full" src={bewakoof} alt="Bewakoof" />
          </div>
        </div>

        

        <div className="flex items-center gap-2">
          <CiSearch className="text-2xl md:text-3xl" />
          <CiHeart className="text-2xl md:text-3xl" />
          <LuShoppingBag className="text-xl md:text-2xl" />
        </div>
      </div>
    </nav>
  );
}
