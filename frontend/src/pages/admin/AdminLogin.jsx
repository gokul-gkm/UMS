import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAdminLoginMutation } from "../../features/adminApiSlice";
import { setAdminCredentials } from "../../features/adminAuthSlice";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useAdminLoginMutation();

  const { adminInfo } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin/dashboard");
    }
  }, [navigate, adminInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setAdminCredentials({ ...res }));
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center py-10 px-4">
      <div className="max-w-sm w-full bg-white rounded-lg p-8 shadow-lg">
        <h1 className="text-2xl font-medium mb-7 text-center text-indigo-700">
          Admin Sign In
        </h1>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full h-12 bg-gray-100 text-gray-800 my-3 rounded-md px-4 py-2 font-medium border focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full h-12 bg-gray-100 text-gray-800 my-3 rounded-md px-4 py-2 font-medium border focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full border-0 outline-none py-4 bg-indigo-600 text-white rounded-md text-base font-medium mt-5 cursor-pointer hover:bg-indigo-700 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <TailSpin
                height="24"
                width="24"
                color="#ffffff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
