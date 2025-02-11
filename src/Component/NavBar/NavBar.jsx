import React, { useState } from 'react';
import logo from '../../assets/images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 
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
    <nav className="bg-[#F5F5F5]">
      <div className="w-4/5 flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center justify-between w-full xl:w-auto">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Fresh Cart Logo" />
          </Link>

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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

        <div
          className={`${
            isMenuOpen ? 'max-h-screen' : 'max-h-0'
          } w-full xl:max-h-screen xl:w-auto transition-all duration-300 ease-in-out overflow-hidden`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 xl:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 xl:flex-row xl:space-x-8 rtl:space-x-reverse xl:mt-0 xl:border-0 xl:bg-transparent">
            {token && (
              <>
                <li>
                  <NavLink
                    to="/"
                    className="block py-2 px-3 text-black hover:bg-[#0AAD0A] xl:hover:bg-transparent xl:hover:text-[#0AAD0A] xl:p-0 border-b-2 border-b-transparent hover:border-b-[#0AAD0A] transition-all duration-300"
                    aria-current="page"
                    onClick={closeMenu}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    className="block py-2 px-3 text-black hover:bg-[#0AAD0A] xl:hover:bg-transparent xl:hover:text-[#0AAD0A] xl:p-0 border-b-2 border-b-transparent hover:border-b-[#0AAD0A] transition-all duration-300"
                    onClick={closeMenu}
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    className="block py-2 px-3 text-black hover:bg-[#0AAD0A] xl:hover:bg-transparent xl:hover:text-[#0AAD0A] xl:p-0 border-b-2 border-b-transparent hover:border-b-[#0AAD0A] transition-all duration-300"
                    onClick={closeMenu}
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/categories"
                    className="block py-2 px-3 text-black hover:bg-[#0AAD0A] xl:hover:bg-transparent xl:hover:text-[#0AAD0A] xl:p-0 border-b-2 border-b-transparent hover:border-b-[#0AAD0A] transition-all duration-300"
                    onClick={closeMenu}
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/brands"
                    className="block py-2 px-3 text-black hover:bg-[#0AAD0A] xl:hover:bg-transparent xl:hover:text-[#0AAD0A] xl:p-0 border-b-2 border-b-transparent hover:border-b-[#0AAD0A] transition-all duration-300"
                    onClick={closeMenu}
                  >
                    Brands
                  </NavLink>
                </li>
              </>
            )}

            {!token && (
              <>
                <li className="xl:hidden">
                  <NavLink
                    to="/login"
                    className="block py-2 px-3 text-black hover:bg-[#0AAD0A] xl:hover:bg-transparent xl:hover:text-[#0AAD0A] xl:p-0 border-b-2 border-b-transparent hover:border-b-[#0AAD0A] transition-all duration-300"
                    onClick={closeMenu}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="xl:hidden">
                  <NavLink
                    to="/register"
                    className="block py-2 px-3 text-black hover:bg-[#0AAD0A] xl:hover:bg-transparent xl:hover:text-[#0AAD0A] xl:p-0 border-b-2 border-b-transparent hover:border-b-[#0AAD0A] transition-all duration-300"
                    onClick={closeMenu}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="hidden xl:w-auto xl:flex items-center space-x-4">
          <div className="flex space-x-4">
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
          </div>

          <div className="flex space-x-4 text-black">
            {token && (
              <button
                onClick={handleLogout}
                className="text-black hover:text-[#971400] border-b-2 border-b-transparent hover:border-b-[#971400] transition-all duration-300"
              >
                Sign Out
              </button>
            )}

            {!token && (
              <>
                <Link
                  to="/login"
                  className="text-black hover:text-[#0AAD0A] border-b-2 border-b-transparent hover:border-b-[#0AAD0A] transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-black hover:text-[#0AAD0A] border-b-2 border-b-transparent hover:border-b-[#0AAD0A] transition-all duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}