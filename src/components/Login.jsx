/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/auth/authSlice';
import { useLoginUserMutation } from '../redux/features/auth/authapi';
import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup, updateProfile } from "firebase/auth";
import app from "../pages/Home/firebase/firebase.init";

const Login = () => {
    const [message, setMessage] = useState('');
    const { register, handleSubmit, formState: { errors },reset } = useForm();

    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();


    // ✅ Email & Password Login Function
    const onSubmit = async (data) => {
        try {
            reset();
            const response = await loginUser(data).unwrap();
            const { token, user } = response;

            const formattedUser = {
                email: user.email,
                username: user.username,
                role: user.role,
                _id: user._id,
                profileImage: user.profileImage || "https://i.ibb.co/2kR9YxW/avatar.png", // default or from backend if available
            };
            
            localStorage.setItem('authToken', token);
            // dispatch(setUser({ user }));
            dispatch(setUser({ user: formattedUser }));
            // dispatch(setUser(user));
            alert("Login successful!");
            navigate('/');
        } catch (err) {
            if (err?.data?.message) {
                setMessage(err.data.message);
            } else {
                setMessage("Please provide a valid email and password!");
            }
             reset({ email: "", password: "" }); // reset form fields
        }
    };

    // ✅ Google Sign-In Function (Moved Outside `onSubmit`)
    const handleGooglesignin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

    
            await updateProfile(user, {
                displayName: user.displayName,
                photoURL: user.photoURL
            });
    
            const userData = {
                username: user.displayName,
                email: user.email,
                provider: "google",
                profileImage: user.photoURL,
            };
             console.log("➡️ Sending Google Login:", userData);
    
            // Try to register user
           
            
                // If user already exists, fetch user data directly (e.g., a special Google login endpoint or get user by email)
               // login response
   const res = await fetch("http://localhost:5000/api/auth/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // for cookies
       body: JSON.stringify({
    username: "Test User",
    email: "test@example.com",
    provider: "google",
    profileImage: "https://test.jpg"
  })
    });
    console.log("📤 Sending body to backend:", JSON.stringify(userData));

const data = await res.json();
console.log("Google login response:", data);

   if (!res.ok) {
      throw new Error(data.message || "Google login failed");
    }

    
                // if (!loginResponse.ok) {
                //     const errorData = await loginResponse.json();
                //     throw new Error(errorData.message || "Google login failed.");
                // }
    
                // data = await loginResponse.json();
            
    
            const formattedUser = {
                email: data.user.email,
                username: data.user.username,
                role: data.user.role,
                _id: data.user._id,
                profileImage: data.user.profileImage || "https://i.ibb.co/2kR9YxW/avatar.png",
            };
    
            dispatch(setUser({ user: formattedUser }));
            localStorage.setItem('authToken', data.token);
    
            alert("Google Sign-in successful!");
            navigate("/");
    
        } catch (error) {
            console.error("Google signin error:", error);
            alert(error.message || "Google Signin failed!");
        }
    };
    
    


    //forgot password//
    const handleForgotPassword = async () => {
        const email = prompt("Please enter your email for password reset:");
    
        if (email) {
            try {
                await sendPasswordResetEmail(auth, email);
                alert("Password reset link sent to your email!");
            } catch (error) {
                console.error("Error resetting password:", error.message);
                alert("Failed to send password reset email.");
            }
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
                        type="email" placeholder='Email' className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                        onChange={(e) => {
                    setMessage(""); // clear previous error
                     }} />
                    {errors.email && <p className='text-red-500'>Email is required</p>}

                    <input
                        {...register("password", { required: true })}
                        type="password" placeholder='Password' className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                        onChange={(e) => {
                    setMessage(""); // clear previous error
                         }} />
                    {errors.password && <p className='text-red-500'>Password is required</p>}

                    {message && <p className='text-red-500'>{message}</p>}

                    <button className='w-full mt-5 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-md'>
                        Login
                    </button>
                </form>
                <div className='text-center my-2'>
                <button
                 type="button"
                 onClick={handleForgotPassword}
                 className='text-blue-600 hover:underline'
                 >
                 Forgot Password?
                 </button>
                </div>


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
