import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute.jsx";

import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
// import AdminLogin from "./pages/AdminLogin"
// import AdminDashboard from "./pages/AdminDashboard"
// import AdminUserList from "./pages/AdminUserList"
import UserProfile from "./pages/UserProfile";
// import AdminAddUser from "./pages/AdminAddUser"
// import AdminEditUser from "./pages/AdminEditUser"

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
          
          {/* <Route path="/admin" element={<AdminLogin />} /> */}
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
          {/* <Route path="/users-list" element={<AdminUserList />} /> */}
          {/* <Route path="/add-user" element={<AdminAddUser />} /> */}
          {/* <Route path="/edit-user" element={<AdminEditUser />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
