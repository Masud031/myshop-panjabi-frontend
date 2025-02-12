/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/auth/authSlice';
import { useLoginUserMutation } from '../redux/features/auth/authapi';

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../pages/Home/firebase/firebase.init";

const Login = () => {
    const [message, setMessage] = useState('');
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    // ✅ Email & Password Login Function
    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data).unwrap();
            const { token, user } = response;
            
            localStorage.setItem('authToken', token);
            dispatch(setUser({ user }));
            alert("Login successful!");
            navigate('/');
        } catch (error) {
            setMessage("Please provide a valid email and password!");
        }
    };

    // ✅ Google Sign-In Function (Moved Outside `onSubmit`)
    const handleGooglesignin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
    
            // Prepare user data for the backend
            const userData = {
                username: user.displayName,
                email: user.email,
                provider: "google", // Indicate the provider
            };
    
            // First, check if the user exists
            let response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
    
            let data;
            if (response.ok) {
                data = await response.json();
            } else {
                // If the user already exists, attempt login instead
                response = await fetch("http://localhost:5000/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: user.email, password: "default" }), // Default password for Google users
                });
    
                if (!response.ok) {
                    throw new Error("Failed to log in the existing user.");
                }
    
                data = await response.json();
            }
    
            // Dispatch user data to Redux store
            dispatch(setUser({ user: data.user }));
    
            alert("Google Sign-in successful!");
            navigate("/");
        } catch (error) {
            console.error("Google signin error:", error);
            alert("Google signin failed! Please try again.");
        }
    };
    
    

    return (
        <section className='h-screen flex items-center justify-center p-2'>
            <div className='shadow bg-white p-8 max-w-sm mx-auto'>
                <h2 className='text-2xl font-semibold pt-5'>Please Login!</h2>

                {/* Email & Password Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 max-w-sm mx-auto pt-6'>
                    <input
                        {...register("email", { required: true })}
                        type="email" placeholder='Email' className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
                    {errors.email && <p className='text-red-500'>Email is required</p>}

                    <input
                        {...register("password", { required: true })}
                        type="password" placeholder='Password' className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
                    {errors.password && <p className='text-red-500'>Password is required</p>}

                    {message && <p className='text-red-500'>{message}</p>}

                    <button className='w-full mt-5 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-md'>
                        Login
                    </button>
                </form>

                <div className='my-5 italic text-sm text-center'>
                    Dont have an account? <Link to="/register" className='text-red-700 px-1 underline cursor-pointer'>Register</Link> here.
                </div>

                {/* Google Sign-In Button */}
                <button
                    onClick={handleGooglesignin}
                    className='w-full mt-3 bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md flex items-center justify-center'
                >
                    <span className='mr-2'>🔵</span> Sign in with Google
                </button>
            </div>
        </section>
    );
}

export default Login;
