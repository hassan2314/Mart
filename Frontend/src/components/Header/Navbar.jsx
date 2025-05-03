import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // user profile dropdown
  const [isModalOpen, setIsModalOpen] = useState(false); // login/signup modal
  const dropdownRef = useRef(null);

  const [formType, setFormType] = useState("login");
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
    avatar: "",
  });
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/current-user`,
          { withCredentials: true }
        );

        if (response.data?.data?.user) {
          setCurrentUser(response.data.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        // Clear any invalid auth state
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        sessionStorage.removeItem("accessToken");
        setCurrentUser(null);
      }
    };

    // Always verify auth on mount
    verifyAuth();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Add this function inside your Navbar component
  const verifyAuth = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/current-user`,
        { withCredentials: true }
      );

      if (response.data?.user) {
        setCurrentUser(response.data.user);
        localStorage.setItem("userId", response.data.user._id);
      }
    } catch (error) {
      console.error("Auth verification failed:", error);
      // Clear any invalid auth state
      localStorage.removeItem("userId");
      sessionStorage.removeItem("accessToken");
      setCurrentUser(null);
    }
  };

  // Update your useEffect to call verifyAuth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    if (storedUser) {
      verifyAuth();
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const showForm = (type) => setFormType(type);

  const togglePassword = (id) => {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        loginData,
        { withCredentials: true }
      );
  
      const { user } = res.data.data;
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user._id);
      setIsModalOpen(false);
      setLoginData({ username: "", password: "" });
    } catch (err) {
      console.error("Login Error:", err);
      alert("Login failed! Please check credentials.");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in signupData) {
      formData.append(key, signupData[key]);
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Registration Successful! Please Login.");
      setFormType("login");
      setSignupData({
        username: "",
        email: "",
        fullname: "",
        password: "",
        phoneNumber: "",
        address: "",
        city: "",
        postalCode: "",
        avatar: "",
      });
    } catch (err) {
      console.error("Signup Error:", err);
      alert("Registration failed! Try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, null, {
        withCredentials: true,
      });
  
      // Clear all auth-related storage
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      sessionStorage.removeItem("accessToken");
      setCurrentUser(null);
      setIsDropdownOpen(false);
  
      navigate("/");
    } catch (err) {
      console.error("Logout Error:", err);
      alert("Error logging out. Try again.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 shadow-md bg-white">
        <Link to="/" className="text-2xl text-red-600 font-bold">
          M&M
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg items-center">
          {["products", "smart-cooking", "stores", "media"].map((page) => (
            <li key={page}>
              <NavLink
                to={`/${page}`}
                className={({ isActive }) =>
                  isActive ? "text-red-500" : "hover:text-red-500"
                }
              >
                {page.charAt(0).toUpperCase() + page.slice(1).replace("-", " ")}
              </NavLink>
            </li>
          ))}

          <li className="relative" ref={dropdownRef}>
            {currentUser ? (
              <>
                <button onClick={toggleDropdown} className="flex items-center">
                  <img
                    src={currentUser.avatar}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-red-500"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                    <Link
                      to="/update-profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Update Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button onClick={toggleModal} className="text-2xl text-red-600">
                <FaUserCircle />
              </button>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          id="menu-btn"
          onClick={toggleMenu}
          className="md:hidden text-red-600 text-2xl"
        >
          &#9776;
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="flex flex-col text-center bg-white shadow-md p-5 space-y-4 md:hidden">
          {["products", "smart-cooking", "stores", "media"].map((page) => (
            <li key={page}>
              <Link
                to={`/${page}`}
                className="hover:text-red-500"
                onClick={toggleMenu}
              >
                {page.charAt(0).toUpperCase() + page.slice(1).replace("-", " ")}
              </Link>
            </li>
          ))}
          <li>
            {currentUser ? (
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={currentUser.avatar}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={() => {
                    toggleMenu();
                    handleLogout();
                  }}
                  className="text-sm text-red-600 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  toggleMenu();
                  toggleModal();
                }}
                className="text-2xl text-red-600"
              >
                <FaUserCircle />
              </button>
            )}
          </li>
        </ul>
      )}

      {/* Login/Signup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md w-96 relative">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-red-600 text-2xl"
            >
              &times;
            </button>

            <div className="flex justify-center mb-4">
              <button
                onClick={() => showForm("login")}
                className={`px-4 py-2 ${
                  formType === "login" ? "bg-red-500 text-white" : "bg-gray-200"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => showForm("signup")}
                className={`px-4 py-2 ${
                  formType === "signup"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Signup
              </button>
            </div>

            {formType === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <input
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  placeholder="Username"
                  className="w-full p-2 border rounded"
                  required
                />
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    id="loginPassword"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword("loginPassword")}
                    className="absolute right-2 top-2 text-sm"
                  >
                    👁
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-2 rounded"
                >
                  Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                {/* All Signup Inputs */}
                <input
                  type="text"
                  name="username"
                  value={signupData.username}
                  onChange={handleSignupChange}
                  placeholder="Username"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="fullname"
                  value={signupData.fullname}
                  onChange={handleSignupChange}
                  placeholder="Full Name"
                  className="w-full p-2 border rounded"
                  required
                />
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    id="signupPassword"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword("signupPassword")}
                    className="absolute right-2 top-2 text-sm"
                  >
                    👁
                  </button>
                </div>
                <input
                  type="text"
                  name="phoneNumber"
                  value={signupData.phoneNumber}
                  onChange={handleSignupChange}
                  placeholder="Phone Number"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="address"
                  value={signupData.address}
                  onChange={handleSignupChange}
                  placeholder="Address"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="city"
                  value={signupData.city}
                  onChange={handleSignupChange}
                  placeholder="City"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="postalCode"
                  value={signupData.postalCode}
                  onChange={handleSignupChange}
                  placeholder="Postal Code"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="file"
                  name="avatar"
                  onChange={(e) =>
                    setSignupData({ ...signupData, avatar: e.target.files[0] })
                  }
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-2 rounded"
                >
                  Signup
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
