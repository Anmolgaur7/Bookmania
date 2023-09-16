import React, { useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import { useFirebase } from '../context/Firebase';


function Bookdetailpage() {
    const[bookdata,setdata]=useState([])
    const firebase=useFirebase()
    const params=useParams()
    useEffect(()=>{
    firebase.bookbyid(params.bookid).then(value=>{setdata(value)})
    })
  return (
    <div>
      {bookdata.name}
    </div>
  )
}

export default Bookdetailpage
