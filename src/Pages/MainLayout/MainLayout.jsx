import React from 'react'
import Navbar from './../../Component/NavBar/NavBar';
import { Outlet } from 'react-router-dom'
import Footer from './../../Component/Footer/Footer';
import freshbg from '../../assets/Images/light-patten.svg'; 

export default function Mainlayout() {
  return (
    <div style={{ backgroundImage: `url(${freshbg})` }}>
       <Navbar/>
       <Outlet/>
       <Footer/>
    </div>
  )
}
