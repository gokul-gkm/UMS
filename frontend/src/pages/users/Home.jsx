import React from "react";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-100 flex items-center justify-center py-10 px-4">
        <div className="bg-white shadow-lg rounded-md p-8 md:p-14 mx-auto text-center">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">
            Welcome Back, {userInfo?.name || 'Guest'}!
          </h1>
          <p className="text-gray-600">
            We're glad to have you back. Here's a quick overview of your
            dashboard.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;