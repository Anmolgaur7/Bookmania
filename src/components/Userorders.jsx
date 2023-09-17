import React, { useEffect } from 'react'
import { useFirebase } from '../context/Firebase'

function Userorders() {
   const firebase=useFirebase()
   
   useEffect(()=>{
    firebase.fetchmyorders()
   })
  return (
    <div>
      orders
    </div>
  )
}

export default Userorders
