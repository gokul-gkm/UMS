import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../features/adminApiSlice";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import profilePlaceHolder from "/Images/profile.jpg";
import { FaCamera } from "react-icons/fa";
import { storage } from '../../firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AdminEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(profilePlaceHolder);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const { data: users } = useGetUsersQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (users) {
      const user = users.find((u) => u._id === id);
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setProfilePhoto(user.profilePhoto || profilePlaceHolder);
      }
    }
  }, [users, id]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { 
        setErrors(prev => ({ ...prev, file: "File size should not exceed 5MB" }));
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setErrors(prev => ({ ...prev, file: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (name.trim().length < 4) {
      newErrors.name = "Name must be at least 4 characters long";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let profilePhotoUrl = profilePhoto;
        
        if (file) {
          const storageRef = ref(storage, `profilePhotos/${file.name}`);
          await uploadBytes(storageRef, file);
          profilePhotoUrl = await getDownloadURL(storageRef);
        }

        const result = await updateUser({ 
          id, 
          name: name.trim(), 
          email: email.trim(),
          profilePhoto: profilePhotoUrl
        }).unwrap();
        toast.success("User updated successfully");
        navigate("/admin/users");
      } catch (err) {
        console.error('Update error:', err);
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.error("Please correct the errors before submitting");
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-100 flex items-center justify-center py-10 px-4 mt-0">
        <div className="max-w-md w-full bg-white rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Edit User
          </h1>

          <div className="flex justify-center mb-6">
            <label
              htmlFor="profileImageInput"
              className="relative cursor-pointer"
            >
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-indigo-500"
              />
              <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <FaCamera className="text-white text-2xl" />
              </div>
              <input
                type="file"
                id="profileImageInput"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
          {errors.file && <p className="text-red-500 text-xs italic text-center mb-4">{errors.file}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter username"
                className={`mt-1 block w-full h-12 bg-gray-100 text-gray-800 rounded-md px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                required
              />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className={`mt-1 block w-full h-12 bg-gray-100 text-gray-800 rounded-md px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                required
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-950 to-indigo-800 hover:bg-gradient-to-r hover:from-indigo-800 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-950 transition-all duration-300 hover:shadow-xl hover:shadow-slate-500"
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
                  "Update User"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEditUser;