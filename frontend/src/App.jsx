import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute.jsx";

import Home from "./pages/users/Home.jsx";
import UserLogin from "./pages/users/UserLogin.jsx";
import UserRegister from "./pages/users/UserRegister.jsx";
import UserProfile from "./pages/users/UserProfile.jsx";

import AdminLogin from "./pages/admin/AdminLogin"
import AdminRoute from "./pages/admin/AdminRoute.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminUserList from "./pages/admin/AdminUserList"
import AdminAddUser from "./pages/admin/AdminAddUser"
import AdminEditUser from "./pages/admin/AdminEditUser"

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />

          {/* Private Routes */}
          <Route path="" element={<PrivateRoute />}>
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUserList />} />
            <Route path="users/add" element={<AdminAddUser />} />
            <Route path="users/edit/:id" element={<AdminEditUser />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
