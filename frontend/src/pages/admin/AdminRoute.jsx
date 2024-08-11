// components/AdminRoute.jsx

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { adminInfo } = useSelector((state) => state.adminAuth);
  return adminInfo ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default AdminRoute;