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
  return (
    <div className='flex flex-wrap'>
     {
        books.map(book=><Bookcard  key={book.id} id={book.id} {...book.data()}/>)
     }   
    </div>
  )
}

export default Home
