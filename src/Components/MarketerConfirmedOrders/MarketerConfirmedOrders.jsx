import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function MarketerConfirmedOrders() {
  useEffect(()=>{
    getUserOrders()
  },[])

      const [orders,setOrders]=useState('')
      async function getUserOrders() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/eg-co-test/orders/orders-by-marketer',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          console.log(response.data.data)
          setOrders(response.data.data)
        } catch (error) {
          console.error(error);
        }
      }
  return (
    <div className=' p-3' id='content'>
    
<div className="gray-table p-4 my-4">

      <table className="table" id="table-to-export">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">التاريخ</th>
            <th scope="col">المرسل</th>
            <th scope="col">
              المستلم </th>
            {/* <th scope="col">
              رقم التتبع</th> */}
            <th scope="col">
              حالة الشحنة </th>
            <th scope="col">
              طريقة الدفع</th>
            {/* <th scope="col">
              الهاتف</th>
            <th scope="col">
              الايميل</th> */}
            <th scope="col">
              السعر</th>
              <th scope="col">
              سعر الcod</th>
              <th scope="col">
              الوزن</th>
              <th scope="col">
              الكمية</th>
            
            {/* <th scope="col">id_الفاتورة</th>   */}
            <th scope="col"></th>              
          </tr>
        </thead>
         <tbody>
        {orders && orders.map((item, index) => (
          <tr key={index} className={item.status === "canceled" ? 'cancel' : ''}>
    <td>{index+1}</td>
            {
//                 item.createdate ? (<td>{item.createdate.slice(0, 10)}</td>
// ) : item.data && item.data.createDate ? (
//   <td>{item.data.createDate.slice(0, 10)}</td>):
item.created_at ? (
<td>{item.created_at.slice(0, 10)}</td>) : (<td>_</td>)}
      {item.p_name ? <td>{item.p_name}</td> : <td>_</td>}
      {item.c_name ? <td>{item.c_name}</td> : <td>_</td>}
            {/* {item.data && item.data.awb_no ? (
<td>{item.data.awb_no}</td>
): item.data.data && item.data.data.expressNo? (
<td>{item.data.data.expressNo}</td>
): item.data && item.data.Items && item.data.Items[0]?.Barcode? (
<td>{item.data.Items[0].Barcode}</td>
)
: item.data && item.data.waybill ? (
<td>{item.data.waybill}</td>
) :item.data.data && item.data.data.billCode?(
<td>{item.data.data.billCode}</td>
) : item.data && item.data.orderTrackingNumber ? (
<td>{item.data.orderTrackingNumber}</td>
) : item.data && item.data.Shipments && item.data.Shipments[0]?.ID ? (
<td>{item.data.Shipments[0].ID}</td>
) : item.data && item.data.sawb ? (
<td>{item.data.sawb}</td>
) : (
<td>_</td>
)} */}
           {item.status?<td className={item.status=== "canceled" ?' text-danger fw-bold':''}>{item.status}</td>:<td>_</td>}
           
            {item.paytype?<td>{item.paytype}</td>:<td>_</td>}

            {/* {item.user && item.user.mobile?<td>{item.user.mobile}</td>:<td>_</td>} */}
            {/* {item.user && item.user.email?<td>{item.user.email}</td>:<td>_</td>} */}
            {item.price?<td>{item.price}</td>:<td>_</td>}
            {item.codPrice?<td>{item.codPrice}</td>:<td>_</td>}
            {item.weight?<td>{item.weight}</td>:<td>_</td>}
            {item.quantity?<td>{item.quantity}</td>:<td>_</td>}
            
    {item.status=== "canceled" ?<td><span className='text-center text-danger fw-bold'> x </span> </td> : <td></td>}
        
  

</tr>
))}         
    </tbody>
  </table>
 
 </div>
 </div>
  )
}
