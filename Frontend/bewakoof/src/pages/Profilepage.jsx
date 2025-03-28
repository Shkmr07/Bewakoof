import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { logout } from "@/redux/reducers/authSlice";
import React, { useState, useEffect, useReducer } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import {
  FaHome,
  FaBox,
  FaCreditCard,
  FaWallet,
  FaMapMarkerAlt,
  FaUser,
  FaSignOutAlt,
  FaShippingFast,
  FaStar,
  FaHeadset,
  FaQuestionCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearUserProfile,
  fetchUserProfile,
  updateProfile,
} from "@/redux/reducers/userSlice";

const SidebarItem = ({ icon, label, active, isLogout, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
        active
          ? "bg-blue-500 text-white font-medium"
          : "text-gray-600 hover:bg-gray-100 hover:text-blue-500"
      } ${isLogout ? "text-red-500 hover:bg-red-100" : ""}`}
    >
      <span className="text-lg mr-3">{icon}</span>
      <span className="text-sm">{label}</span>
    </li>
  );
};

const initialState = {
  firstName: { value: "" },
  lastName: { value: "" },
  email: { value: "" },
  phone: { value: "" },
  dob: { value: "" },
  gender: { value: "" },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: {
          value: action.value,
        },
      };
    case "SET_USER_DATA":
      let formattedDob = "";
      if (action.payload.dob) {
        formattedDob = action.payload.dob.split("T")[0];
      }
      return {
        firstName: { value: action.payload.firstName || "" },
        lastName: { value: action.payload.lastName || "" },
        email: { value: action.payload.email || "" },
        phone: { value: action.payload.phone || "" },
        dob: { value: formattedDob || "" },
        gender: { value: action.payload.gender || "" },
      };
    default:
      return state;
  }
};

export default function Profilepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const user = useSelector((state) => state.user.data);
  const [isEditing, setIsEditing] = useState(false);
  const [state, userDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchUserProfile())
      .unwrap()
      .then(() => {
        // Initialize the reducer state with user data
        userDispatch({ type: "SET_USER_DATA", payload: user });
      })
      .catch((err) => {
        toast.error(err.message || "Error to fetch detail");
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleEditProfileClick = () => {
    setIsEditing(true);
    if (user) {
      userDispatch({ type: "SET_USER_DATA", payload: user });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    const profileData = {
      firstName: state.firstName.value,
      lastName: state.lastName.value,
      phone: state.phone.value,
      dob: state.dob.value,
      gender: state.gender.value,
    };
    console.log(profileData);
    dispatch(updateProfile(profileData))
      .unwrap()
      .then(() => {
        toast.success("Profile Updated!");
        setIsEditing(false);
      })
      .catch((err) => toast.error("Error in updating profile"))
      .finally(() => setUpdateLoading(false));
  };

  return (
    <>
      <Navbar />
      {/* Wrapper with flex to push footer down */}
      <div className="flex flex-col min-h-screen">
        {/* Main content with flex-grow to fill available space */}
        <main className="flex-grow bg-gray-100">
          <div className="container mx-auto p-4 mt-2">
            <div className="flex flex-col lg:flex-row">
              {/* Sidebar */}
              <div className="hidden lg:inline-block w-full lg:w-1/4 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <ul className="space-y-3">
                  <SidebarItem icon={<FaHome />} label="Overview" active />
                  <SidebarItem icon={<FaBox />} label="My Orders" />
                  <SidebarItem icon={<FaCreditCard />} label="My Payments" />
                  <SidebarItem icon={<FaWallet />} label="My Wallet" />
                  <SidebarItem icon={<FaMapMarkerAlt />} label="My Addresses" />
                  <SidebarItem icon={<FaUser />} label="My Profile" />
                  <SidebarItem
                    icon={
                      loading ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        <FaSignOutAlt />
                      )
                    }
                    label={loading ? "Logging out..." : "Logout"}
                    isLogout
                    onClick={() => {
                      setLoading(true);
                      dispatch(logout())
                        .unwrap()
                        .then(() => {
                          dispatch(clearUserProfile());
                          toast.success("Logout Successful");

                          navigate("/");
                        })
                        .catch(() => toast.error("Logout Failed"))
                        .finally(() => setLoading(false));
                    }}
                  />
                </ul>
              </div>

              {/* Main Content */}
              <div className="w-full lg:w-3/4 lg:ml-4 mt-4 lg:mt-0">
                {isEditing ? (
                  // Edit Profile Form
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                  >
                    <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                    {[
                      { label: "First Name", field: "firstName", type: "text" },
                      { label: "Last Name", field: "lastName", type: "text" },
                      { label: "Email", field: "email", type: "email" },
                      { label: "Phone", field: "phone", type: "tel" },
                      { label: "DOB", field: "dob", type: "date" },
                    ].map(({ label, field, type }) => (
                      <div key={field} className="mb-4">
                        <label className="block text-gray-700" htmlFor={field}>
                          {label}
                        </label>
                        <input
                          disabled={label === "Email"}
                          type={type}
                          id={field}
                          value={state[field].value}
                          onChange={(e) =>
                            userDispatch({
                              type: "UPDATE_FIELD",
                              field,
                              value: e.target.value,
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded p-2"
                        />
                      </div>
                    ))}

                    {/* Gender Fieldset */}
                    <fieldset className="mb-4">
                      <legend className="block text-gray-700">Gender *</legend>
                      <div className="flex">
                        {["Male", "Female", "Other"].map((genderOption) => (
                          <div key={genderOption} className="mr-4">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                value={genderOption}
                                checked={state.gender.value === genderOption}
                                onChange={(e) =>
                                  userDispatch({
                                    type: "UPDATE_FIELD",
                                    field: "gender",
                                    value: e.target.value,
                                  })
                                }
                                className="form-radio"
                              />
                              <span className="ml-2 capitalize">
                                {genderOption}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>

                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg font-medium shadow-md transition-all duration-300 hover:bg-gray-400 active:scale-95"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-yellow-500 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-all duration-300 hover:bg-yellow-600 active:scale-95 relative" // Added relative positioning
                      >
                        {updateLoading ? ( // Add a state variable to track saving state
                          <div className="absolute inset-0 flex items-center justify-center bg-yellow-500 bg-opacity-50 rounded-lg">
                            <Loader className="w-5 h-5 animate-spin text-white" />
                          </div>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  // Profile and Action Cards
                  <div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Profile Card */}
                      <div className="bg-yellow-50 p-6 rounded-xl shadow-lg flex flex-wrap items-center justify-between border border-yellow-200 gap-4">
                        {/* Profile Avatar */}
                        <div className="flex-shrink-0">
                          {loading || !user ? (
                            <Skeleton className="w-14 h-14 rounded-full bg-gray-300" />
                          ) : (
                            <div className="bg-yellow-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-semibold shadow-md">
                              {user.firstName && user.lastName
                                ? (
                                    user.firstName[0] + user.lastName[0]
                                  ).toUpperCase()
                                : "?"}
                            </div>
                          )}
                        </div>

                        {/* Profile Details */}
                        <div className="flex-1 min-w-[150px]">
                          {loading || !user ? (
                            <>
                              <Skeleton className="h-5 w-32 mb-2 bg-gray-300" />
                              <Skeleton className="h-4 w-48 mb-1 bg-gray-300" />
                              <Skeleton className="h-4 w-36 bg-gray-300" />
                            </>
                          ) : (
                            <>
                              <h2 className="text-lg font-semibold text-gray-800">
                                {user.firstName} {user.lastName}
                              </h2>
                              <p className="text-gray-500 text-sm">
                                {user.email}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {user.phone}
                              </p>
                            </>
                          )}
                        </div>

                        {/* Edit Profile Button */}
                        <div className="w-full sm:w-auto">
                          {loading ? (
                            <Skeleton className="h-10 w-32 rounded-lg bg-gray-300" />
                          ) : (
                            <button
                              onClick={handleEditProfileClick}
                              className="bg-yellow-500 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-all duration-300 hover:bg-yellow-600 active:scale-95 w-full sm:w-auto"
                            >
                              EDIT PROFILE
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Membership Card */}
                      <div className="bg-yellow-50 p-6 rounded-xl shadow-lg border border-yellow-200">
                        <h2 className="text-lg font-semibold text-gray-800">
                          Bewakoof TriBe
                        </h2>
                        <p className="text-gray-600 text-sm">
                          Upgrade to the premium experience now
                        </p>
                        <div className="flex flex-wrap gap-4 mt-3">
                          <div className="flex items-center">
                            <FaShippingFast className="text-yellow-500 mr-2 text-lg" />
                            <span className="text-sm text-gray-700">
                              Free Shipping
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FaStar className="text-yellow-500 mr-2 text-lg" />
                            <span className="text-sm text-gray-700">
                              Early Access
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FaHeadset className="text-yellow-500 mr-2 text-lg" />
                            <span className="text-sm text-gray-700">
                              VIP Support
                            </span>
                          </div>
                        </div>
                        <button className="bg-yellow-500 text-white px-5 py-2 rounded-lg font-medium shadow-md mt-4 transition-all duration-300 hover:bg-yellow-600 active:scale-95">
                          GET TRIBE MEMBERSHIP
                        </button>
                      </div>
                    </div>

                    {/* Action Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                      {[
                        {
                          icon: <FaBox />,
                          title: "My Orders",
                          desc: "View, Modify, and Track Orders",
                        },
                        {
                          icon: <FaCreditCard />,
                          title: "My Payments",
                          desc: "View and Modify Payment Methods",
                        },
                        {
                          icon: <FaWallet />,
                          title: "My Wallet",
                          desc: "Wallet History and Redeemed Gift Cards",
                        },
                        {
                          icon: <FaMapMarkerAlt />,
                          title: "My Addresses",
                          desc: "Edit, Add, or Remove Addresses",
                        },
                        {
                          icon: <FaUser />,
                          title: "My Profile",
                          desc: "Edit Personal Info and Change Password",
                        },
                        {
                          icon: <FaQuestionCircle />,
                          title: "Help & Support",
                          desc: "Reach Us for Assistance",
                        },
                      ].map((card, index) => (
                        <div
                          key={index}
                          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                          <div className="text-yellow-500 text-4xl mb-3">
                            {card.icon}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {card.title}
                          </h3>
                          <p className="text-gray-600 text-sm">{card.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer sticks to bottom */}
        <Footer />
      </div>
    </>
  );
}
