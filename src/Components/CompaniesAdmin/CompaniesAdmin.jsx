import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import glt from '../../assets/glt.jpg'
import imile from '../../assets/imile.jpg'
import sae from '../../assets/sae.jpg'
import sms from '../../assets/sms.jpg'
import spl from '../../assets/spl.jpg'
import armx from '../../assets/armx.jpg'
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom'
import Joi from 'joi'

export default function CompaniesAdmin() {
    useEffect(()=>{
        getAdmincompanies()
      },[])
    
          
          const [companies,setCompanies]=useState('')
          async function getAdmincompanies() {
            try {
              const response = await axios.get('https://dashboard.go-tex.net/eg-co-test/company',
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
              });
              console.log(response)
              setCompanies(response.data.data)
            } catch (error) {
              console.error(error);
            }
          }

          const [errorList, seterrorList]= useState([]); 
          const [Prices,setPrices] =useState({
            userprice :'',
            kgprice :'',
            userCodPrice : '',
          })
          const [error , setError]= useState('')
          const [isLoading, setisLoading] =useState(false)
        
          async function sendPricesToApi() {
            console.log(localStorage.getItem('userToken'))
            try {
              const {data} = await axios.post(`https://dashboard.go-tex.net/eg-co-test/company/edit`, Prices,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
              });
              if (data.msg === 'ok') {
                console.log(data.msg)
                setisLoading(false)
                window.alert("تم التعديل بنجاح");
                getAdmincompanies()
              } else {
                setisLoading(false)
                setError(data.msg)
                console.log(data.msg)
              }
            } catch (error) {
              console.log(error);
              window.alert('wrong');
            }
          }
          
        function submitPricesForm(e){
          e.preventDefault();
          setisLoading(true)
          let validation = validatePricesForm();
          console.log(validation);
          if(validation.error){
            setisLoading(false)
            seterrorList(validation.error.details)
        
          }else{
            sendPricesToApi();
          }
        
        }
        
          function getPrices(e){
            let myPrices={...Prices};
            myPrices[e.target.name]= e.target.value;
            setPrices(myPrices);
            console.log(myPrices);
          }
        
          function validatePricesForm(){
            let scheme= Joi.object({
                userprice:Joi.number().required(),
                kgprice :Joi.number().required(),
                userCodPrice :Joi.number().required(),
        
            });
            return scheme.validate(Prices, {abortEarly:false});
          }
          useEffect(()=>{
            getCompaniesDetailsOrders()
          },[])
          const [companiesDetails,setCompaniesDetails]=useState([])
          async function getCompaniesDetailsOrders() {
            try {
              const response = await axios.get('https://dashboard.go-tex.net/eg-co-test/company');
              const companiesPrices = response.data.data;
              console.log(companiesPrices)
              setCompaniesDetails(companiesPrices)
              setPrices({
                ...Prices,
                userprice:companiesPrices.userprice,
                kgprice:companiesPrices.kgprice,
                userCodPrice:companiesPrices.codprice,
              });
            } catch (error) {
              console.error(error);
            }
          }
  return (
    <>
    <div className='paddingCompanies p-3' id='content'>
      <div className="container">
      <div className="gray-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
          <th scope="col">#</th>
          <th scope="col">الشركة</th>            
            <th scope="col">سعر الدفع اونلاين</th>
            {/* <th scope="col">سعر المدخلات</th> */}
            <th scope="col">قيمة الزيادة </th>
            <th scope="col">سعر ال(COD)   </th>
            {/* <th scope="col">أكبر سعر للمسوقين  </th> */}
            {/* <th scope="col">أقل سعر للمسوقين  </th> */}
          </tr>
        </thead>
        <tbody>
          {companies ? (
              <tr>
                <td></td>
                {companies.name?<td>{companies.name}</td>:<td>_</td>}
                {companies.userprice?<td>{companies.userprice}</td>:<td>_</td>}
                {companies.kgprice?<td>{companies.kgprice}</td>:<td>_</td>}
                {companies.codprice?<td>{companies.codprice}</td>:<td>_</td>}
              </tr>
            ): null
          }
        </tbody>
      </table>
     </div>
     <div className=" py-3">
              <div className="edit-form">
                <div className="light-box p-3">
                  <h5 className="text-center mb-3">تعديل السعر  </h5>
                  <form onSubmit={submitPricesForm} action="">
                    <label htmlFor="">سعر الدفع اونلاين</label>
                    <input onChange={getPrices} type="number" value={Prices.userprice} step="0.001" className='my-input my-2 form-control' name='userprice' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='userprice'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                   
                    <label htmlFor="">قيمة الزيادة</label>
                    <input onChange={getPrices} type="number" value={Prices.kgprice} step="0.001" className='my-input my-2 form-control' name='kgprice' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='kgprice'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                    <label htmlFor="">سعر الدفع عند الاستلام</label>
                    <input onChange={getPrices} type="number" value={Prices.userCodPrice} step="0.001" className='my-input my-2 form-control' name='userCodPrice' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='userCodPrice'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                    
<div className="text-center">
                    <button className='btn btn-primary mt-3'>
                    {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'تعديل'}
                   </button>
                   </div>
                  </form>
                </div>
              </div>
            </div>
     </div>
     </div>
    </>
  )
}
