import React, { useState,useEffect } from 'react'
import { useFirebase } from "../context/Firebase";
import { FaGoogle,FaFacebook } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate()
  const [email, setemail] = useState("")
  const [password, setpass] = useState("")
  const Firebase = useFirebase()

  const googlesignup = () => {
    Firebase.signinwithgoogle().catch((error) => {
      if (error.code==="auth/invalid-email"||error.code==="auth/popup-closed-by-user") 
      {
        console.error(error.code)
      }
      toast.error(`${error.code}`, {
        position: "bottom-center",
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
    Firebase.signinwithfb().catch((error)=>{
      if (error.code==="auth/invalid-email"||error.code==="auth/popup-closed-by-user") 
      {
        console.error(error.code)
      }
      toast.error(`${error.code}`, {
        position: "bottom-center",
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
  const handlesubmit = async (e) => {
    e.preventDefault();
    await Firebase.SignupWithEmail(email, password).catch((error) => {
      toast.error(`${error.code}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    })


    setemail("")
    setpass("")
  }
  useEffect(() => {
    if (Firebase.isloggedin) {
        navigate('/')
    }
  }, [Firebase, navigate])

  return (
    <div className='flex justify-center items-center mt-10' >
      <form className='container p-10 flex flex-col bg-slate-500 h-[60vh] w-[40vw] justify-center items-center' onSubmit={handlesubmit} >
      <h1 className='text-3xl text-white mb-12'>Create Account</h1>

        <label className='font-semibold text-xl text-white'>Email</label>
        <input type="email" name="email" placeholder='Enter your email address' onChange={(e) => { setemail(e.target.value) }} className=' w-[30rem] p-1 m-2' value={email} />
        <label className='font-semibold text-xl text-white'>Password</label>
        <input type="password" name="password" placeholder='At least 6 Characters' onChange={(e) => { setpass(e.target.value) }} className=' w-[30rem] p-1 m-2' value={password} />

        <button className='text-xl bg-yellow-400 font-semibold p-1 pr-2 pl-2 rounded-lg mt-4 hover:bg-yellow-300' > Sign up</button>
        <h1 className='m-1 text-md text-white  text-center font-medium'>----------- Or ------------</h1>
        <div className='flex gap-4'>
        <button onClick={googlesignup} className=' p-2 rounded-md bg-red-500 flex justify-center items-center gap-1 font-semibold hover:bg-red-400 '> <FaGoogle /> Signup with google</button>
        <button onClick={facebooksignup} className=' p-2 rounded-md bg-blue-500 flex justify-center items-center gap-1 font-semibold hover:bg-blue-400 '> <FaFacebook /> Signup with Facebook</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}
export default Signup
