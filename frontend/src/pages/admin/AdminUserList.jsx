import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { useGetUsersQuery, useDeleteUserMutation } from '../../features/adminApiSlice';
import { toast } from 'react-toastify';
import { Bars } from "react-loader-spinner";

const AdminUserList = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [searchItem, setSearchItem] = useState('');

  if (isLoading) return <div className="flex justify-center h-screen items-center">
    <Bars
      height="80"
      width="80"
      color="indigo"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>;
  if (isError) return <div>Error: {error.message}</div>;

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id).unwrap();
        toast.success('User deleted successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const filteredUsers = users.filter(user =>
    !user.isAdmin && (
      user.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      user.email.toLowerCase().includes(searchItem.toLowerCase())
    )
  );

  return (
    <AdminLayout>
      <div className="flex-1 p-6 pt-2 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">User List</h1>
          <NavLink
            to="/admin/users/add"
            className="border border-indigo-600 text-indigo-600 bg-white hover:bg-gradient-to-r from-indigo-950 to-indigo-800 hover:text-white rounded-lg px-4 py-2 transition-colors"
          >
            Add User
          </NavLink>
        </div>
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-colors w-64 sm:w-80"
          />
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-950 to-indigo-800 text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={user.profilePhoto || '/Images/profile.jpg'} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onClick={() => navigate(`/admin/users/edit/${user._id}`)} className="border border-indigo-600 text-indigo-600 hover:bg-gradient-to-r from-indigo-950 to-indigo-800 hover:text-white rounded-lg px-4 py-2 mr-4 transition-colors">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(user._id)} className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg px-4 py-2 transition-colors">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                      No user found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUserList;
