import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Loader from "../../Component/Loader/Loader";
import { toast } from 'react-hot-toast';
import { CartContext } from "../../context/CartContext/CartContext";

const StyledButton = styled.button`
  position: relative;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: hsl(255deg 50% 40%);
  font-family: "Inter", sans-serif;
  width: 100%;
  margin-top: 5px;

  .default-btn, .hover-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    transition: all 0.3s ease;
    background: linear-gradient(to right, #00C9FF, #0ed122);
    color: white;
  }

  .hover-btn {
    position: absolute;
    inset: 0;
    transform: translateY(100%);
  }

  &:hover .default-btn {
    transform: translateY(-100%);
  }

  &:hover .hover-btn {
    transform: translateY(0%);
  }
`;

const LearnMoreButton = styled.button`
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  width: 100%;
  margin-top: 10px;
  text-align: left;
  height: 2.5rem; 

  .circle {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: relative;
    display: block;
    width: 2.5rem; 
    height: 2.5rem; 
    background: linear-gradient(to right, #00C9FF, #0ed122);
    border-radius: 4px;
  }

  .circle .icon.arrow {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1rem; 
    height: 0.125rem;
    background: none;
  }

  .circle .icon.arrow::before {
    position: absolute;
    content: "";
    top: -0.25rem; 
    right: 0.05rem; 
    width: 0.5rem; 
    height: 0.5rem; 
    border-top: 0.125rem solid #fff;
    border-right: 0.125rem solid #fff;
    transform: rotate(45deg);
  }

  .button-text {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 50%;
    left: 3rem; 
    transform: translateY(-50%);
    color: transparent;
    font-weight: 400;
    text-align: left; 
    text-transform: uppercase;
    opacity: 0;
    width: auto;
    white-space: nowrap;
    font-size: 0.9rem; 
  }

  &:hover .circle {
    width: 100%;
  }

  &:hover .button-text {
    color: #fff;
    opacity: 1;
  }

  &:hover .icon.arrow {
    left: 10%;
  }
`;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wishlist')) || {};
    } catch {
      return {};
    }
  });
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const toastShown = useRef(false);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (event, product) => {
    event.stopPropagation();
    
    setWishlist((prev) => {
      const updatedWishlist = { ...prev };
      let message = "";
      
      if (updatedWishlist[product.id]) {
        delete updatedWishlist[product.id];
        message = "The product has been removed from favorites! 💔😢";
      } else {
        updatedWishlist[product.id] = product;
        message = "The product has been added to favorites! ❤️😊";
      }
     
      if (!toastShown.current) {
        toast.success(message, { duration: 3000 });
        toastShown.current = true;
      }
  
      return updatedWishlist;
    });

    setTimeout(() => {
      toastShown.current = false;
    }, 3000);
  };

  const handleAddToCart = (productId) => {
    addToCart(productId); 
    toast.success('Product added to cart successfully!', { duration: 3000 });
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        setProducts(res.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="w-4/5 mx-auto cursor-pointer my-10">
      <h2 className="text-2xl font-bold text-center mb-6">Products</h2>
      {loading ? (
        <Loader />
      ) : products.length > 0 ? (
        <div className="flex flex-wrap">
          {products.map((product) => (
            <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
              <div className="border rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 relative hover:shadow-2xl hover:scale-105 hover:-translate-y-1">
                <button
                  onClick={(event) => toggleWishlist(event, product)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white rounded-full p-2 shadow-md"
                >
                  {wishlist[product.id] ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500" />}
                </button>
                <img src={product.imageCover} alt={product.title} className="w-full h-48 object-cover" />
                <small className="ps-3 block mt-2 text-gray-500">{product.category?.name}</small>
                <h3 className="ps-3 text-lg font-semibold truncate">{product.title}</h3>
                <div className="px-3 flex justify-between items-center">
                  <p className="text-gray-600">{product.price} EGP</p>
                  <div className="flex items-center">
                    <p className="text-gray-600 me-2">{product.ratingsAverage}</p>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className={`text-sm ${star <= Math.round(product.ratingsAverage)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="px-3 pb-2 justify-between">
                  <LearnMoreButton onClick={() => navigate(`/product/${product.id}`)}>
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow" />
                    </span>
                    <span className="button-text">Learn More</span>
                  </LearnMoreButton>
                  <StyledButton onClick={() => handleAddToCart(product.id)}>
                    <div className="default-btn">
                      <span>Add to Cart</span>
                    </div>
                    <div className="hover-btn">
                      <span>{product.price} EGP</span>
                    </div>
                  </StyledButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg font-semibold text-red-500">No products found</p>
      )}
    </div>
  );
}