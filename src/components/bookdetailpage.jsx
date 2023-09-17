import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useFirebase } from '../context/Firebase';


function Bookdetailpage() {
  const [bookdata, setdata] = useState(null)
  const[url,seturl]=useState(null)
  const[qty,setqty]=useState(null)

  const firebase = useFirebase()
  const params = useParams()
  const id= params.bookid;
  const place=async()=>{
   const res= await firebase.placeorder(id,qty)
   console.log("Order Placed",res);  
  }

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
    </div>
  )
}

export default Bookdetailpage
