import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext/CartContext.jsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../Component/Loader/Loader.jsx';

export default function Checkout() {
  const { cartId, createCashOrder, createOnlineOrder } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: Yup.object({
      details: Yup.string().required('Address details are required'),
      phone: Yup.string().matches(/^01[0-9]{9}$/, 'Invalid phone number').required('Phone number is required'),
      city: Yup.string().required('City is required'),
    }),
    onSubmit: async (values) => {
      if (!selectedPayment) {
        toast.error('Please select a payment method');
        return;
      }

      if (!cartId) {
        toast.error('Cart ID is missing. Please try again.');
        return;
      }

      if (!token) {
        toast.error('Authorization token is missing. Please login again.');
        return;
      }

      setIsLoading(true);
      try {
        let response;
        const shippingAddress = values;

        if (selectedPayment === 'Cash') {
          response = await createCashOrder(cartId, shippingAddress, token);
        } else {
          response = await createOnlineOrder(cartId, shippingAddress, token, 'http://localhost:3000');
        }

        setIsLoading(false);

        if (response.status === 'success') {
          if (selectedPayment === 'Online') {
            window.location.href = response.session.url;
          } else {
            toast.success('✅🎉 Order placed successfully!', { duration: 3000 });
            navigate('/allorders');
          }
        } else {
          toast.error(response.message || 'Something went wrong');
        }
      } catch (error) {
        setIsLoading(false);
        toast.error('❌⚠️ Payment failed. Please try again.', { duration: 3000 });
      }
    },
  });

  return (
    <div className="w-4/5 mx-auto bg-white p-6 rounded-lg shadow-md my-10 relative">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Address Details</label>
          <input
            type="text"
            name="details"
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
          />
          {formik.touched.details && formik.errors.details && (
            <p className="text-red-500 text-sm">{formik.errors.details}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm">{formik.errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
          {formik.touched.city && formik.errors.city && (
            <p className="text-red-500 text-sm">{formik.errors.city}</p>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className={`py-2 px-4 rounded-lg ${selectedPayment === 'Cash' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedPayment('Cash')}
          >
            Cash on Delivery
          </button>

          <button
            type="button"
            className={`py-2 px-4 rounded-lg ${selectedPayment === 'Online' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedPayment('Online')}
          >
            Pay Online
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading || !formik.isValid || !formik.dirty}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 disabled:bg-gray-400"
        >
          {isLoading ? 'Processing...' : 'Confirm Payment'}
        </button>
      </form>

      {isLoading && <Loader />}
    </div>
  );
}