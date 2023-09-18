import React, { useState } from 'react'
import { useFirebase } from "../context/Firebase";


function Signup() {
  const [email, setemail] = useState("")
  const [password, setpass] = useState("")
  const Firebase = useFirebase()

  const handlesubmit = async (e) => {
    e.preventDefault();
    const res = await Firebase.SignupWithEmail(email, password)
    console.log(res);
    setemail("")
    setpass("")
  }
  
  return (
    <div >
      <form className='container p-10 flex flex-col h-screen bg-slate-100 justify-center items-center' onSubmit={handlesubmit} >
        <label className='font-semibold'>Email</label>
        <input type="email" name="email" placeholder='Enter your email address' onChange={(e) => { setemail(e.target.value) }} className=' w-[30rem]   m-2' value={email} />
        <label className='font-semibold'>Password</label>
        <input type="password" name="password" placeholder='Enter your Password' onChange={(e) => { setpass(e.target.value) }} className=' w-[30rem] m-2' value={password} />
        <button className='text-md bg-yellow-400 font-semibold p-1 rounded-lg' > Sign up</button>
      </form>
    </div>
  )
}
export default Signup
