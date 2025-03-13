import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { Helmet } from 'react-helmet';
import 'animate.css';
import toast from 'react-hot-toast';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [ErrMsg, setErrMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must have special characters, capital letters, small letters, numbers, and min 8 characters'
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrMsg(null);

      try {
        const response = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/signin',
          values
        );

        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          toast.success(" Welcome  🎉😊", { duration: 3000 });
          navigate('/');
        }
      } catch (error) {
        if (error.response) {
          setErrMsg(error.response.data.message);
          toast.error("Login failed! ❌", { duration: 3000 });
        } else {
          setErrMsg('An unexpected error occurred. Please try again.');
          toast.error("An error occurred during login! ⚠️", { duration: 3000 });
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-20 lg:py-0">
          <div className="w-full bg-slate-400 bg-opacity-20 p-6 rounded-lg shadow-lg md:mt-0 sm:max-w-xl xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 animate__animated animate__bounceInRight">
              <h1 className="mb-8 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl animate-slide-in-down">
                Log In
              </h1>
              <form onSubmit={formik.handleSubmit}>
                {ErrMsg && (
                  <div className="text-red-500 text-sm mb-4 animate-fade-in">
                    {ErrMsg}
                  </div>
                )}
                <div className="relative z-0 w-full mb-5 group animate-slide-in-left">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  <label
                    htmlFor="email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email address
                  </label>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm animate-fade-in">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="relative z-0 w-full mb-5 group animate-slide-in-right">
                  <input
                    type={showPassword ? 'text' : 'password'} 
                    name="password"
                    id="password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <label
                    htmlFor="password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                  <button
                    type="button" 
                    className="absolute right-0 top-3 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    )}
                  </button>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm animate-fade-in">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>

                <div className="flex items-start animate-slide-in-left">
                  <Link
                    to={`/forgot-password?email=${formik.values.email}`}
                    className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Forget Password ?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full my-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200 flex items-center justify-center animate-slide-in-up"
                  disabled={isLoading || !formik.isValid}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2">Loading...</span>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </>
                  ) : (
                    'Log In'
                  )}
                </button>
                <label className="font-light text-gray-500 animate-slide-in-right">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Register Now
                  </Link>
                </label>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}