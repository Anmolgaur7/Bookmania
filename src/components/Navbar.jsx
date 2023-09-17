import React from 'react'
import { useFirebase } from "../context/Firebase";
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const firebase=useFirebase()
  const navigate=useNavigate()
  const signout=()=>{
    firebase.signout()
    navigate("/login")
  }
  return (
    <div>
      <nav className='bg-black flex  justify-center items-center h-[6rem] flex-wrap'>
        <ul className='flex text-lg font-semibold text-white  justify-center  items-center  gap-16'>
          <li><a href="/">Home</a></li>
          <li><a href="/book/list">List your book</a></li>
          <li>
            <a href="/signup">Sign up</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/userorders">Orders</a>
          </li>
          <li><button onClick={signout}> Sign out</button></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar