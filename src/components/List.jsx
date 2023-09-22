import React, { useState } from 'react'
import { useFirebase } from "../context/Firebase";
import { ToastContainer, toast } from "react-toastify";
import Lfs from "../components/lfs1";
import { useNavigate } from 'react-router-dom';


function List() {
  const navigate = useNavigate()
  const [name, setname] = useState("")
  const [isbn, setisbn] = useState("")
  const [price, setprice] = useState("")
  const [coverpic, setcoverpic] = useState(null)
  const firebase = useFirebase();
  const handlesubmit = async (e) => {
    e.preventDefault();
    await firebase.addnewlisting(name, isbn, price, coverpic).then((res) => {
      toast.success('Book added succesfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }).catch((error) => toast.error(`${error.code}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }));
    navigate("/")
  }
  if (!firebase.isloggedin) {
    return (
      <Lfs />
    )
  }
  return (
    <div className='flex flex-col justify-center items-center h-[70vh]'>
      <h1 className='text-3xl  m-2  font-semibold text-center font-mono  '>List your books</h1>
      <form className='container p-10 flex max-w-lg h-[60vh] flex-col bg-slate-300 justify-center items-center' onSubmit={handlesubmit} >
        <label className='font-semibold'>Name</label>
        <input type="text" name="name" placeholder='Enter name of book' onChange={(e) => { setname(e.target.value) }} className=' w-[18rem] p-1 m-2 md:w-[30rem]' value={name} />
        <label className='font-semibold'>ISBN</label>
        <input type="text" name="isbn" placeholder='Enter ISBN number' onChange={(e) => { setisbn(e.target.value) }} className=' w-[18rem] p-1 m-2 md:w-[30rem]' value={isbn} />
        <label className='font-semibold'>Price</label>
        <input type="text" name="isbn" placeholder='Enter Price' onChange={(e) => { setprice(e.target.value) }} className=' w-[18rem] p-1 m-2 md:w-[30rem]' value={price} />
        <label className='font-semibold'>Cover Pic</label>
        <input type="file" name="file" placeholder='enter coverpic' onChange={(e) => { setcoverpic(e.target.files[0]) }} className=' w-[18rem] p-1 m-2 md:w-[30rem]' />

        <button className='text-md bg-yellow-400 font-semibold p-1 rounded-lg' >Add Book</button>

      </form>
      <ToastContainer />
    </div>
  )
}

export default List
