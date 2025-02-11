import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { Helmet } from 'react-helmet';
const Home = () => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/login');
    }
    const token = localStorage.getItem('token');
    if (token) {
        return (
            <>
                <Helmet>
                    <title>Fresh Cart</title>
                </Helmet>
                <div className="flex justify-center items-center h-[60vh] text-white text-center p-5 bg-cover bg-center">
                    <div className="max-w-2xl">
                        <h1 className="text-6xl font-bold mb-5 animate-fade-in-down-slow bg-gradient-to-r from-[#00C9FF] to-[#0ed122] bg-clip-text text-transparent">
                            Welcome Back to Fresh Cart
                        </h1>
                        <p className="text-gray-700 text-3xl mb-8 animate-fade-in-up-slow bg-gradient-to-r from-[#0ed122] to-[#00C9FF] bg-clip-text text-transparent">
                            Enjoy your shopping experience with exclusive offers!
                        </p>
                        <button
                            onClick={() => navigate('/ProductsHome')}
                            className="bg-gradient-to-r from-[#00C9FF] to-[#0ed122] text-white border-none py-4 px-8 text-lg rounded-full cursor-pointer transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-[#0ed122] hover:to-[#00C9FF] animate-pulse-slow">
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <Helmet>
                <title>Fresh Cart</title>
            </Helmet>
            <div className="flex justify-center items-center h-[60vh] text-white text-center p-5 bg-cover bg-center" >
                <div className="max-w-2xl">
                    <h1 className="text-6xl font-bold mb-5 animate-slide-in bg-gradient-to-r from-[#00C9FF] to-[#0ed122] bg-clip-text text-transparent">
                        Welcome To Fresh Cart
                    </h1>
                    <p className="text-black text-3xl mb-8 animate-fade-in bg-gradient-to-r from-[#00C9FF] to-[#0ed122]  bg-clip-text text-transparent">
                        Shop easily and get the best products at competitive prices
                    </p>
                    <button
                        onClick={handleButtonClick}
                        className="bg-[#5bed5b] text-black border-none py-4 px-8 text-lg rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gradient-to-r from-[#00C9FF] to-[#0ed122] animate-bounce">
                        Start Shopping Now
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;