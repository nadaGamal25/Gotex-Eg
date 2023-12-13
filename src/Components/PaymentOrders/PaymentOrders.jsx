import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function PaymentOrders() {
    useEffect(()=>{
        getUserBalanceOrders()
      },[])
    
          const [BalanceOrders,setBalanceOrders]=useState('')
          async function getUserBalanceOrders() {
            try {
              const response = await axios.get('https://dashboard.go-tex.net/eg-co-test/user/get-user-payment-orders',
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
              });
              console.log(response.data.data)
              setBalanceOrders(response.data.data)
            } catch (error) {
              console.error(error);
            }
          }
          
          const [showModalDeposit, setShowModalDeposit] = useState(false);
  const [orderIdDeposit, setOrderIdDeposit] = useState('');
  const [receiptFile, setReceiptFile] = useState(null);
  const [selectedClientIdDeposit, setSelectedClientIdDeposit] = useState('');

    function handleOpenModal(orderId) {
      // setSelectedClientIdDeposit(clientId);
      setOrderIdDeposit(orderId)
      setShowModalDeposit(true);
    }
    async function handleConfirmDepositSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('paymentOrderId', orderIdDeposit);
      formData.append('receipt', receiptFile);
      // formData.append('userId', selectedClientIdDeposit);
    
      try {
        const response = await axios.post(
          'https://dashboard.go-tex.net/eg-co-test/user/check-tap-payment/fawry',
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          }
        );
    
        console.log(response);
        window.alert('تم تأكيد الدفع بنجاح')
        let sticker = response.data;
        console.log(sticker)
        const newWindow = window.open();
        newWindow.document.open();
        newWindow.document.write(sticker);
        newWindow.document.close();
        setShowModalDeposit(false);
      } catch (error) {
        console.error(error);
    
      }
    }
  return (
    <>
    <div className='p-4' id='content'>
    <div className="gray-table p-3 mt-4">
    
      <table className="table">
        <thead>
          <tr>
           <th scope="col">#</th>
           <th scope="col"> قيمة المبلغ</th>
           <th scope="col">الحالة </th>
           <th scope="col">رقم العملية </th>
           <th></th>
           
          </tr>
        </thead>
      <tbody>
      {BalanceOrders && BalanceOrders.map((item,index) =>{
           return(
             <tr key={index}>
             <td>{index+1}</td>
             <td>{item.amount}</td>
             <td>{item.status}</td>
             <td>{item._id}</td>
             <td>
              <button className="btn btn-success" onClick={()=> handleOpenModal(item._id)}>
                تأكيد الدفع
              </button>
             </td>
             
             
           </tr>
           )
         }
         )}
          
       </tbody>
     </table>
    </div> 
    </div>
     {/* {showModalDeposit && (
      <div className='add-deposit-modal-overlay' style={{ display: 'block' }}>
        <div className='add-deposit-modal-dialog'>
          <div className='add-deposit-modal-content'>
            <div className='add-deposit-modal-header'>
              <h2 className='add-deposit-modal-title'>تأكيد الدفع (فى حالة الدفع فورى) </h2>
              <button
                className='close'
                onClick={() => setShowModalDeposit(false)}
              >
                &times;
              </button>
            </div>
            <div className='add-deposit-modal-body'>
              <form onSubmit={handleConfirmDepositSubmit}>
                
                <label>الإيصال: (اختيارى)</label> <br/>
                <input
                  type='file'
                  onChange={(e) => setReceiptFile(e.target.files[0])}
                /><br/>
                <button
                  type='submit'
                  className=' btn btn-success m-2'
                >
              تأكيد
                </button>
                <button
                  type='button'
                  className='btn btn-secondary m-2'
                  onClick={() => setShowModalDeposit(false)}
                >
                  إلغاء
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )} */}
    {showModalDeposit && (
        <div className='modal bg-d' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content '>
              <div className='modal-header'>
                <h5 className='modal-title'>تأكيد الدفع (فى حالة الدفع فورى)   </h5>
                
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                <form onSubmit={handleConfirmDepositSubmit}>
                
                <label>ارفع صورة ايصال الدفع: (اختيارى)</label> <br/>
                <input
                  type='file'
                  onChange={(e) => setReceiptFile(e.target.files[0])}
                /><br/>
                <div className="text-center">
                <button
                  type='submit'
                  className=' btn btn-success m-2'
                >
              تأكيد الدفع
                </button>
                </div>
                
                
              </form>
                </div>
              </div>
              <div className='modal-footer'>
                
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => setShowModalDeposit(false)}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )} 
    </>
 )
}
