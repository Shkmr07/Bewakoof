import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import LogImg from "@/assets/LoginImg.jpg";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <>
      <Navbar />
      <main className="lg:mt-10 flex flex-col min-w-full lg:flex-row">
        <div className="lg:w-2xl">
          <img className="w-full" src={LogImg} alt="Login Image" />
        </div>

        <div className="flex flex-col lg:mt-20 px-5 py-5 lg:py-0 lg:px-20 gap-7 ">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-wide">
              {isSignup ? "Create an Account" : "Login / Signup"}
            </h2>
            <p className="text-slate-400">
              {isSignup
                ? "Join us now and explore amazing features."
                : "Join us now to be a part of Bewakoof® family."}
            </p>
          </div>

          {isSignup ? (
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                setIsSignup(false);
              }}
            >
              <input
                type="text"
                placeholder="First Name"
                className="py-4 rounded-lg pl-5 outline-1"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="py-4 rounded-lg pl-5 outline-1"
                required
              />
              <input
                type="email"
                placeholder="Enter your email address"
                className="py-4 rounded-lg pl-5 outline-1"
                required
              />
              <input
                type="password"
                placeholder="Enter password"
                className="py-4 rounded-lg pl-5 outline-1"
                required
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="py-4 rounded-lg pl-5 outline-1"
                required
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                className="py-4 rounded-lg pl-5 outline-1"
              />
              <input
                type="date"
                className="py-4 rounded-lg pl-5 outline-1"
              />
              <select className="py-4 rounded-lg pl-5 outline-1">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="submit"
                value="Sign Up"
                className="py-3 cursor-pointer font-semibold hover:text-white rounded-lg bg-slate-300 hover:bg-green-500"
              />
              <p className="text-center text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => setIsSignup(false)}>
                Already have an account? Login
              </p>
            </form>
          ) : (
            <form className="flex flex-col gap-5">
              <input
                type="email"
                placeholder="Enter the email address"
                className="py-4 rounded-lg pl-5 outline-1"
              />
              <input
                type="password"
                placeholder="Enter the password"
                className="py-4 rounded-lg pl-5 outline-1"
              />
              <input
                type="submit"
                className="py-3 cursor-pointer font-semibold hover:text-white rounded-lg bg-slate-300 hover:bg-green-500"
              />
              <p className="text-center text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => setIsSignup(true)}>
                Don't have an account? Create one
              </p>
            </form>
          )}

          <div className="flex items-center gap-2">
            <div className="w-[50%] h-0.5 bg-slate-300"></div>
            <p className="text-sm text-slate-700 font-semibold">OR</p>
            <div className="w-[50%] h-0.5 bg-slate-300"></div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex hover:scale-105 cursor-pointer gap-2 items-center w-[50%] justify-center py-2.5 rounded-lg bg-slate-100">
              <FaGoogle className="text-xl text-red-500" />
              <p className="text-slate-700">Google</p>
            </div>
            <div className="flex cursor-pointer hover:scale-105 gap-2 items-center w-[50%] justify-center py-2.5 rounded-lg bg-slate-100">
              <FaFacebook className="text-blue-600 text-xl" />
              <p className="text-slate-700">Facebook</p>
            </div>
          </div>

          <p className="mt-4 text-gray-500 text-sm">
            By creating an account or logging in, you agree with Bewakoof's{" "}
            <Link
              to="/terms"
              className="text-blue-600 hover:underline transition duration-300 hover:text-blue-800 font-semibold"
            >
              T&C
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-blue-600 hover:underline transition duration-300 hover:text-blue-800 font-semibold"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
