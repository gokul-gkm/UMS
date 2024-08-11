import React from "react";
import AdminLayout from "../../components/AdminLayout";
import { useGetUsersQuery } from "../../features/adminApiSlice";
import { Bars } from "react-loader-spinner";

const AdminDashboard = () => {
  const { data: users, isLoading, isError, error } = useGetUsersQuery();

  if (isLoading)
    return (
      <div className="flex justify-center h-screen items-center">
        <Bars
          height="80"
          width="80"
          color="indigo"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <AdminLayout>
      <div className="flex-1 p-6 pt-2 overflow-y-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4 text-indigo-700">
            Welcome, Admin!
          </h2>
          <p className="text-gray-600 mb-4">
            This is your administrative dashboard. From here, you can manage
            your application and access various administrative functions.
          </p>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            User Statistics
          </h3>
          <p className="text-gray-600">Total Users: {users.filter(user=> !user.isAdmin).length}</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
