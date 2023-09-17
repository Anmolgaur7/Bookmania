import React, { useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import { useFirebase } from '../context/Firebase';


function Bookdetailpage() {
    const[bookdata,setdata]=useState(null)
    const firebase=useFirebase()
    const params=useParams()
    useEffect(()=>{
    firebase.bookbyid(params.bookid).then((value)=>setdata(value.data()))
    })
  return (
    <div>
      {}
    </div>
  )
}

export default Bookdetailpage
