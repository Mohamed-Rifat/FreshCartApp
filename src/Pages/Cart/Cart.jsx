import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext/CartContext.jsx';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loader from '../../Component/Loader/Loader.jsx';
import emptyCart from '../../assets/Images/Empty-cart.svg';
import Modal from 'react-modal';
import { RiCloseLargeLine } from "react-icons/ri";

Modal.setAppElement('#root'); 

export default function Cart() {
  let { getCart, removeFromCart, updateCartQuantity } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  let navigate = useNavigate();

  function getOut() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  async function fetchCart() {
    setIsLoading(true);
    let res = await getCart();
    if (res?.status === 'success') {
      setCartDetails(res.data);
    } else {
      if (res?.message === 'Expired Token. please login again') {
        getOut();
      }
    }
    setIsLoading(false);
  }

  async function deleteItem(productId) {
    let res = await removeFromCart(productId);
    if (res?.status === 'success') {
      setCartDetails(res.data);
      toast.success("Item removed successfully! 🗑️✅", { duration: 3000 });
    } else {
      res?.message === 'Expired Token. please login again' ? getOut() : toast.error("Failed to remove item");
    }
  }

  async function clearCart() {
    setIsLoading(true);
    for (let product of cartDetails.products) {
      await removeFromCart(product.product._id);
    }
    setCartDetails({ products: [], totalCartPrice: 0 });
    toast.success("All items have been removed from the cart! 🛒❌", { duration: 3000 });
    setIsLoading(false);
  }

  async function updateCartProduct(id, count) {
    if (count < 1) {
      await deleteItem(id);
      return;
    }
    try {
      const data = await updateCartQuantity(id, count);
      if (data.status === 'success') {
        const updatedProducts = cartDetails.products.map((product) => {
          if (product.product._id === id) {
            return { ...product, count: count };
          }
          return product;
        });

        const newTotalCartPrice = updatedProducts.reduce((total, product) => {
          return total + product.price * product.count;
        }, 0);

        setCartDetails({ ...cartDetails, products: updatedProducts, totalCartPrice: newTotalCartPrice });
        toast.success("Item count updated", { duration: 3000 });
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      toast.error("Failed to update item count");
    }
  }

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Cart Details</title>
      </Helmet>
      {cartDetails && cartDetails.products?.length > 0 ? (
        <div className="w-4/5 mx-auto bg-white p-6 my-4 rounded-lg shadow-lg relative">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Shopping Cart</h3>
              <h6 className="text-main font-medium text-lg">Total Cart Price: {cartDetails.totalCartPrice} EGP</h6>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300">
                <Link to={'/checkout'} className="flex items-center text-white">
                  Checkout
                  <i className="fa-solid fa-basket-shopping fa-lg ms-2"></i>
                </Link>
              </button>
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Clear Cart
                <i className="fa-regular fa-trash-can fa-lg ml-2"></i>
              </button>
            </div>
          </div>

          {cartDetails.products.map((product) => (
            <div key={product.product._id} className="flex flex-wrap items-center border-b py-4 my-3">
              <div onClick={() => openModal(product.product)} className="w-20 cursor-pointer">
                <img src={product.product.imageCover} className="w-full rounded-lg shadow-md" alt="product" />
              </div>
              <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:items-start px-4">
                <div>
                  <div onClick={() => openModal(product.product)} className="text-lg font-medium text-gray-800 hover:text-main transition duration-300 cursor-pointer">
                    {product.product.title}
                  </div>
                  <h6 className="text-main font-semibold">Price: {product.price} EGP</h6>
                  <button onClick={() => deleteItem(product.product._id)} className="text-red-500 hover:text-red-600 flex items-center transition duration-300">
                    <i className="fa-regular fa-trash-can mr-1"></i> Remove
                  </button>
                </div>
                <div className="flex items-center">
                  <button onClick={() => updateCartProduct(product.product._id, product.count + 1)} className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-100 transition duration-300">+</button>
                  <span className="mx-3 text-lg font-medium">{product.count}</span>
                  <button
                    onClick={() => updateCartProduct(product.product._id, product.count - 1)}
                    className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-100 transition duration-300">-</button>
                </div>
              </div>
            </div>
          ))}

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative"
          >
            <button className="absolute top-2 right-2 text-gray-600 text-xl" onClick={closeModal}>
              <RiCloseLargeLine />
            </button>
            {selectedProduct && (
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div>
                  <img src={selectedProduct.imageCover} alt={selectedProduct.title} className="w-full md:w-1/2 rounded-lg shadow-md border" />
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold mb-3 text-gray-900">{selectedProduct.title}</h2>
                  <p className="text-gray-600 mb-4 text-lg">{selectedProduct.description}</p>
                  <p className="text-xl font-semibold text-green-600">Price: {selectedProduct.price} EGP</p>
                  <button 
                    className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md" 
                    onClick={() => handleAddToCart(selectedProduct.id)}
                  >
                    Add to Cart 
                  </button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      ) : (
        <div className="flex flex-col items-center my-10">
          <img className="w-1/2 max-w-md" src={emptyCart} alt="Empty Cart" />
          <h3 className="text-2xl font-bold text-gray-800 mt-4">Your cart is empty</h3>
          <Link to="/" className="mt-4 bg-main text-white py-2 px-4 rounded-lg hover:bg-main-dark transition duration-300">
            Continue Shopping
          </Link>
        </div>
      )}
    </>
  );
}