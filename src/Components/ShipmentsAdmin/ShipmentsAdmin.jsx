import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function ShipmentsAdmin() {
    useEffect(()=>{
        getAdminOrders()
      },[])
    
          
          const [orders,setOrders]=useState('')
          async function getAdminOrders() {
            try {
              const response = await axios.get('https://dashboard.go-tex.net/gotex-co-test/admin/orders/get-all',
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
              });
              console.log(response.data.data.orders)
              setOrders(response.data.data.orders)
            } catch (error) {
              console.error(error);
            }
          }
  return (
    <>
        <div className=' p-3' id='content'>
     <div className="gray-table p-4 my-4">
    {/* <button className="btn btn-blue" onClick={exportToExcel}>تحميل كملف اكسيل</button> */}

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">
                  الشركة
                </th>
                <th scope="col">
                  العميل
                </th>
                <th scope="col">
                  الهاتف
                </th>
                <th scope="col">
                  الايميل

                </th>
                <th scope="col">
                  السعر
                </th>
                <th scope="col">
                  رقم التتبع
                </th>
                
                <th scope="col">
                  طريقة الدفع
                </th>
                <th scope="col">التاريخ</th>
                {/* <th scope="col">id_الفاتورة</th>                 */}
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((item, index) => {
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item.company?<td>{item.company}</td>:<td>_</td>}
                {item.user && item.user.name ? <td>{item.user.name}</td> : <td>_</td>}
                {item.user && item.user.mobile?<td>{item.user.mobile}</td>:<td>_</td>}
                {item.user && item.user.email?<td>{item.user.email}</td>:<td>_</td>}
                {item.price?<td>{item.price}</td>:<td>_</td>}
                
{item.data && item.data.awb_no ? (
  <td>{item.data.awb_no}</td>
) : item.data && item.data.waybill ? (
  <td>{item.data.waybill}</td>
) : item.data && item.data.orderTrackingNumber ? (
  <td>{item.data.orderTrackingNumber}</td>
) : item.data && item.data.Shipments && item.data.Shipments[0]?.ID ? (
  <td>{item.data.Shipments[0].ID}</td>
) : item.data && item.data.sawb ? (
  <td>{item.data.sawb}</td>
) : (
  <td>_</td>
)}

                {item.paytype?<td>{item.paytype}</td>:<td>_</td>}
                {item.createdate ? (<td>{item.createdate.slice(0, 15)}</td>
) : item.data && item.data.createDate ? (
  <td>{item.data.createDate.slice(0, 10)}</td>) : (<td>_</td>)}
        {/* {item.inovicedaftra?.id?(<td>{item.inovicedaftra.id}</td>):(<td>_</td>)} */}

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
