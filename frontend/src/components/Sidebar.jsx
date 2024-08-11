import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

const Sidebar = () => {
  const linkClass = ({ isActive }) => {
    return isActive 
      ? 'bg-purple-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
      : 'text-white hover:bg-purple-800 group flex items-center px-2 py-2 text-sm font-medium rounded-md';
  };

  return (
    <div className="fixed top-0 left-0 h-screen bg-gradient-to-b from-indigo-950 via-indigo-950 to-customPurple flex-shrink-0 md:w-48 w-36 sm:w-40 lg:w-56 xl:w-64">
      <div className="h-16"></div> 
      <nav className="mt-5 px-2 space-y-1">
        <NavLink to="/admin-dashboard" end className={linkClass}>
          <span className="mr-2"><RxDashboard /></span>
          Dashboard
        </NavLink>
        <NavLink to="/users-list" className={linkClass}>
          <span className="mr-2"><FaUsers /></span>
          User List
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
