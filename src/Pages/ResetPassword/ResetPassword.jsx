import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); 

  
  const queryParams = new URLSearchParams(location.search);
  const emailFromVerifyResetCode = queryParams.get('email');

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must have special characters, capital letters, small letters, numbers, and min 8 characters'
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: emailFromVerifyResetCode || '', 
      newPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setMessage(null);

      try {
        const response = await axios.put(
          'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
          values
        );

        if (response.status === 200) {
          setMessage('Password reset successfully.');
          navigate('/login');
        }
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage('An unexpected error occurred. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-20 lg:py-0">
        <div className="w-full bg-slate-400 bg-opacity-20 p-6 rounded-lg shadow-lg md:mt-0 sm:max-w-xl xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="mb-8 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Reset Password
            </h1>
            <form onSubmit={formik.handleSubmit}>
              {message && (
                <div className="text-green-500 text-sm mb-4">{message}</div>
              )}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={emailFromVerifyResetCode || ''}
                  disabled
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                />
                <label
                  htmlFor="newPassword"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  New Password
                </label>
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.newPassword}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full my-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200 flex items-center justify-center"
                disabled={isLoading}
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
                  'Reset Password'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}