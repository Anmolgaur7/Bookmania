import React from 'react'
import { useFirebase } from "../context/Firebase";
import { useNavigate } from 'react-router-dom';
import {ToastContainer,toast  } from "react-toastify";
import Logo from "../images/logo.png";
function Navbar() {
  const firebase=useFirebase()
  const navigate=useNavigate()
  const signout=()=>{
    firebase.signout()
    toast.success("Logout Successfully",{
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
    navigate("/login")
  }
  return (
    <div>
      <nav className='bg-black flex flex-col justify-center items-center w-screen  h-[12rem] flex-wrap'>
        <a href="/"><img src={Logo} alt="some error" className='w-[8rem] h-[8rem] rounded-full' /></a>
        <ul className='flex text-xl font-semibold text-white  justify-center items-center  gap-16'>
          <li><a href="/">Home</a></li>
          <li><a href="/book/list">List your book</a></li>
          <li>
            <a href="/book/userorders">Orders</a>
          </li>
          {
          firebase.isloggedin?<li><button onClick={signout}> Sign out <p className='text-amber-100'>{firebase.user.email}</p> </button></li>:<></>
          }
         
        </ul>
      </nav>
      <ToastContainer/>
    </div>
  )
}

export default Navbar