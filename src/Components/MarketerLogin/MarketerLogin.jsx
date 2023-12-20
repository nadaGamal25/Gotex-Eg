import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'

export default function MarketerLogin({saveUserData}) {
  let navigate= useNavigate(); //hoke
  const [errorList, seterrorList]= useState([]); 
  const [theUser,setUser] =useState({
    email:'',
    password:''
  })
  const [visible , setVisible] =useState(false);
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  

 
  async function sendLoginDataToApi(){
    try {
      const {data} = await axios.post('https://dashboard.go-tex.net/eg-co-test/marketer/login', theUser);
      if (data.msg === 'ok') {
        navigate('/marketerShipments');
        localStorage.setItem('userToken', data.token);
        console.log(data.token);
        setisLoading(false);
         saveUserData();
      } else {
        setisLoading(false);
        setError(data.msg);
        console.log(data.msg);
      }
    } catch (error) {
      console.log(error);
      window.alert('كلمة المرور او البريد الالكترونى قد يكون خطأ');
    }
  } 
  

        function submitLoginForm(e) {
          e.preventDefault();
          setisLoading(true);
          let validation = validateLoginForm();
          console.log(validation);
          if (validation.error) {
            setisLoading(false);
            seterrorList(validation.error.details);
          } else {
            
              sendLoginDataToApi();
            
          }
        }

  function getUserData(e){
    let myUser={...theUser};
    myUser[e.target.name]= e.target.value;
    setUser(myUser);
    console.log(myUser);
  }

  function validateLoginForm(){
    let scheme= Joi.object({
      email:Joi.string().email({ tlds: { allow: ['com', 'net','lol'] }}).required(),
      password:Joi.string().required()

    });
    return scheme.validate(theUser, {abortEarly:false});
  }
  return (
    <>

    <div className="d-flex min-vh-100 login-container px-3">
    <div className="login-box m-auto">
        <div className="text-center">
    <img className='m-auto logo' src={logo} alt="logo" />
    </div>
    {error.length >0 ?<div className='alert alert-danger my-2'>{error}</div>:''}
    <form onSubmit={submitLoginForm} className='my-3' action="">
      <label htmlFor="email">البريد الإلكترونى :</label>
      <input onChange={getUserData} type="email" className='my-input my-2 form-control' name='email' id='email' />
      {/* {errorList.filter((err)=> err.context.label == 'email')[0]?
      <div className="alert alert-danger my-2">{errorList.filter((err)=> err.context.label =='email')[0]?.message}</div>:''
      } */}
      {errorList.map((err,index)=>{
      if(err.context.label ==='email'){
        return <div key={index} className="alert alert-danger my-2">الايميل يجب ان يكون بريدا الكتروني صحيح</div>
      }
      
    })}
      <label htmlFor="password">كلمة المرور :</label>
      <div className='pass-box'>
      <input onChange={getUserData} type={visible? "text" :"password"} className='my-input my-2 form-control pass' name='password' id='password' />
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      {visible?<i class="fa-regular fa-eye "></i> : <i class="fa-regular fa-eye-slash "></i> }
      </span>
      {errorList.map((err,index)=>{
      if(err.context.label ==='password'){
        return <div key={index} className="alert alert-danger my-2">كلمة المرور غير صحيحة</div>
      }
      
    })}
    </div>
      <div className="text-center">
      <button className='btn btn-orange'>
      {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'تسجيل الدخول '}
      </button>
      </div>
     </form>
     
     </div>
     </div>
    </>
  )
}
