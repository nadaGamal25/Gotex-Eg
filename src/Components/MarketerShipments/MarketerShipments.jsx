import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function MarketerShipments() {
  const [shipmentsAdmin,setShipmentsAdmin]=useState([])
  const [theLimit,setLimit]=useState(30)
  const [currentPage, setCurrentPage] = useState(Number(1));
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [loading, setLoading] = useState(false);
const [searchPaytype, setSearchPaytype] = useState('');
const [currentPage2, setCurrentPage2] = useState(Number(1));
  const [numberOfPages2, setNumberOfPages2] = useState(1);
const [secondFilter, setSecondFilter] = useState(false);
  const [clientFilter, setClientFilter] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');


  async function getShipments() {
      try {
        setLoading(true);
        const response = await axios.get(`https://dashboard.go-tex.net/eg-co-test/orders`, {
          params: {
              page: currentPage,
              limit: 30,
              
            },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
    
        setShipmentsAdmin(response.data.data);
        setSecondFilter(false)
        console.log(response)
        setCurrentPage(response.data.pagination.currentPage);
        setNumberOfPages(response.data.pagination.numberOfPages);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false); 
      }
    }
    async function getSearchShipments() {
      try {
        setLoading(true);
        const response = await axios.get(`https://dashboard.go-tex.net/eg-co-test/orders`, {
          params: {
              page: 1,
              limit: 30,
              paytype: searchPaytype,
              keyword:clientFilter,
              // startDate:startDate,
              // endDate:endDate,
            },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
    
        setShipmentsAdmin(response.data.data);
        setSecondFilter(true)
        console.log(response)
        setCurrentPage2(response.data.pagination.currentPage);
        setNumberOfPages2(response.data.pagination.numberOfPages);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false); 
      }
    }
    async function getSearchShipmentsPage() {
      try {
        setLoading(true);
        const response = await axios.get(`https://dashboard.go-tex.net/eg-co-test/orders`, {
          params: {
              page: currentPage2,
              limit: 30,
              paytype: searchPaytype,
              keyword:clientFilter,
              // startDate:startDate,
              // endDate:endDate,
            },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
    
        setShipmentsAdmin(response.data.data);
        setSecondFilter(true)
        console.log(response)
        setCurrentPage2(response.data.pagination.currentPage);
        setNumberOfPages2(response.data.pagination.numberOfPages);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false); 
      }
    }
  useEffect(() => {
      getShipments();
  }, []);

  
  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); 
      try {
        setLoading(true);
        const response = await axios.get(`https://dashboard.go-tex.net/eg-co-test/orders`, {
          params: {
              page: currentPage -1,
              limit: 30,
              
            },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
    
        setShipmentsAdmin(response.data.data);
        setSecondFilter(false)
        console.log(response)
        setCurrentPage(response.data.pagination.currentPage);
        setNumberOfPages(response.data.pagination.numberOfPages);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false); 
      }
    }
  };
  const handleNextPage = async () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
      try {
        setLoading(true);
        const response = await axios.get(`https://dashboard.go-tex.net/eg-co-test/orders`, {
          params: {
              page: currentPage +1,
              limit: 30,
              
            },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
    
        setShipmentsAdmin(response.data.data);
        setSecondFilter(false)
        console.log(response)
        setCurrentPage(response.data.pagination.currentPage);
        setNumberOfPages(response.data.pagination.numberOfPages);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false); 
      }
    }
  };
  const handlePreviousPage2 = async () => {
if (currentPage2 > 1) {
  setCurrentPage2(currentPage2 - 1); 
  try {
    setLoading(true);
    const response = await axios.get(`https://dashboard.go-tex.net/eg-co-test/orders`, {
      params: {
          page: currentPage2 -1,
          limit: 30,
          paytype: searchPaytype,
          keyword:clientFilter,
          // startDate:startDate,
          // endDate:endDate,
        },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });

    setShipmentsAdmin(response.data.data);
    setSecondFilter(true)
    console.log(response)
    setCurrentPage2(response.data.pagination.currentPage);
    setNumberOfPages2(response.data.pagination.numberOfPages);
  } catch (error) {
    console.error('Error fetching students:', error);
  } finally {
    setLoading(false); 
  }
}
};
const handleNextPage2 = async () => {
if (currentPage2 < numberOfPages2) {
  setCurrentPage2(currentPage2 + 1) 
  try {
    setLoading(true);
    const response = await axios.get(`https://dashboard.go-tex.net/eg-co-test/orders`, {
      params: {
          page: currentPage2 +1,
          limit: 30,
          paytype: searchPaytype,
          keyword:clientFilter,
          // startDate:startDate,
          // endDate:endDate,
        },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });

    setShipmentsAdmin(response.data.data);
    setSecondFilter(true)
    console.log(response)
    setCurrentPage2(response.data.pagination.currentPage);
    setNumberOfPages2(response.data.pagination.numberOfPages);
  } catch (error) {
    console.error('Error fetching students:', error);
  } finally {
    setLoading(false); 
  }  
}
};

const [showModal, setShowModal] = useState(false);
const [orderIdValue, setorderIdValue] = useState('');
const [billFileVaue, setbillFileVaue] = useState('');
const [billUrlValue, setbillUrlValue] = useState('');
async function confirmOrder(e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append('orderId', orderIdValue);
  formData.append('billFile', billFileVaue);
  formData.append('billUrl', billUrlValue);
  try {
    const response = await axios.post(
      'https://dashboard.go-tex.net/eg-co-test/orders/confirm-order',
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      }

    );
    console.log(response);
    window.alert('تم تأكيد الشحنة بنجاح ')
    getShipments()

    // if (response.data.msg === 'ok') {
      closeModal();
      // getUsersListsAdmin();
    // }
  } catch (error) {
    console.error(error);
    window.alert('حدث خطأ ما  ')

  }
}

