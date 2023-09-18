import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import Bookcard from "../components/BookCard";

function Userorders() {
  const firebase = useFirebase()
  const [books, setbooks] = useState([])
  useEffect(() => {
    if (firebase.isloggedin) {
      firebase.fetchmyorders(firebase.user.uid)?.then((book) => setbooks(book.docs))
    }
  },[firebase])
  if (!firebase.isloggedin) {
    return (
      <h1>Please login</h1>
    )
  }
  return (
    <div>
      <div className='flex flex-wrap'>
        {
           books.map((book)=>(<Bookcard  link={`/book/userorders/${book.id}`} key={book.id} id={book.id} {...book.data()}/>))
        }
      </div>
    </div>
  )
}

export default Userorders
