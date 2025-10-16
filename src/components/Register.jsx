import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useRegisterUserMutation } from '../redux/features/auth/authapi';

const Register = () => {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { emailOrMobile, username, password } = data;

    // Validate email or mobile
    const isEmail = /\S+@\S+\.\S+/.test(emailOrMobile);
    const isMobile = /^[0-9]{10,15}$/.test(emailOrMobile);

    if (!isEmail && !isMobile) {
      setMessage("Please enter a valid email or mobile number.");
      return;
    }

    // ✅ Prepare payload for backend
    const payload = {
      username,
      password,
      ...(isEmail ? { email: emailOrMobile } : { mobile: emailOrMobile }),
    };

    try {
      // ✅ Use payload, not data
      await registerUser(payload).unwrap();
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setMessage("Registration failed! Please try again.");
    }
  };

  return (
    <section className='h-screen flex items-center justify-center p-2'>
      <div className='shadow bg-white p-8 max-w-sm mx-auto rounded-xl'>
        <h2 className='text-2xl font-semibold text-center pt-5'>Please Register!</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 max-w-sm mx-auto pt-6'>
          {/* Username */}
          <input
            {...register("username", { required: true })}
            type="text"
            placeholder='Username'
            className='w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md'
          />
          {errors.username && <p className='text-red-500 text-sm'>Username is required</p>}

          {/* Email or Mobile */}
          <input
            {...register("emailOrMobile", { required: true })}
            type="text"
            placeholder='Email or Mobile number'
            className='w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md'
          />
          {errors.emailOrMobile && <p className='text-red-500 text-sm'>Email or Mobile number is required</p>}

          {/* Password */}
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder='Password'
            className='w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md'
          />
          {errors.password && <p className='text-red-500 text-sm'>Password is required</p>}

          {/* Error Message */}
          {message && <p className='text-red-500 text-sm text-center'>{message}</p>}

          <button
            type="submit"
            className='w-full mt-4 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-md'
          >
            Register
          </button>
        </form>

        <div className='my-5 italic text-sm text-center'>
          Have an account? Please{" "}
          <Link to="/login" className='text-red-700 underline cursor-pointer'>
            Login
          </Link>{" "}
          here.
        </div>
      </div>
    </section>
  );
};

export default Register;
