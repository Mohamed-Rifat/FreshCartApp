import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [ErrMsg, setErrMsg] = useState(null);
  const navigate = useNavigate(); 
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must have special characters, capital letters, small letters, numbers, and min 8 characters'
      ),
    rePassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^01[0125][0-9]{8}$/, 'Phone must be a valid Egyptian number'),
    terms: Yup.boolean()
      .required('You must accept the terms and conditions')
      .oneOf([true], 'You must accept the terms and conditions'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
      terms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrMsg(null);
      try {
        const response = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/signup',
          values
        );

        if (response.status === 201) {
          alert('Registration successful!');
          navigate('/login');
        }
      } catch (error) {

        if (error.response) {
          setErrMsg(error.response.data.message);
        } else {
          setErrMsg('An unexpected error occurred. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
  <>
  <Helmet>
    <title>Register</title>
  </Helmet>
    <section>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-20 lg:py-0">
      <div className="w-full bg-slate-400 bg-opacity-20 p-6 rounded-lg shadow-lg md:mt-0 sm:max-w-xl xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 animate__animated animate__bounceInRight">
          <h1 className="mb-8 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl animate-fade-in-down">
            Registration Now
          </h1>
          <form onSubmit={formik.handleSubmit}>
            {ErrMsg && (
              <div className="text-red-500 text-sm mb-4 animate-fade-in">
                {ErrMsg}
              </div>
            )}
            <div className="relative z-0 w-full mb-5 group animate-slide-in-left">
              <input
                type="text"
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Your Name
              </label>
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm animate-fade-in">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group animate-slide-in-right">
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
            <div className="relative z-0 w-full mb-5 group animate-slide-in-left">
              <input
                type="password"
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
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm animate-fade-in">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group animate-slide-in-right">
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
              />
              <label
                htmlFor="rePassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm password
              </label>
              {formik.touched.rePassword && formik.errors.rePassword ? (
                <div className="text-red-500 text-sm animate-fade-in">
                  {formik.errors.rePassword}
                </div>
              ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group animate-slide-in-left">
              <input
                type="tel"
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number (01234567890)
              </label>
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500 text-sm animate-fade-in">
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>
            <div className="flex items-start animate-slide-in-right">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.terms}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">
                  I accept the{' '}
                  <a
                    className="font-medium text-primary-600 hover:underline"
                    href="/TermsAndConditions"
                    target="_blank"
                  >
                    Terms and Conditions
                  </a>
                </label>
                {formik.touched.terms && formik.errors.terms ? (
                  <div className="text-red-500 text-sm animate-fade-in">
                    {formik.errors.terms}
                  </div>
                ) : null}
              </div>
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
                'Submit'
              )}
            </button>
            <label className="font-light text-gray-500 animate-slide-in-up">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:underline"
              >
                Login here
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