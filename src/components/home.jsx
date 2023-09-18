import React, { useEffect, useState } from 'react'
import { useFirebase } from "../context/Firebase";
import Bookcard from "../components/BookCard";

function Home() {
    const [books,setbook]=useState([])
    const firebase=useFirebase();
    useEffect(()=>{
    firebase.getbooks().then((books)=>{
     setbook(books.docs)
    })
    },[firebase,books])

    if(firebase.isloggedin)
    {
      return(
      <div className='flex flex-wrap justify-center items-center '>
      {
         books.map(book=><Bookcard link={`book/${book.id}`} key={book.id} id={book.id} {...book.data()}/>)
      }   
     </div>
      )
    }
  return (

    <h1>please login</h1>
  )
}

export default Home
