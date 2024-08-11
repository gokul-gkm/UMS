import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminLogoutMutation } from '../features/adminApiSlice';
import { adminLogout } from '../features/adminAuthSlice';
import { toast } from 'react-toastify';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const [logoutApiCall] = useAdminLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(adminLogout());
      navigate('/admin');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      <div className="bg-gradient-to-b from-indigo-900 to-indigo-700 text-white w-64 flex flex-col">
        <div className="p-4">
          <h2 className="text-2xl font-semibold">Admin Panel</h2>
        </div>
        <nav className="flex-1">
          <NavLink to="/admin/dashboard" className={({ isActive }) => `flex items-center py-2 px-4 ${isActive ? 'bg-indigo-800' : 'hover:bg-indigo-800'}`}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `flex items-center py-2 px-4 ${isActive ? 'bg-indigo-800' : 'hover:bg-indigo-800'}`}>
            Manage Users
          </NavLink>
        </nav>
        <div className="p-4">
          <button onClick={handleLogout} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">
            Logout
          </button>
        </div>
      </div>

    
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-gray-900">Welcome, {adminInfo?.name}</h1>
          </div>
        </header>

       
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;