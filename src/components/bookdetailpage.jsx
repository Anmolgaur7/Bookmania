import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from '../context/Firebase';
import { ToastContainer, toast } from "react-toastify";
import Spin from "../images/spin.gif";

function Bookdetailpage() {
  const [bookdata, setdata] = useState(null)
  const [url, seturl] = useState(null)
  const [qty, setqty] = useState(null)

  const firebase = useFirebase()
  const navigate = useNavigate()
  const params = useParams()
  const id = params.bookid;
  const place = async () => {
    await firebase.placeorder(id, qty).then((res) => toast.success('Order placed Successfully ' + ` Id:${res.id}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })).catch((error) => toast.error(`${error.code}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }))
  }
  const del = () => {
    firebase.delbook(id).then((res) => {
      toast.success('Book removed Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    })
    navigate("/")
  }
  useEffect(() => {
    firebase.bookbyid(id).then((value) => setdata(value.data()))
  })
  useEffect(() => {
    if (bookdata) {
      const imageurl = bookdata.Imageurl
      firebase.getimageurl(imageurl).then((url) => seturl(url))
    }
  })
  if (bookdata == null) {
    return (
      <div className='flex justify-center items-center p-20'>
        <img src={Spin} className='w-[5rem] h-[5rem] rounded-full' alt="loading" />
      </div>
    )
  }
  return (
    <div className='flex justify-center items-center '>
      <div className='max-w-md  bg-slate-300 p-3 m-5'>
        <img src={url} className='w-screen' alt='Some error' />
        <h1 className='mb-3 text-2xl font font-semibold text-black' >{bookdata.name}</h1>
        <h1 className='mb-3 text-xl font font-semibold text-black'>₨{bookdata.price}</h1>
        <p className="mb-3 font-medium text-lg  text-gray-700 dark:text-gray-400">This book has  a title {bookdata.name} and it is sold by {bookdata.userEmail}</p>
        <h1 className='font-semibold text-2xl'>Owner Details </h1>
        <h1 className='"mb-3 font-medium text-md text-gray-700 dark:text-gray-400'>{bookdata.userEmail}</h1>
        <input type="number" name="qty" placeholder='Quantity' onChange={(e) => { setqty(e.target.value) }} className='bg-white p-1 mt-1' />
        <div className='flex flex-col justify-center items-center m-4'>
        {firebase.user.uid === bookdata.userID ? <button onClick={del} className='bg-blue-500 text-black w-[18rem] p-1 m-2 rounded-lg text-xl font-semibold hover:bg-blue-400'>Owner of this book ?Remove it</button> : <></>}
        <button className='bg-blue-500 text-black w-[18rem] p-1 rounded-lg text-xl font-semibold hover:bg-blue-400' onClick={place}>Place Order</button>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Bookdetailpage
