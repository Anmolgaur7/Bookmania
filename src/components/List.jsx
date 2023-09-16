import React,{useState} from 'react'
import { useFirebase } from "../context/Firebase";

function List() 
{
    const [name,setname]=useState("")
    const [isbn,setisbn]=useState("")
    const [price,setprice]=useState("")
    const [coverpic,setcoverpic]=useState(null)
    const firebase=useFirebase();
     const handlesubmit= async(e)=>{
      e.preventDefault();
      await firebase.addnewlisting(name,isbn,price,coverpic);
     }
  return (
    <div>
        <form className='container p-10 flex h-screen flex-col bg-slate-100 justify-center items-center' onSubmit={handlesubmit} >
        <label className='font-semibold'>Name</label>
        <input type="text" name="name" placeholder='Enter name of book' onChange={(e) => { setname(e.target.value) }} className=' w-[30rem] h-[2rem] p-2  m-2' value={name} />
        <label className='font-semibold'>ISBN</label>
        <input type="text" name="isbn" placeholder='Enter ISBN number' onChange={(e) => { setisbn(e.target.value) }} className=' w-[30rem] h-[2rem] p-2 m-2' value={isbn} />
        <label className='font-semibold'>Price</label>
        <input type="text" name="isbn" placeholder='Enter Price' onChange={(e) => { setprice(e.target.value) }} className=' w-[30rem] h-[2rem] p-2 m-2' value={price} />
        <label className='font-semibold'>Cover Pic</label>
        <input type="file" name="file" placeholder='enter coverpic' onChange={(e) => { setcoverpic(e.target.files[0]) }} className=' w-[30rem] h-[2rem] m-2' />

        <button className='text-md bg-yellow-400 font-semibold p-1 rounded-lg' >Add Book</button>
      </form>
      
    </div>
  )
}

export default List
