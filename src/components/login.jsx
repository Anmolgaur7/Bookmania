import React, { useState, useEffect } from 'react'
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

function Login() {
  const [email, setemail] = useState("")
  const [password, setpass] = useState("")
  const Firebase = useFirebase()
  const navigate = useNavigate();
  useEffect(() => {
    if (Firebase.isloggedin) {
     navigate("/")
    }
  }, [Firebase,navigate])

  const googlesignup = () => {
    Firebase.signinwithgoogle() 
  }
  
  const handlesubmit = async (e) => {
    e.preventDefault();
    const res = await Firebase.SigninWithEmail(email, password)
    console.log(res);
  }
  return (
    <div className='w-screen h-screen' >
      <form className='container p-6 flex flex-col bg-slate-100  h-screen justify-center  items-center' onSubmit={handlesubmit} >
        <label>Email</label>
        <input type="text" name="email" placeholder='Enter your email address' onChange={(e) => { setemail(e.target.value) }} className=' w-[30rem]   m-2' value={email} />
        <label>Password</label>
        <input type="password" name="password" placeholder='Enter your Password' onChange={(e) => { setpass(e.target.value) }} className=' w-[30rem] m-2' value={password} />
        <button className='text-md bg-yellow-400 font-semibold p-1 rounded-lg' >Log in</button>
        <h1>or</h1>
        <button onClick={googlesignup} className=' p-2 rounded-md bg-red-500 flex justify-center items-center gap-1 font-semibold '> <FaGoogle/> Login with google</button>
      </form>
      
    </div>
  )
}

export default Login
