import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { useAddUserMutation } from '../../features/adminApiSlice';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import { validateForm } from '../../../public/js/validation'; 

const AdminAddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(name, email, password, confirmPassword);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await addUser({
          name: name.trim(),
          email: email.trim(),
          password
        }).unwrap();
        toast.success('User added successfully');
        navigate('/admin/users');
      } catch (err) {
        toast.error(err?.data?.message || err.error || "An error occurred while adding the user");
      }
    } else {
      toast.error("Please correct the errors before submitting");
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen flex items-center justify-center py-10 px-4">
        <div className="max-w-sm w-full bg-white rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-medium mb-7 text-center text-indigo-700">
            Add User
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
                className={`w-full h-12 bg-gray-100 text-gray-800 my-3 rounded-md px-4 py-2 font-medium border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:outline-none`}
              />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={`w-full h-12 bg-gray-100 text-gray-800 my-3 rounded-md px-4 py-2 font-medium border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:outline-none`}
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`w-full h-12 bg-gray-100 text-gray-800 my-3 rounded-md px-4 py-2 font-medium border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:outline-none`}
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className={`w-full h-12 bg-gray-100 text-gray-800 my-3 rounded-md px-4 py-2 font-medium border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:outline-none`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
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
                "Add User"
              )}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAddUser;
