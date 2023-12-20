import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import NavMarketers from '../NavMarketers/NavMarketers';

export default function LayoutMarketers({userData,setuserData}) {
    let navigate= useNavigate();
    function logout(){
      localStorage.removeItem('userToken');
      setuserData(null);
      navigate('/marketerLogin')
    }
    return (
      <>
      <NavMarketers userData={userData} logout={logout}/>
      <Outlet></Outlet>
      <Footer/>  
      </>
    )
}
