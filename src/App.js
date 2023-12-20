import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Main from './Components/Main/Main';
import { useState } from 'react';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Wallet from './Components/Wallet/Wallet';
import PaymentOrders from './Components/PaymentOrders/PaymentOrders';
import Companies from './Components/Companies/Companies';
import APIs from './Components/APIs/APIs';
import VerifyUser from './Components/VerifyUser/VerifyUser';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword.jsx';
import UsersListAdmin from './Components/UsersListAdmin/UsersListAdmin';
import LayoutAdmin from './Components/LayoutAdmin/LayoutAdmin';
import CompaniesAdmin from './Components/CompaniesAdmin/CompaniesAdmin';
import ShipmentsAdmin from './Components/ShipmentsAdmin/ShipmentsAdmin';
import CreateAccountMarketer from './Components/CreateAccountMarketer/CreateAccountMarketer.jsx';
import AdminMarketers from './Components/AdminMarketers/AdminMarketers.jsx';
import LayoutMarketers from './Components/LayoutMarketers/LayoutMarketers.jsx';
import MarketerLogin from './Components/MarketerLogin/MarketerLogin.jsx';
import MarketerShipments from './Components/MarketerShipments/MarketerShipments.jsx';
import MarketerConfirmedOrders from './Components/MarketerConfirmedOrders/MarketerConfirmedOrders.jsx';


function App() {
  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      saveUserData();
    }
  },[])

  const [userData, setuserData] = useState(null)

  async function saveUserData(){
    let encodedToken =localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setuserData(decodedToken)
    console.log(userData)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.alert('الجلسة انتهت..قم بتسجيل الدخول مرة اخرى');
      localStorage.removeItem('userToken');
      setuserData(null);
      window.location.href = '/';
    }, 60 * 60 * 1000); 

    return () => clearTimeout(timeout);
  }, [userData]);

  let routers =createBrowserRouter([
    {index:true,element:<Login saveUserData={saveUserData} setuserData={setuserData} userData={userData}/>},
    // {index:true,element:<Login/>},
    // {path:'signUp',element:<SignUp setuserData={setuserData} userData={userData} />},
    {path:'signUp',element:<SignUp/>},
    {path:'verifyUser',element:<VerifyUser/>},
    {path:'forgetPassword',element:<ForgetPassword/>},
    {path:'updatePassword/:x',element:<UpdatePassword/>},
    {path:'marketerLogin',element: <MarketerLogin saveUserData={saveUserData} setuserData={setuserData} userData={userData}/>},

    
    {path:'/',element:<Layout setuserData={setuserData} userData={userData}/> ,children:[
        {path:'main',element:<Main/>},
        {path:'wallet',element:<Wallet/>},
        {path:'paymentOrders',element:<PaymentOrders/>},
        {path:'companies',element:<Companies/>},
        {path:'apis',element:<APIs/>},
      ]},
      {path:'/',element:<LayoutAdmin setuserData={setuserData} userData={userData}/> ,children:[
        // {path:'companiesAdmin',element:<ErrorBoundary><CompaniesAdmin userData={userData}/></ErrorBoundary>},
        {path:'userListAdmin',element: <UsersListAdmin userData={userData}/>},
        {path:'companiesAdmin',element: <CompaniesAdmin userData={userData}/>},
        {path:'shipmentsAdmin',element: <ShipmentsAdmin userData={userData}/>},
        {path:'createAccountMarketer',element: <CreateAccountMarketer userData={userData}/>},
        {path:'adminMarketers',element: <AdminMarketers userData={userData}/>},
      ]},
      {path:'/',element:<LayoutMarketers setuserData={setuserData} userData={userData}/> ,children:[
        {path:'marketerShipments',element: <MarketerShipments userData={userData}/>},
        {path:'marketerConfirmedOrders',element: <MarketerConfirmedOrders userData={userData}/>},
      ]},
  ])
  return (
    <> 
            <RouterProvider router={routers} />
    </>
  );
}

export default App;
