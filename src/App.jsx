import { Offline } from 'react-detect-offline';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MdOutlineWifiOff } from 'react-icons/md';
import { Toaster } from 'react-hot-toast';
import { TokenProvider } from './context/TokenContext/TokenContext';
import { CartProvider } from './context/CartContext/CartContext';
import WishlistProvider from './context/WishListContext/WishListContext';
import MainLayout from './Pages/MainLayout/MainLayout';
import Home from './Pages/Home/Home';
import NotFounded from './Pages/NotFounded/NotFounded';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Cart from './Pages/Cart/Cart';
import Products from './Pages/Products/Products';
import Categories from './Pages/Categories/Categories';
import Brandes from './Pages/Brands/Brands';
import TermsAndConditions from './Pages/TermsAndConditions/TermsAndConditions';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import VerifyResetCode from './Pages/VerifyResetCode/VerifyResetCode';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import ProductsHome from './Pages/ProductsHome/ProductsHome';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import WishlistPage from './Pages/WishList/WishList';
import CheckOut from './Pages/CheckOut/CheckOut';
import AllOrders from './Pages/Allorders/Allorders';
import ProtectedRoutes from './Component/ProtectedRoutes/ProtectedRoutes';


const routes = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
      { path: "products", element: <ProtectedRoutes><Products /></ProtectedRoutes> },
      { path: "categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
      { path: "brands" , element: <ProtectedRoutes><Brandes/></ProtectedRoutes>},
      { path: "TermsAndConditions", element: <TermsAndConditions /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verify-reset-code", element: <VerifyResetCode /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "ProductsHome", element: <ProtectedRoutes><ProductsHome /></ProtectedRoutes> },
      { path: "product/:id", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
      { path: "favorites", element: <ProtectedRoutes><WishlistPage /></ProtectedRoutes> },
      { path: "checkout", element: <ProtectedRoutes><CheckOut /></ProtectedRoutes> },
      { path: "allorders", element: <ProtectedRoutes><AllOrders /></ProtectedRoutes> },
      { path: "account/cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
      { path: "*", element: <NotFounded /> }
    ]
  }
]);

export default function App() {
  return (
    <>
      <Offline>
        <div className='offline flex items-center p-3 bg-red-500 text-white text-center'>
          Oops... You are offline. Check your connection <MdOutlineWifiOff className='ms-2' />
        </div>
      </Offline>

      <Toaster position="bottom-left" toastOptions={{ duration: 3000,style: {background: '#333',color: '#fff',},}}/>

      <TokenProvider>
        <CartProvider>
          <WishlistProvider>
              <RouterProvider router={routes} />
          </WishlistProvider>
        </CartProvider>
      </TokenProvider>
    </>
  );
}