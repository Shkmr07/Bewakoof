import Navbar from "@/components/Navbar";
import React, { useEffect, useReducer, useState } from "react";
import LogImg from "@/assets/LoginImg.jpg";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/redux/reducers/signupSlice";
import { login } from "@/redux/reducers/authSlice";
import { toast } from "sonner";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  dob: "",
  gender: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    status: authStatus,
    isAuth,
    error: authError,
  } = useSelector((state) => state.auth);
  const { status: signupStatus, error: signupError } = useSelector(
    (state) => state.signup
  );
  const navigate = useNavigate();

  const store_dispatch = useDispatch();

  useEffect(() => {
    if (authStatus === "succeeded" && isAuth) {
      toast.success("Login successful!");
      dispatch({ type: "RESET" });
      navigate("/"); // ✅ Redirect AFTER success
    }
    if (signupStatus === "succeeded") {
      toast.success("Signup successful!");
      dispatch({ type: "RESET" });
      setIsSignup(false);
    }
    if (authStatus === "failed" && authError) {
      toast.error(authError);
    }
    if (signupStatus === "failed" && signupError) {
      toast.error(signupError);
    }
  }, [authStatus, isAuth, signupStatus]);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const authentication = (e) => {
    e.preventDefault();

    const { email, password } = state;

    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required!");
      return;
    }

    store_dispatch(login({ email, password }));
  };

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
                const {
                  firstName,
                  lastName,
                  email,
                  password,
                  confirmPassword,
                  phone,
                } = state;

                if (
                  !firstName.trim() ||
                  !lastName.trim() ||
                  !email.trim() ||
                  !password.trim() ||
                  !confirmPassword.trim()
                ) {
                  toast.error("All fields are required!");
                  return;
                }

                if (password !== confirmPassword) {
                  toast.error("Passwords do not match!");
                  return;
                }

                if (phone && !/^\d{10}$/.test(phone)) {
                  toast.error("Phone number must be 10 digits!");
                  return;
                }

                store_dispatch(register(state));
              }}
            >
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={state.firstName}
                className="py-4 rounded-lg pl-5 outline-1"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={state.lastName}
                onChange={handleChange}
                className="py-4 rounded-lg pl-5 outline-1"
                required
              />
              <input
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="py-4 rounded-lg pl-5 outline-1"
                required
              />
              <input
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="py-4 rounded-lg pl-5 outline-1"
                required
              />
              <input
                type="password"
                value={state.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                placeholder="Confirm password"
                className="py-4 rounded-lg pl-5 outline-1"
                required
              />
              <input
                type="tel"
                name="phone"
                onChange={handleChange}
                value={state.phone}
                placeholder="Phone"
                className="py-4 rounded-lg pl-5 outline-1"
                required
              />
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                value={state.dob}
                className="py-4 rounded-lg pl-5 outline-1"
              />
              <select
                name="gender"
                onChange={handleChange}
                value={state.gender}
                className="py-4 rounded-lg pl-5 outline-1"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="submit"
                value={signupStatus === "loading" ? "...Loading" : "Sign Up"}
                disabled={signupStatus === "loading"}
                className="py-3 cursor-pointer font-semibold hover:text-white rounded-lg bg-slate-300 hover:bg-green-500"
              />
              <p
                className="text-center text-sm text-gray-600 cursor-pointer hover:underline"
                onClick={() => setIsSignup(false)}
              >
                Already have an account? Login
              </p>
            </form>
          ) : (
            <form className="flex flex-col gap-5" onSubmit={authentication}>
              <input
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Enter the email address"
                className="py-4 rounded-lg pl-5 outline-1"
              />
              <input
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                placeholder="Enter the password"
                className="py-4 rounded-lg pl-5 outline-1"
              />
              <input
                type="submit"
                value={authStatus === "loading" ? "Loading..." : "Submit"}
                disabled={authStatus === "loading"}
                className="py-3 cursor-pointer font-semibold hover:text-white rounded-lg bg-slate-300 hover:bg-green-500"
              />
              <p
                className="text-center text-sm text-gray-600 cursor-pointer hover:underline"
                onClick={() => setIsSignup(true)}
              >
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
