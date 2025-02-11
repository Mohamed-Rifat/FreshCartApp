import { Offline } from 'react-detect-offline';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './Pages/MainLayout/MainLayout';
import Home from './Pages/Home/Home';
import NotFounded from './Pages/NotFounded/NotFounded';
import { MdOutlineWifiOff } from 'react-icons/md';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Cart from './Pages/Cart/Cart';
import Products from './Pages/Products/Products';
import Brandes from './Pages/Brands/Brands';
import Categories from './Pages/Categories/Categories';
import TermsAndConditions from './Pages/TermsAndConditions/TermsAndConditions';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import VerifyResetCode from './Pages/VerifyResetCode/VerifyResetCode';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import ProductsHome from './Pages/ProductsHome/ProductsHome';

export default function App() {
  const routes = createBrowserRouter([
    {path:"", element: <MainLayout/>, children:[
      {index : true , element: <Home/>},
      {path: "register" , element:<Register/>},
      {path: "login" , element:<Login/>},
      {path: "cart" , element:<Cart/>},
      {path: "products" , element:<Products/>},
      {path: "categories" , element:<Categories/>},
      {path: "brands" , element:<Brandes/>},
      {path: "TermsAndConditions" , element:<TermsAndConditions/>},
      {path: "forgot-password" , element:<ForgotPassword/>},
      {path: "verify-reset-code" , element:<VerifyResetCode/>},
      {path: "reset-password" , element:<ResetPassword/>},
      {path: "ProductsHome" , element:<ProductsHome/>},
      // {path: "contact" , element:<Contact/>},
      {path: "*" , element:<NotFounded/>}
    ]}]);
  return (
    <> 
    <Offline>
      <div className='offline flex items-center'>
         Oops...you are offline. Check your connection  <MdOutlineWifiOff className='ms-2'/>  
            </div>
    </Offline>
  <RouterProvider router={routes}></RouterProvider></>
  )
}