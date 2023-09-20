import React, { useEffect, useState } from 'react'
import { useFirebase } from "../context/Firebase";
import Bookcard from "../components/BookCard";
import { JackInTheBox, Slide, Zoom, Fade } from "react-awesome-reveal";
import Books from "../images/books.jpg";
import Spinner from "../components/spinner";
function Home() {
  const [books, setbook] = useState([])
  const [load, setload] = useState(false)
  const firebase = useFirebase();
  useEffect(() => {
    firebase.getbooks().then((books) => {
      setload(true)
      setbook(books.docs)
      setload(false)
    })
    console.log(books);
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
  if (load) {
    return(
      <div>
        <Spinner/>
      </div>
    )
    
  }
  return (
    <>
      <div className='w-screen h-screen bg-home bg-cover flex flex-col justify-center items-center mb'>
        <h1 className='text-7xl bg-slate-50 opacity-75 w-[50rem] font-bold mb-24 p-4'>Discover the book you like the most.</h1>
        <Zoom triggerOnce={true}>
          <div className='flex gap-14 items-center'>
            <button className='text-2xl font-bold bg-black text-white p-4 opacity-95 rounded-md hover:bg-slate-800'><a href="/signup"> Sign Up</a></button>
            <button className='text-2xl font-bold bg-black text-white p-4 opacity-95 rounded-md hover:bg-slate-800'> <a href="/login">Sign In</a></button>
          </div>
        </Zoom>

      </div>
      <div className='flex justify-center items-center flex-wrap m-16 p-10'>
        <div>
          <JackInTheBox triggerOnce={true}>
            <h1 className='text-7xl  font-mono  font-extrabold'>Reading is  your hobby?</h1>
          </JackInTheBox>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <Slide triggerOnce={true}>
          <h1 className='font-mono m-14 text-xl font-semibold w-[45vw] h-[45vh] p-3 bg-amber-100 '> Are you a book enthusiast looking for a place to share the stories you've already devoured and make room for new ones? Or perhaps you're an avid reader on the hunt for affordable, well-loved books to add to your collection? Look no further – BookMania is here to bring book lovers together in a literary paradise!
            <br />
            At BookMania, we understand the magic of a well-worn book and the joy of passing it on to a fellow bookworm. Our platform is dedicated to connecting passionate readers like you, where you can list your gently used books for sale and discover hidden literary gems waiting to be explored.
          </h1>
        </Slide>
        <Fade triggerOnce={true}>
          <img src={Books} className='w-[40vw] h-[55vh]' alt="Some error occured" />
        </Fade>
      </div>
    </>
  )
}

export default Home
