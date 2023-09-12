import React ,{useState} from 'react'
import { useFirebase } from "../context/Firebase";

function Signup() {
    const [email,setemail]=useState("")
    const [password,setpass]=useState("")
    const Firebase= useFirebase()

const handlesubmit= async(e)=>{
e.preventDefault();

 const res=  await Firebase.SignupWithEmail(email,password)
 console.log(res);
}
  return (
    <div className='w-[45rem]' >
    <form className='container p-6 flex flex-col bg-slate-100 justify-center items-center' onSubmit={handlesubmit} >
        <h1>Sign up</h1>
    <label>Email</label>
     <input type="text" name="email" placeholder='Enter your email address'  onChange={(e)=>{setemail(e.target.value)}} className=' w-[30rem]   m-2' value={email}/>
     <label>Password</label>
     <input type="password" name="password" placeholder='Enter your Password'  onChange={(e)=>{setpass(e.target.value)}}  className=' w-[30rem] m-2' value={password}/>
     <button className='text-md bg-yellow-400 font-semibold p-1 rounded-lg' > Sign up</button>
    </form>
     
    </div>
  )
}
export default Signup
