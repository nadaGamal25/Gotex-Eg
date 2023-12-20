import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminMarketers() {
    useEffect(()=>{
        getMarketers()
      },[])
    const [marketers,setMarketers] =useState('')
    async function getMarketers() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/eg-co-test/marketer/get-all-marketer',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const List = response.data.data;
          console.log(List)
          setMarketers(List)
        } catch (error) {
          console.error(error);
        }
      }
  return (
    <>
     <div className='p-5' id='content'>
    {/* <div className="search-box p-4 mt-2 row g-1">
        <div className="col-md-2">
        <button className="btn"><i class="fa-solid fa-magnifying-glass"></i> بحث</button>
        </div>
        <div className="col-md-10">
        <input className='form-control' name="search" onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='الإيميل' />
        </div>
      </div> */}
    <div className="gray-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> الاسم</th>
            {/* <th scope="col">id_المسخدم</th> */}
            <th scope="col">الهاتف </th>
            <th scope="col">الإيميل </th>
            <th scope="col">الكود </th>
            {/* <th></th>
            <th></th> */}
            
          </tr>
        </thead>
        <tbody>
          {marketers && marketers.map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                
                {/* {item._id?<td>{item._id}</td>:<td>_</td>} */}
                {item.name? <td>{item.name}</td> :<td>_</td>}
                {item.mobile?<td>{item.mobile}</td>:<td>_</td>}
                {item.email?<td>{item.email}</td>:<td>_</td>}
                {item.code?<td>{item.code}</td>:<td>_</td>}
                
                
              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div>
    </div>
    </>
  )
}
