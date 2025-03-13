import React, { useEffect, useState } from 'react';
import 'animate.css';
import Loader from '../../Component/Loader/Loader';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ecommerce.routemisr.com/api/v1/brands')
      .then(response => response.json())
      .then(data => {
        setBrands(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
     <Loader/>
    );
  }

  return (
    <div className="w-4/5 mx-auto py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 animate__animated animate__fadeInDown">
        Our Brands
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand, index) => (
          <div
            key={brand._id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-500 transform hover:-translate-y-2 animate__animated animate__fadeInUp"
            style={{ animationDelay: `${index * 0.2}s` }} 
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-24 h-24 mx-auto rounded-full object-contain transition-transform duration-300 hover:scale-110"
            />
            <p className="text-center text-lg font-semibold text-gray-700 mt-4">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
