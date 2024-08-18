import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../Store/AuthSlice';
import { Button, Input, Logo } from './index';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const status = useSelector((state) => state.auth.status);
  
  useEffect(() => {
    console.log("Status updated:", status);
  }, [status]);

  const login = async (data) => {
    setError("");
    setLoading(true); // Start loading
    try {
      console.log("Attempting login...");
      const session = await authService.login(data);
      console.log("Session:", session);
      if (session) {
        console.log("Login successful, fetching user data...");
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) {
          dispatch(authLogin(userData));
          console.log("Status after login:", status);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='mx-auto w-full max-w-lg m-10 bg-red-100 rounded-xl p-10 border border-black/10'>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be a valid address"
                }
              })}
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: "Password is required"
              })}
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            <Button
  type="submit"
  className="w-full"
  disabled={loading} // Disable button when loading
>
  {loading ? ( // Show loading spinner if loading
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin h-5 w-5 mr-3 text-black " // Add your desired color class here
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
        />
      </svg>
      Signing in...
    </div>
  ) : (
    "Sign in"
  )}
</Button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
