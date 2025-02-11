import React from 'react';
import amazonPay from './../../assets/images/amazon-pay.webp';
import americanExpress from './../../assets/images/png-clipart-american-express.png';
import masterCard from './../../assets/images/MasterCard_Logo.svg.png';
import payPal from './../../assets/images/PayPal.png';
import appStore from './../../assets/Images/App-store.png';
import googlePlay from './../../assets/images/Google-play.webp';
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full bg-[#F5F5F5]">
      <div className="w-11/12 md:w-4/5 mx-auto">
        <div className="p-4 md:p-8 w-full mx-auto">
          <h1 className="text-xl md:text-2xl font-bold mb-2">Get the FreshCart App</h1>
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-8 border-b border-gray-300 p-4">
            <input
              type="email"
              placeholder="Email ..."
              className="w-full md:w-4/5 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full md:w-1/5 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">
              Share App Link
            </button>
          </div>
          <div className="my-6 flex flex-col md:flex-row justify-between gap-8">
            <div className="flex flex-col xl:flex-row items-center md:items-start lg:gap-4">
              <h2 className="text-lg font-semibold mb-2 md:mb-0">Payment Partners</h2>
              <div className="flex flex-wrap gap-4">
                <img src={amazonPay} alt="amazonpay" className="h-8 md:h-10" />
                <img src={americanExpress} alt="americanExpress" className="h-8 md:h-10" />
                <img src={masterCard} alt="masterCard" className="h-8 md:h-10" />
                <img src={payPal} alt="payPal" className="h-8 md:h-10" />
              </div>
            </div>
            <div className="flex flex-col xl:flex-row items-center xl:items-start gap-4">
              <h2 className="text-lg font-semibold mb-2 xl:mb-0">Get deliveries with FreshCart</h2>
              <div className="flex gap-4">
                <a href="https://www.apple.com/eg-ar/app-store/" target="_blank" rel="noopener noreferrer">
                  <img src={appStore} alt="App Store" className="h-8 xl:h-10" />
                </a>
                <a href="https://play.google.com/store/games?device=windows" target="_blank" rel="noopener noreferrer">
                  <img src={googlePlay} alt="Google Play" className="h-8 xl:h-10" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center text-lg border-t border-gray-300 pt-4">
          <p>Copyright © {currentYear} By <span className='text-xl bg-gradient-to-r from-[#00C9FF] to-[#0ed122] bg-clip-text text-transparent'>Mohamed Refaat</span></p>
        </div>
        </div>
      </div>
    </div>
  );
}
