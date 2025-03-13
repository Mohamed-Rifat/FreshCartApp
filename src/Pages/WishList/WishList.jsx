import React, { useEffect, useState, useContext, useRef } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import { RiCloseLargeLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import whishlistEmpty from './../../assets/Images/whishlist-empty.jpg';
import { CartContext } from '../../context/CartContext/CartContext';

Modal.setAppElement('#root');

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? Object.values(JSON.parse(storedWishlist)) : [];
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const toastShown = useRef(false);

  const handleAddToCart = (productId) => {
    addToCart(productId); 
    toast.success('Product added to cart successfully!', { duration: 3000 });
  };

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(
      wishlistItems.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {})
    ));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const updatedWishlist = prev.filter(item => item.id !== product.id);
      
      if (updatedWishlist.length < prev.length) {
        if (!toastShown.current) {
          toast.success("Product removed from favorites💔😢", { duration: 3000 });
          toastShown.current = true;
        }
      }
  
      localStorage.setItem('wishlist', JSON.stringify(
        updatedWishlist.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {})
      ));
  
      setTimeout(() => {
        toastShown.current = false;
      }, 3000);
  
      return updatedWishlist;
    });
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="w-4/5 mx-auto my-10 rounded-lg shadow-md">
      <div className="flex flex-wrap">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((product) => (
            <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
              <div className="border rounded-lg overflow-hidden shadow-lg relative hover:shadow-xl transition-shadow duration-300">
                <img src={product.imageCover} alt={product.title} className="w-full h-48 object-cover" />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-100 transition-colors duration-300"
                >
                  <FaHeart className="text-red-500" />
                </button>
                <small className="ps-3 block mt-2 text-gray-500">{product.category?.name}</small>
                <h3 className="ps-3 text-lg font-semibold truncate">{product.title}</h3>
                <div className="px-3 pb-2">
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-600 transition-colors duration-300"
                    onClick={() => openModal(product)}
                  >
                    View Product
                  </button>
                  <button 
                    className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-full hover:bg-green-600 transition-colors duration-300"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center my-10">
            <img className="text-center w-1/2" src={whishlistEmpty} alt=''></img>
          </div>
        )}
      </div>

      {selectedProduct && (
        <Modal
          isOpen={!!selectedProduct}
          onRequestClose={closeModal}
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative"
        >
          <button className="absolute top-2 right-2 text-gray-600 text-xl hover:text-gray-800 transition-colors duration-300" onClick={closeModal}><RiCloseLargeLine /></button>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div>
              <img src={selectedProduct.imageCover} alt={selectedProduct.title} className="w-full md:w-1/2 rounded-lg shadow-md border" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-3 text-gray-900">{selectedProduct.title}</h2>
              <p className="text-gray-600 mb-4 text-lg">{selectedProduct.description}</p>
              <p className="text-xl font-semibold text-green-600">Price: {selectedProduct.price} EGP</p>
              <p className="text-yellow-500 font-semibold mt-2 text-lg flex items-center">Rating: {selectedProduct.ratingsAverage} <FaRegStar /></p>
              <button 
                className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors duration-300" 
                onClick={() => handleAddToCart(selectedProduct.id)}
              >
                Add to Cart 
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}