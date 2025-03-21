import logo from "../assets/logo.svg";
import { Input, InputGroup, InputLeftElement, InputRightElement, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { BsBag } from "react-icons/bs";

const InputWithKbd = () => (
  <InputGroup className="relative w-64">
    <InputLeftElement pointerEvents="none">
      <LuSearch className="text-gray-500" />
    </InputLeftElement>
    <Input
      placeholder="Search contacts"
      className="pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
    <InputRightElement>
      <Kbd>⌘K</Kbd>
    </InputRightElement>
  </InputGroup>
);

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="w-40">
        <img src={logo} alt="Bewakoof Logo" className="w-full" />
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6">
        {["MEN", "WOMEN", "MOBILE COVERS"].map((item, idx) => (
          <p className="text-sm font-medium text-gray-700 hover:text-black cursor-pointer transition" key={idx}>
            {item}
          </p>
        ))}
      </div>

      {/* Search Input */}
      <InputWithKbd />

      {/* User Actions (Login, Wishlist, Cart) */}
      <div className="flex items-center gap-4 text-gray-700">
        <p className="text-sm font-medium hover:text-black cursor-pointer">LOGIN</p>
        <CiHeart size={22} className="cursor-pointer hover:text-black" />
        <BsBag size={22} className="cursor-pointer hover:text-black" />
      </div>
    </nav>
  );
}