const openModal = (orderid) => {
  setorderIdValue(orderid)
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
};
  return (
    <>
    <div className=' p-3' id='content'>
    <div className="gray-box p-4 mb-4">
  <div className="row">
    
    <div className="col-md-4">
      <input className='form-control m-1' 
      type="search" placeholder="الاسم , الايميل ,الهاتف"
      // value={clientFilter}
      onChange={(e) => setClientFilter(e.target.value)}
      />
    </div>
    
    
    <div className="col-md-4">
    <select className='form-control m-1' onChange={(e) => setSearchPaytype(e.target.value)}>
<option value="">طريقة الدفع (الكل)</option>
<option value="cc">cc</option>
<option value="cod">cod</option>
</select> 
   </div>
   <div className="col-md-4">
   <div className="text-center mt-1">
    <button className="btn btn-lightblue2 m-1" onClick={getSearchShipments}>
        بحث
    </button>
</div>
   </div>
    
    
    {/* <div className="col-md-8 p-1">
      <label>
التاريخ من:
<input
type="date"
// value={startDate}
onChange={(e) => setStartDate(e.target.value)}
max={endDate || undefined}
/>
</label>
<label>
الى:
<input
type="date"
// value={endDate}
onChange={(e) => setEndDate(e.target.value)}
min={startDate || undefined}
/>
</label>

    </div> */}
   
  </div>
</div>
<div className="gray-table p-4 my-4">
    <button className="btn btn-lightblue2 m-1" onClick={getShipments}>عرض جميع الشحنات  </button>

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
            <th scope="col"></th>              
          </tr>
        </thead>
         <tbody>
        {shipmentsAdmin && shipmentsAdmin.map((item, index) => (
<tr key={index} className={item.status === "canceled" ? 'cancel' : ''}>
{loading ? (
  <td>
    <i className="fa-solid fa-spinner fa-spin"></i>
  </td>
) : (
  <>
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
            <td>
              <button className="btn btn-success" onClick={()=>openModal(item._id)}>
                تأكيد الشحنة
              </button>
            </td>
    {item.status=== "canceled" ?<td><span className='text-center text-danger fw-bold'> x </span> </td> : <td></td>}
        
  </>
)}
</tr>
))}         
    </tbody>
  </table>
  {secondFilter?(
  <div>
    <button className="btn btn-dark-blue" onClick={handlePreviousPage2} disabled={currentPage2 === 1}>
      الصفحة السابقة 
    </button>
    <span className='px-1'>
      Page {currentPage2} of {numberOfPages2}
    </span>
    <button className="btn btn-dark-blue" onClick={handleNextPage2} disabled={currentPage2 === numberOfPages2}>
      الصفحة التالية 
    </button>
  </div>
  ):
  (
    <div>
    <button className="btn btn-dark-blue" onClick={handlePreviousPage} disabled={currentPage === 1}>
      الصفحة السابقة 
    </button>
    <span className='px-1'>
      Page {currentPage} of {numberOfPages}
    </span>
    <button className="btn btn-dark-blue" onClick={handleNextPage} disabled={currentPage === numberOfPages}>
      الصفحة التالية 
    </button>
  </div>
  )}
  <div>
<input className=' m-1' type="number" 

placeholder="رقم الصفحة "
onChange={(e) => setCurrentPage2(e.target.value)} />
<button className="btn btn-primary m-1" onClick={getSearchShipmentsPage}>
        بحث برقم الصفحة
    </button>
  </div>
 </div>
 </div>
 {showModal && (
        <div className='modal bg-d' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content '>
              <div className='modal-header'>
                <h5 className='modal-title'>قم بإرفاق ملف البوليصة أو اللينك 
                (<span className='text-danger'> ارفق واحد فقط</span>)  </h5>
                {/* <button
                  type='button'
                  className='close'
                  onClick={closeModal}
                >
                  <span aria-hidden='true'>&times;</span>
                </button> */}
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <form>
                  <label htmlFor=''>صورة او ملف البوليصة  :</label><br/>
                  <input
                  className='form-control'
                  type='file'
                  onChange={(e) => setbillFileVaue(e.target.files[0])}
                /><br/>
                  <label htmlFor=''>لينك البوليصة او الفاتوة  :</label>
                  <input required
                    type='text'
                    className='form-control'
                    // value={depositAmount}
                    onChange={(e)=>{setbillUrlValue(e.target.value)}}
                   
                  />
                  <div className="text-center mt-2">
                  <button
                  type='button'
                  className='btn btn-primary'
                  onClick={confirmOrder}
                >
                  تأكيد
                </button>
                  </div>

                  </form>
                </div>
              </div>
              <div className='modal-footer'>
                
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModal}
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
