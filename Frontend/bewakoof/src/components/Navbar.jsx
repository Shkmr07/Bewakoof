import logo from "@/assets/logo.svg";
import { Input } from "@/components/ui/input";
import { CiHeart } from "react-icons/ci";
import { BsBag } from "react-icons/bs";

function InputDemo() {
  return (
    <Input
      type="email"
      placeholder="Search"
      className="max-w-sm bg-slate-200"
    />
  );
}

export default function Navbar() {
  return (
    <nav className="flex items-center gap-8 px-20 py-4 border-b border-slate-300">
      <div className="w-40">
        <img className="w-full" src={logo} alt="Bewakoof Logo" />
      </div>

      <div className="flex items-center gap-2 flex-1/2">
        {["MEN", "WOMEN", "MOBILE COVER"].map((item, idx) => (
          <p key={idx} className="text-sm font-semibold">
            {item}
          </p>
        ))}
      </div>

      <InputDemo />
      <div className="w-0.5 h-4 bg-slate-300"></div>
      <div className="flex items-center gap-4">
        <p className="text-sm font-semibold">LOGIN</p>
        <CiHeart className="text-2xl" />
        <BsBag className="text-xl" />
      </div>
    </nav>
  );
}
