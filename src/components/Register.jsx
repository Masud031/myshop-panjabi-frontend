/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/auth/authSlice';
import { useRegisterUserMutation } from '../redux/features/auth/authapi';
import { getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import app from "../pages/Home/firebase/firebase.init";

const Register = () => {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        profileImage: user.profileImage || "https://i.ibb.co/2kR9YxW/avatar.png",
      };

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(formattedUser));
      dispatch(setUser(formattedUser));

      reset();
      alert("🎉 Registration successful!");
      navigate(from, { replace: true });

    } catch (error) {
      console.error("Registration Error:", error);
      setMessage(error?.data?.message || "Registration failed! Please try again.");
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
        throw new Error(data.message || "Google registration failed");
      }

      const formattedUser = {
        email: data.user.email,
        username: data.user.username,
        role: data.user.role,
        _id: data.user._id,
        profileImage: data.user.profileImage || "https://i.ibb.co/2kR9YxW/avatar.png",
      };

      // ✅ Save to Redux + localStorage
      dispatch(setUser(formattedUser));
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(formattedUser));

      alert("🎉 Google Sign-Up successful!");
      navigate(from, { replace: true });

    } catch (error) {
      console.error("Google Signup Error:", error);
      alert(error.message || "Google Sign-Up failed!");
    }
  };

  return (
    <section className='h-screen flex items-center justify-center p-2'>
      <div className='shadow bg-white p-8 max-w-sm mx-auto'>
        <h2 className='text-2xl font-semibold pt-5'>Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 max-w-sm mx-auto pt-6'>
          <input
            {...register("username", { required: true })}
            type="text"
            placeholder="Username"
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
          />
          {errors.username && <p className='text-red-500'>Username is required</p>}

          <input
            {...register("emailOrMobile", { required: true })}
            type="text"
            placeholder="Email or Mobile number"
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
          />
          {errors.emailOrMobile && <p className='text-red-500'>Email or Mobile is required</p>}

          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
          />
          {errors.password && <p className='text-red-500'>Password is required</p>}

          {message && <p className='text-red-500'>{message}</p>}

          <button className='w-full mt-5 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-md'>
            Register
          </button>
        </form>

        <div className='my-5 italic text-sm text-center'>
          Already have an account?{" "}
          <Link to="/login" className='text-red-700 px-1 underline cursor-pointer'>Login</Link> here.
        </div>

        {/* Google Sign-Up Button */}
        <button
          onClick={handleGoogleSignup}
          className='w-full mt-3 bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md flex items-center justify-center'
        >
          <span className='mr-2'>🔵</span> Sign up with Google
        </button>
      </div>
    </section>
  );
};

export default Register;
