import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import profilePlaceHolder from "/Images/profile.jpg";
import { FaCamera } from "react-icons/fa";
import { setCredentials } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { useUpdateProfileMutation } from "../../features/usersApiSlice";
import { storage } from '../../firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(profilePlaceHolder);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setProfilePhoto(userInfo.profilePhoto || profilePlaceHolder);
  }, [userInfo.setName, userInfo.setEmail]);

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
    let tempErrors = {};
    
    if (name.trim().length < 4) {
      tempErrors.name = "Name must be at least 4 characters long";
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    
    if (password && password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
    }
    
    if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        let profilePhotoUrl = userInfo.profilePhoto;
        
        if (file) {
          const storageRef = ref(storage, `profilePhotos/${file.name}`);
          await uploadBytes(storageRef, file);
          profilePhotoUrl = await getDownloadURL(storageRef);
        }
   
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password: password || undefined,
          profilePhoto: profilePhotoUrl,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        
        toast.success("Profile updated successfully");
       
      } catch (err) {
        toast.error(err?.data?.message || err.error || "An error occurred while updating profile");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-100 flex items-center justify-center py-10 px-4 mt-20">
        <div className="max-w-md w-full bg-white rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Update Profile
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
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={`mt-1 block w-full h-12 bg-gray-100 text-gray-800 rounded-md px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className={`mt-1 block w-full h-12 bg-gray-100 text-gray-800 rounded-md px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
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
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;