import React from 'react';
import { Link } from 'react-router-dom'; 

export default function Allorders() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-48">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">The operation was successful!</h2>
        <p className="mt-2 text-gray-600">
          We will contact you soon to confirm the order details. Thank you for your trust in us.
        </p>
        <p className="mt-2 text-gray-600">We hope to see you soon.</p>

      
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Shopping Again
        </Link>
      </div>
    </div>
  );
}