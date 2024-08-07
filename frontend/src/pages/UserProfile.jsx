import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import profilePlaceHolder from "/Images/profile.jpg";
import { FaCamera } from "react-icons/fa";
import { setCredentials } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { useUpdateUserMutation } from "../features/usersApiSlice";
import { storage } from '../firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(profilePlaceHolder);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setProfilePhoto(userInfo.profilePhoto || profilePlaceHolder);
  }, [userInfo.setName, userInfo.setEmail]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log(userInfo,"userInfo")
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        console.log("Hi 1")
        let profilePhotoUrl = userInfo.profilePhoto;
        console.log(file,"file")
        if (file) {
          console.log(file.name, "filename")
          console.log(storage,"storage")
          const storageRef = ref(storage, `profilePhotos/${file.name}`);
          console.log("after")
          console.log(storageRef,"sref")
          await uploadBytes(storageRef, file);
          console.log("await below")
          profilePhotoUrl = await getDownloadURL(storageRef);
          console.log(profilePhotoUrl,"ppurl")
        }
        console.log("Hi 2")

        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          profilePhoto: profilePhotoUrl,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        console.log("Hi 3")
        toast.success("Profile updated");
        console.log("Hi 4")
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
    // const formData = { name, email, password, confirmPassword };
    // console.log('Updated User Data:', formData);
    // navigate('/profile');
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
                className="mt-1 block w-full h-12 bg-gray-100 text-gray-800 rounded-md px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
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
                className="mt-1 block w-full h-12 bg-gray-100 text-gray-800 rounded-md px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
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
                className="mt-1 block w-full h-12 bg-gray-100 text-gray-800 rounded-md px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
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
                className="mt-1 block w-full h-12 bg-gray-100 text-gray-800 rounded-md px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
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
