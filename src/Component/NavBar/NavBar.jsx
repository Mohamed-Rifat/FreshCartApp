import React, { useContext, useState } from 'react';
import logo from '../../assets/Images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHeart, FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import './NavBar.css';
import { CartContext } from '../../context/CartContext/CartContext';
import { FaCartArrowDown } from "react-icons/fa6";
import { RiHeart2Fill } from "react-icons/ri";
import 'animate.css';
import { TiWarningOutline } from "react-icons/ti";
import toast from 'react-hot-toast';

const LogoutButton = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="Btn" onClick={() => setOpen(true)}>
        <div className="sign">
          <svg viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
        </div>
        <div className="text">Logout</div>
      </button>

      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full animate__animated animate__shakeX"
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex flex-wrap items-center'><TiWarningOutline className='text-5xl text-yellow-400' />
              <h2 className="text-3xl font-bold text-red-600">Warning</h2></div>
            <p className="text-gray-700 mt-2">Are you about to log out? Are you sure?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setOpen(false)}
              >
                Back
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => {
                  onLogout();
                  toast.success("Goodbye! 👋", { duration: 3000 });
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [favoritesCount, setFavoritesCount] = useState(0);
  const { cartItems } = useContext(CartContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };


  return (
    <nav className='bg-[#F5F5F5] text-black fixed top-0 left-0 right-0 z-50 '>
      <div className="w-4/5 flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Fresh Cart Logo" />
          </Link>

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <div className={`${isMenuOpen ? 'max-h-screen' : 'max-h-0'} w-full lg:max-h-screen lg:w-auto transition-all duration-300 ease-in-out overflow-hidden`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-2 lg:items-center rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-transparent">
            {token ? (
              <>
                <li><NavLink to="/" className="block py-2 px-3 hover:text-[#0AAD0A]" onClick={closeMenu}>Home</NavLink></li>
                <li><NavLink to="/cart" className="block py-2 px-3 hover:text-[#0AAD0A]" onClick={closeMenu}>Cart</NavLink></li>
                <li><NavLink to="/products" className="block py-2 px-3 hover:text-[#0AAD0A]" onClick={closeMenu}>Products</NavLink></li>
                <li><NavLink to="/categories" className="block py-2 px-3 hover:text-[#0AAD0A]" onClick={closeMenu}>Categories</NavLink></li>
                <li><NavLink to="/brands" className="block py-2 px-3 hover:text-[#0AAD0A]" onClick={closeMenu}>Brands</NavLink></li>
                <div className="flex space-x-4 items-center ps-4 justify-between lg:hidden">
                  <Link to="/favorites" className="relative text-xl hover:text-red-600">
                    <FaHeart />
                    {favoritesCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">{favoritesCount}</span>
                    )}
                  </Link>
                  <Link to="/cart" className="relative text-xl hover:text-[#0AAD0A] group">
                    <FaCartArrowDown />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-4 -right-3 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                  <li><LogoutButton onLogout={handleLogout} /></li>
                </div>
              </>
            ) : (
              <>
                <li><NavLink to="/login" className="block py-2 px-3 lg:py-0 lg:px-1 hover:text-[#0AAD0A]">Login</NavLink></li>
                <li><NavLink to="/register" className="block py-2 px-3 lg:py-0 lg:px-1 hover:text-[#0AAD0A]">Register</NavLink></li>
                <li className="flex space-x-4 m-4 mx-auto">
                  <a href="https://web.facebook.com/" target="_blank" className="hover:text-blue-800 text-xl">
                    <FaFacebook />
                  </a>
                  <a href="https://www.instagram.com/" target="_blank" className="hover:text-[#C308A1] text-xl">
                    <FaInstagram />
                  </a>
                  <a href="https://www.tiktok.com/" target="_blank" className="hover:text-neutral-700 text-xl">
                    <FaTiktok />
                  </a>
                  <a href="https://x.com/" target="_blank" className="hover:text-blue-500 text-xl">
                    <FaTwitter />
                  </a>
                  <a href="https://www.linkedin.com/" target="_blank" className="hover:text-blue-900 text-xl">
                    <FaLinkedin />
                  </a>
                  <a href="https://www.youtube.com/" target="_blank" className="hover:text-red-700 text-xl">
                    <FaYoutube />
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        {token && (
          <div className="hidden lg:w-auto lg:flex items-center">
            <div className="flex space-x-4">
              <Link to="/favorites" className="relative text-xl hover:text-red-600">
                <RiHeart2Fill />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">{favoritesCount}</span>
                )}
              </Link>
              <Link to="/cart" className="relative text-xl hover:text-[#0AAD0A] group">
                <FaCartArrowDown />
                {cartItems.length > 0 && (
                  <span className="absolute -top-4 -right-3 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
            <LogoutButton onLogout={handleLogout} />
          </div>
        )}
      </div>
    </nav>
  );
}