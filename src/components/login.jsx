import React, { useState, useEffect } from 'react'
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';


function Login() {
  const [email, setemail] = useState("")
  const [password, setpass] = useState("")
  const Firebase = useFirebase()
  const navigate = useNavigate();
  useEffect(() => {
    if (Firebase.isloggedin) {
      navigate("/")
    }
  }, [Firebase, navigate])

  const googlesignup = () => {
    Firebase.signinwithgoogle().catch((error) => {
      toast.error(`${error.code}`, {
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
  }
  const facebooksignup = () => {
    Firebase.signinwithfb().catch((error)=>  toast.error(`${error.code}`, {
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

  const handlesubmit = async (e) => {
    e.preventDefault();
    await Firebase.SigninWithEmail(email, password).catch((error) => {
      toast.error(`${error.code}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    });
  }
  return (
    <div className='flex justify-center items-center h-[70vh] mt-10' >
      <form className=' container p-10 flex flex-col bg-slate-500 h-[60vh] w-[80vw] justify-center items-center md:h-[60vh] w-[40vw]' onSubmit={handlesubmit} >
        <h1 className='text-3xl text-white mb-12'>Log in</h1>
        <label className='font-semibold text-xl text-white'>Email</label>
        <input type="text" name="email" placeholder='Enter your email address' onChange={(e) => { setemail(e.target.value) }} className=' w-[18rem]  p-1 m-2 md:w-[30rem]' value={email} />
        <label className='font-semibold text-xl text-white'>Password</label>
        <input type="password" name="password" placeholder='Enter your Password' onChange={(e) => { setpass(e.target.value) }} className=' w-[18rem] p-1 m-2 md:w-[30rem]' value={password} />
        <button className='text-xl bg-yellow-400 font-semibold p-1 pr-2 pl-2 rounded-lg mt-4 hover:bg-yellow-300' >Log in</button>
        <h1 className='m-1 text-md text-white  text-center font-medium'>----------- Or ------------</h1>
        <div className='flex gap-4'>
        <button onClick={googlesignup} className=' p-2 rounded-md bg-red-500 flex flex-wrap justify-center items-center gap-1 font-semibold hover:bg-red-400 '> <FaGoogle /> Login with google</button>
        <button onClick={facebooksignup} className=' p-2 rounded-md bg-blue-500 flex flex-wrap justify-center items-center gap-1 font-semibold hover:bg-blue-400 '> <FaFacebook /> Login with Facebook</button>
        </div>
        <ToastContainer />
      </form>

    </div>
  )
}

export default Login
