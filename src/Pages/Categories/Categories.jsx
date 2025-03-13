import { useEffect, useState } from "react";
import 'animate.css';
import Loader from '../../Component/Loader/Loader.jsx';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
        setLoading(false);
        setTimeout(() => {
          setShowAnimation(true);
        }, 100);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-4/5 mx-auto py-8">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800 animate__animated animate__fadeInDown">
        Our Categories
      </h1>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${showAnimation ? 'animate__animated animate__fadeIn' : ''}`}>
        {categories.map((category, index) => (
          <div
            key={category._id}
            className={`relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 ${
              index % 5 === 0 ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
            } animate__animated animate__fadeInUp`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-contain transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-500 ease-in-out flex items-end justify-center p-6">
              <p className="text-white text-2xl font-bold text-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                {category.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
