import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useFirebase } from '../context/Firebase';
import { ToastContainer,toast } from "react-toastify";

function Bookdetailpage() {
  const [bookdata, setdata] = useState(null)
  const[url,seturl]=useState(null)
  const[qty,setqty]=useState(null)

  const firebase = useFirebase()
  const params = useParams()
  const id= params.bookid;
  const place=async()=>{
   await firebase.placeorder(id,qty).then((res) => toast.success('Order placed Successfuly'+`${res.id}`, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  })).catch((error) => toast.error(`${error.code}`, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  })) }

  useEffect(() => {
    firebase.bookbyid(id).then((value) => setdata(value.data()))
  })
  useEffect(()=>{
  if (bookdata) {
  const imageurl=bookdata.Imageurl  
  firebase.getimageurl(imageurl).then((url)=>seturl(url))
  }
  })
  if (bookdata == null) return <h1>loading</h1>
  return (
    <div>
      <img src={url} className='w-[20rem]' />
      <h1 className='font-semibold text-2xl'>Details</h1>
      <h1>{bookdata.name }</h1>
      <h1>₨{bookdata.price}</h1>
      <h1 className='font-semibold text-2xl'>Owner Details </h1>
      <h1>{bookdata.displayname}</h1>
      <h1>{bookdata.userEmail}</h1>

      <input type="number" name="qty" onChange={(e) => { setqty(e.target.value) }} className='bg-slate-300'/>

      <button className='bg-blue-400' onClick={place}>Place Order</button>
      <ToastContainer/>
    </div>
  )
}

export default Bookdetailpage
