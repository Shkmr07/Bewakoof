import logo from "@/assets/logo.svg";
import bewakoof from "@/assets/bewakoofMB.jpeg";
import React, { useState, useEffect } from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
import { clearUserProfile, fetchUserProfile } from "@/redux/reducers/userSlice";
import { Loader } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducers/authSlice";
import { toast } from "sonner";

export default function Navbar() {
  const [modal, setModal] = useState(false);
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.data);

  function handlelogout() {
    setLoading(true);
    dispatch(logout())
      .unwrap()
      .then(() =>{
        dispatch(clearUserProfile())
        toast.success("Logout Successful")
      })
      .catch((error) => {
        // Handle logout error here (e.g., display an error toast)
        toast.error("Logout Failed");
        console.error("Logout error:", error);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (isAuth && !user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuth, user]);

  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [modal]);

  return (
    <nav className="sticky top-0 z-50 bg-white w-full">
      {/* Desktop View */}
      <div className="hidden lg:flex lg:justify-center lg:items-center lg:gap-35 shadow-lg  lg:py-3">
        <div className="flex items-center gap-2">
          <div
            className="w-[160px] flex-shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img className="w-full" src={logo} alt="Bewakoof Logo" />
          </div>
          {[
            {
              title: "MEN",
              items: [
                "All T-Shirts",
                "Oversized T-shirts",
                "Classic Fit T-shirts",
                "Polo T-Shirts",
                "Joggers",
                "Cargo Pants",
                "Hoodies",
                "Jeans",
              ],
            },
            {
              title: "WOMEN",
              items: [
                "Crop Tops",
                "Oversized T-shirts",
                "Printed T-Shirts",
                "Plain T-Shirts",
                "Leggings",
                "Joggers",
                "Hoodies",
                "Jeans",
              ],
            },
            {
              title: "MOBILE COVERS",
              items: [
                "iPhone Covers",
                "Samsung Covers",
                "OnePlus Covers",
                "Printed Covers",
                "Transparent Covers",
                "Customized Covers",
                "Shockproof Covers",
                "Wallet Covers",
              ],
            },
          ].map((sections, idx) => (
            <NavigationMenu key={idx}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cursor-pointer">
                    {sections.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 sm:w-[450px] sm:grid-cols-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] lg:grid-cols-3 xl:w-[700px] xl:grid-cols-4 bg-white shadow-lg rounded-lg">
                      {sections.items.map((item, idx) => (
                        <a
                          className="text-sm font-semibold text-gray-700 hover:text-blue-500 transition-all duration-200 cursor-pointer"
                          key={idx}
                          href="#"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ))}
        </div>

        <div className="flex items-center">
          <Input
            type="email"
            placeholder="Search"
            className=" mr-3 w-50 bg-slate-200"
          />

          <div className="w-0.5 h-4 bg-slate-300"></div>
          <div className="flex items-center gap-2.5 cursor-pointer ">
            {isAuth ? (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <CiUser className="text-xl" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="bg-white shadow rounded italic p-2 w-40">
                        {isAuth && (
                          <div className="block px-2 py-1 text-sm hover:bg-gray-100 rounded">
                            <span>Hi, {user?.firstName.split(" ")[0]}</span>
                          </div>
                        )}
                        <NavLink
                          to="/profile"
                          className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                        >
                          My Account
                        </NavLink>
                        <NavLink
                          to="/dashboard"
                          className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                        >
                          My Wishlist
                        </NavLink>
                        <NavLink
                          to="/logout"
                          className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                        >
                          My Orders
                        </NavLink>
                        <NavLink
                          to="/logout"
                          className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                        >
                          My Wallet
                        </NavLink>
                        {isAuth && user?.role === "Admin" && <NavLink
                          to="/add-product"
                          className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                        >
                          Add Product
                        </NavLink>}
                        <NavLink
                          to="/"
                          className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                          onClick={handlelogout}
                        >
                          {loading ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            "Logout"
                          )}
                        </NavLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <NavLink
                to="/login"
                className="text-sm font-semibold tracking-wide ml-2"
              >
                LOGIN
              </NavLink>
            )}

            <CiHeart className="text-2xl" />
            <BsBag className="text-xl" />
          </div>
        </div>
      </div>

      {/* Sidebar for Mobile View */}
      <div
        className={`fixed top-0 left-0 h-full w-[90%] bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
          modal ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <div className="p-5 flex flex-col gap-4 overflow-y-auto h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-slate-300 rounded-full p-2">
                <CiUser className="text-3xl" />
              </div>
              <div>
                <p className="font-semibold text-lg">Hey There!</p>
                <p className="text-blue-900 tracking-wide">Login / Signup</p>
              </div>
            </div>
            <MdClose
              className="text-xl cursor-pointer"
              onClick={() => setModal(false)}
            />
          </div>

          {/* Sidebar Sections */}
          {[
            {
              title: "SHOP IN",
              items: [
                { svg: <FcBusinessman />, name: "Men" },
                { svg: <FcBusinesswoman />, name: "Women" },
                { svg: <GiSonicShoes />, name: "Accessories" },
                { svg: <IoSnow />, name: "Winter" },
              ],
            },
            {
              title: "MY PROFILE",
              items: [
                { svg: <FaUserAlt />, name: "My Account" },
                { svg: <FaTruck />, name: "Delivery" },
                { svg: <FaHeart />, name: "Wishlist" },
                { svg: <IoWallet />, name: "Wallet" },
              ],
            },
            {
              title: "CONTACT US",
              items: [
                { name: "Help & Support" },
                { name: "Feedback & Suggestions" },
              ],
            },
            {
              title: "ABOUT US",
              items: [{ name: "Our Story" }, { name: "Fanbook" }],
            },
          ].map((section, idx) => (
            <div key={idx}>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-400 tracking-wider">
                  {section.title}
                </span>
                <div className="flex-1 border-t border-gray-100"></div>
              </div>
              <div className="mt-5 flex flex-col gap-5">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    {item.svg && (
                      <div className="bg-slate-300 p-2 rounded-full">
                        {React.cloneElement(item.svg, { className: "text-xl" })}
                      </div>
                    )}
                    <p className="tracking-wider text-gray-500">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden bg-[#ffc801] flex items-center justify-between px-3">
        <div className="flex items-center gap-3">
          <HiMenuAlt1
            className="text-2xl md:text-3xl cursor-pointer"
            onClick={() => setModal(true)}
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
