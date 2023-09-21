import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import Bookcard from "../components/BookCard";
import Lfs from "../components/lfs1";

function Userorders() {
  const firebase = useFirebase()
  const [books, setbooks] = useState([])
  useEffect(() => {
    if (firebase.isloggedin) {
      firebase.fetchmyorders(firebase.user.uid)?.then((book) => {
        setbooks(book.docs)
      })
    }
  }, [firebase])
  if (!firebase.isloggedin) {
    return (
      <Lfs />
    )
  }
  console.log(books);
  return (
    <div>
      <div className='flex flex-wrap'>
        {
          books.map((book) => (<Bookcard link={`/book/userorders/${book.id}`} key={book.id} id={book.id} {...book.data()} />))
        }
      </div>
    </div>
  )
}

export default Userorders
