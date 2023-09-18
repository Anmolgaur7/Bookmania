import React, { useEffect, useState } from 'react'
import { useFirebase } from "../context/Firebase";
import Bookcard from "../components/BookCard";
import  Bookmania  from "../images/bookmania.jpg";
import { Reveal } from "react-awesome-reveal";

function Home() {
  const [books, setbook] = useState([])
  const firebase = useFirebase();
  useEffect(() => {
    firebase.getbooks().then((books) => {
      setbook(books.docs)
    })
  }, [firebase, books])

  if (firebase.isloggedin) {
    return (
      <div className='flex flex-wrap justify-center items-center '>
        {
          books.map(book => <Bookcard link={`book/${book.id}`} key={book.id} id={book.id} {...book.data()} />)
        }
      </div>
    )
  }
  return (
    <>
    <div>
     <img src={Bookmania} className='w-screen h-[60vh]' />
     <Reveal>
     <div className='flex justify-center'>
     <h1 className='text-8xl  font-mono font-bold m-2'>Wanna Read some books?</h1>
     </div>
     </Reveal>
    </div>
    </>
  )
}

export default Home
