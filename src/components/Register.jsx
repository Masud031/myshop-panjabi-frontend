/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/auth/authSlice';
import { useRegisterUserMutation } from '../redux/features/auth/authapi';
import { getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import app from "../pages/Home/firebase/firebase.init";
import { showToast } from '../utils/showToast';

const Register = () => {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirectPath = localStorage.getItem("redirectAfterRegister") || "/";
  const location = useLocation();
  const from = location.state?.from || '/';

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // ✅ Email or Mobile registration handler
  const onSubmit = async (data) => {
    const { emailOrMobile, username, password } = data;

    const isEmail = /\S+@\S+\.\S+/.test(emailOrMobile);
    const isMobile = /^[0-9]{10,15}$/.test(emailOrMobile);

    if (!isEmail && !isMobile) {
      setMessage("Please enter a valid email or mobile number.");
      return;
    }

    const payload = {
      username,
      password,
      ...(isEmail ? { email: emailOrMobile } : { mobile: emailOrMobile }),
    };

    try {
      const response = await registerUser(payload).unwrap();
      const { user, token } = response;

      if (!user || !token) {
        throw new Error("Invalid registration response");
      }

      // ✅ Format and save user data
      const formattedUser = {
        email: user.email,
        mobile: user.mobile,
        username: user.username,
        role: user.role,
        _id: user._id,
        profileImage: user.profileImage || "https://i.ibb.co.com/TDFh2J1d/download-2.jpg",
      };

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(formattedUser));
      dispatch(setUser(formattedUser));

      reset();
      
    showToast("success", "Registration successful!");


      navigate(redirectPath, { replace: true });
localStorage.removeItem("redirectAfterRegister");

    } catch (error) {
      console.error("Registration Error:", error);
      
   // Error
showToast("error", err?.data?.message || "Registration failed!");
    }
  };

  // ✅ Google Sign-Up / Sign-In Handler
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await updateProfile(user, {
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      const userData = {
        username: user.displayName,
        email: user.email,
        provider: "google",
        profileImage: user.photoURL,
      };

      console.log("➡️ Sending Google Signup:", userData);

      const res = await fetch("http://localhost:5000/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await res.json();

if (!res.ok) {
  showToast("error", data.message || "Google registration failed");
  throw new Error(data.message || "Google registration failed");
}
      const formattedUser = {
        email: data.user.email,
        username: data.user.username,
        role: data.user.role,
        _id: data.user._id,
        profileImage: data.user.profileImage || "https://i.ibb.co.com/TDFh2J1d/download-2.jpg",
      };

      // ✅ Save to Redux + localStorage
      dispatch(setUser(formattedUser));
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(formattedUser));

      showToast("success", "🎉 Google Sign-Up successful!");
      navigate(from, { replace: true });

    } catch (error) {
      console.error("Google Signup Error:", error);
      showToast("error", error.message || "Google Sign-Up failed!");
    }
  };

  return (
<section className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
  <div className='bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg transition-all duration-300 hover:shadow-2xl'>
    
    <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6'>Create an Account</h2>

    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <input
        {...register("username", { required: true })}
        type="text"
        placeholder="Username"
        className="w-full bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none px-4 sm:px-5 py-3 rounded-lg transition"
      />
      {errors.username && <p className='text-red-500 text-sm'>Username is required</p>}

      <input
        {...register("emailOrMobile", { required: true })}
        type="text"
        placeholder="Email or Mobile number"
        className="w-full bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none px-4 sm:px-5 py-3 rounded-lg transition"
      />
      {errors.emailOrMobile && <p className='text-red-500 text-sm'>Email or Mobile is required</p>}

      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Password"
        className="w-full bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none px-4 sm:px-5 py-3 rounded-lg transition"
      />
      {errors.password && <p className='text-red-500 text-sm'>Password is required</p>}

      {message && <p className='text-red-500 text-sm'>{message}</p>}

      <button
        className='w-full mt-4 bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white font-semibold py-3 rounded-full shadow-lg transition duration-300'
      >
        Register
      </button>
    </form>

    <div className='my-5 text-center text-sm text-gray-600'>
      Already have an account?{" "}
      <Link to="/login" className='text-red-600 font-medium underline hover:text-red-700'>
        Login
      </Link>
    </div>

    {/* Google Sign-Up Button */}
    <button
      onClick={handleGoogleSignup}
      className='w-full mt-3 bg-white border border-red-500 hover:bg-red-50 text-red-600 font-medium py-3 rounded-full flex items-center justify-center shadow transition duration-300'
    >
      <span className='mr-2'>🔵</span> Sign up with Google
    </button>
  </div>
</section>


  );
};

export default Register;
