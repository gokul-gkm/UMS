import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/Images/umslogo.png";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown } from "react-icons/fa";
import { useLogoutMutation } from "../features/usersApiSlice";
import { logout } from "../features/authSlice";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const linkClass = ({ isActive }) => {
    return isActive
      ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 border border-white ml-2";
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-customPurple to-customPurple border-b border-indigo-500 fixed top-0 left-0 w-full z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-shrink-0 flex items-center">
            <NavLink className="flex items-center" to="/">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="hidden sm:block text-white text-2xl font-bold ml-2">
                UMS
              </span>
            </NavLink>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:block">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
            </div>
            {userInfo ? (
              <div className="relative ml-3" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-white hover:bg-gradient-to-r from-purple-600 to-customPurple rounded-md px-3 py-2 flex items-center border border-white"
                >
                  <span className="hidden sm:inline">{userInfo.name}</span>
                  <span className="sm:hidden">Menu</span>
                  <FaChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <NavLink
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-900 sm:hidden"
                        role="menuitem"
                      >
                        Home
                      </NavLink>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-900"
                        role="menuitem"
                      >
                        Profile
                      </NavLink>
                      <NavLink
                        // to="/logout"
                        onClick={logoutHandler}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-900"
                        role="menuitem"
                      >
                        Logout
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <NavLink to="/login" className={linkClass}>
                  Sign In
                </NavLink>
                <NavLink to="/register" className={linkClass}>
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
