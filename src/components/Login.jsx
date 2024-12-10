import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../redux/features/auth/authapi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
// import { useDispatch } from "react-redux";
// import User from "../../../backend/src/user/user.model";


const Login = () => {
    const [message,setMessage]=useState('')
    const { register, handleSubmit,  formState: { errors } } = useForm();

// authApi functionality applly//
 const [  loginUser,{isLoading,error}]=useLoginUserMutation();

 const navigate =  useNavigate();
 const dispatch=  useDispatch()

    const onSubmit = async(data) => {
        // console.log(data);
        // const response = await loginUser(data).unwrap();
        //     console.log(response);
        try {
            const response = await loginUser(data).unwrap();
            // console.log(response.token);
            const {token, user} = response;
          
            // const {token, user} = response;
            // eslint-disable-next-line no-undef
            dispatch(setUser({user}))
            alert("Login successful!")
            navigate('/')
        } catch (error) {
            console.error("Login error:", error);
            setMessage(error?.data?.message || "Invalid email or password");

        }
    }
  
    // console.log(watch("example")); 


    return (
       <section className="h-screen flex items-center justify-center">
       <div className="shadow bg-white p-8 max-w-sm mx-auto p-2">
        <h2 className="text-2xl font-semibold pt-5"> please login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-sm mx-auto pt-6">
            <input 
            {...register("email", { required: true })}
            type="email" placeholder="Email" required className="w-full bg--gray-100 
            focus:outline-none px-5 py-3" />
             {errors.email && <span>email is required</span>}
            <input 
            {...register("password", { required: true })}
            type="password" placeholder="password" required className="w-full bg--gray-100 
            focus:outline-none px-5 py-3" />
          
            {errors.password && <span>password is required</span>}
            {
                message && <p>{message}</p>
            }
            <button className="w-full mt-5 bg-primary hover:bg-primary/95 text-white 
            font-medium py-3 rounded-md">login</button>
        </form>
        <div className="my-5 italic text-sm text-center">
            dont have a accont? <Link to='/register' className=" text-red-700 px-1
            underline cursor-pointer" >Register now </Link>
        </div>
       </div>
       </section>
    );
};

export default Login;






