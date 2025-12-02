/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/auth/authSlice';
import { useLoginUserMutation } from '../redux/features/auth/authapi';
import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup, updateProfile } from "firebase/auth";
import app from "../pages/Home/firebase/firebase.init";
import { showToast } from '../utils/showToast';

const Login = () => {
    const [message, setMessage] = useState('');
    const { register, handleSubmit, formState: { errors },reset } = useForm();

    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const location = useLocation(); // 👈 get previous route info
    const from = location.state?.from || '/'; 

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();


    // ✅ Email & Password Login Function
    const onSubmit = async (data) => {
         const { emailOrMobile, password } = data;
         // Validate that emailOrMobile is either valid email or mobile
    const isEmail = /\S+@\S+\.\S+/.test(emailOrMobile);
    const isMobile = /^[0-9]{10,15}$/.test(emailOrMobile);

      if (!isEmail && !isMobile) {
      setMessage("Please enter a valid email or mobile number!");
      return;
    }

     const payload = {
      password,
      ...(isEmail ? { email: emailOrMobile } : { mobile: emailOrMobile }),
    };
        try {
            reset();
            const response = await loginUser(payload).unwrap();
            const { token, user } = response;

            if (!token || !user) {
             throw new Error("Invalid server response");
             }

            // ✅ Normalize profile image
               let profileImage = user.profileImage?.trim();
   
   if (!profileImage || profileImage === "" || profileImage === "undefined") {
    profileImage = "https://i.ibb.co/2kR9YxW/avatar.png";
} 
// 2. KEEP the Google suffix logic, as it modifies a *valid* Google URL for better display
else if (
    profileImage.includes("googleusercontent") &&
    !profileImage.includes("=")
) {
    // Append quality suffix for Google links
    profileImage += "=s96-c";
}

            const formattedUser = {
                email: user.email,
                mobile: user.mobile,
                username: user.username,
                role: user.role,
                _id: user._id,
                profileImage, 
            };
          
            
           localStorage.setItem('authToken', token);
            dispatch(setUser( formattedUser));
           
                
         // Success toast
        showToast  ("success", "Login successful!");
              // 👇 Redirect logic
          navigate(from, { replace: true });

        } catch (err) {
            if (err?.data?.message) {
                setMessage(err.data.message);
            } else {
                setMessage("Invalid email/mobile or password!");
            }
            reset({ emailOrMobile: "", password: "" }); // reset form fields

             
 // Fail toast
showToast("error", err?.data?.message || "Invalid email/mobile or password!");
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
           
        
               // login response
   const res = await fetch("http://localhost:5000/api/auth/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // for cookies
       body: JSON.stringify(userData),
    });
    console.log("📤 Sending body to backend:", JSON.stringify(userData));

const data = await res.json();
console.log("Google login response:", data);

   if (!res.ok) {
      throw new Error(data.message || "Google login failed");
    }
            
    
            const formattedUser = {
                email: data.user.email,
                username: data.user.username,
                role: data.user.role,
                _id: data.user._id,
                profileImage: data.user.profileImage || "https://i.ibb.co/2kR9YxW/avatar.png",
            };
            console.log("Google login response:", data);

    
            dispatch(setUser( formattedUser )); 
            localStorage.setItem('authToken', data.token);
    
            showToast("success", "Google Sign-in successful!");
             navigate(from, { replace: true });
    
        } catch (error) {
            console.error("Google signin error:", error);
            showToast("error", error.message || "Google Signin failed!");
        }
    };
    
    


    //forgot password//
    const handleForgotPassword = async () => {
        const email = prompt("Please enter your email for password reset:");
    
        if (email) {
            try {
                await sendPasswordResetEmail(auth, email);
               showToast("success", "Password reset link sent to your email!");
            } catch (error) {
                console.error("Error resetting password:", error.message);
               showToast("error", "Failed to send password reset email.");
            }
        }
    };
    
    

    return (
       <section className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
  <div className='bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg transition-all duration-300 hover:shadow-2xl'>

    <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6'>Please Login!</h2>

    {/* Email/Mobile & Password Form */}
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <input
        {...register("emailOrMobile", { required: true })}
        type="text"
        placeholder="Email or Mobile number"
        className="w-full bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none px-4 sm:px-5 py-3 rounded-lg transition"
        onChange={() => setMessage("")}
      />
      {errors.emailOrMobile && <p className='text-red-500 text-sm'>Email or Mobile number is required</p>}

      <input
        {...register("password", { required: true })}
        type="password"
        placeholder='Password'
        className='w-full bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none px-4 sm:px-5 py-3 rounded-lg transition'
        onChange={() => setMessage("")}
      />
      {errors.password && <p className='text-red-500 text-sm'>Password is required</p>}

      {message && <p className='text-red-500 text-sm'>{message}</p>}

      <button className='w-full mt-4 bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white font-semibold py-3 rounded-full shadow-lg transition duration-300'>
        Login
      </button>
    </form>

    {/* Forgot Password */}
    <div className='text-center my-2'>
      <button
        type="button"
        onClick={handleForgotPassword}
        className='text-blue-600 hover:underline text-sm'
      >
        Forgot Password?
      </button>
    </div>

    {/* Register Link */}
    <div className='my-5 text-center text-sm text-gray-600 italic'>
      Don't have an account?{' '}
      <Link 
        to="/register" 
        state={{ from: location.state?.from }}
        className='text-red-600 font-medium underline hover:text-red-700'
      >
        Register here.
      </Link>
    </div>

    {/* Google Sign-In Button */}
    <button
      onClick={handleGooglesignin}
      className='w-full mt-3 bg-white border border-red-500 hover:bg-red-50 text-red-600 font-medium py-3 rounded-full flex items-center justify-center shadow transition duration-300'
    >
      <span className='mr-2'>🔵</span> Sign in with Google
    </button>

  </div>
</section>

    );
}

export default Login;
