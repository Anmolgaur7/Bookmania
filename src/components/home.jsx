import React, { useEffect, useState } from 'react'
import { useFirebase } from "../context/Firebase";
import Bookcard from "../components/BookCard";
import { JackInTheBox, Slide, Zoom, Fade } from "react-awesome-reveal";
import Books from "../images/books.jpg";
function Home() {
  const [books, setbook] = useState([])
  const firebase = useFirebase();
  useEffect(() => {
    firebase.getbooks().then((books) => {
      setbook(books.docs)
    })
    console.log(books);
  }, [firebase, books])

  if (firebase.isloggedin) {
    return (
      <div className='flex flex-wrap p-12 justify-center items-center '>
        {
          books.map(book => <Bookcard link={`book/${book.id}`} key={book.id} id={book.id} {...book.data()} />)
        }
      </div>
    )
  }
  return (
    <>
      <div className='w-screen p-2 h-screen bg-home bg-cover flex flex-col justify-center items-center '>
        <h1 className='text-7xl bg-slate-50 opacity-75 w-auto font-bold mb-24 p-4 flex  flex-wrap md:w-[45vw]'>Discover the book you like the most.</h1>
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
      <div className=' flex  flex-wrap m-5  md: flex-row justify-center gap-20 m-20 items-center'>
        <div className=' md:flex  justify-center items-center'>
          <Slide triggerOnce={true}>
            <h1 className='font-mono  text-xl  font-semibold w-[80vw] max-h-fit p-3 bg-amber-100 md:w-[40vw] '> Are you a book enthusiast looking for a place to share the stories you've already devoured and make room for new ones? Or perhaps you're an avid reader on the hunt for affordable, well-loved books to add to your collection? Look no further – BookMania is here to bring book lovers together in a literary paradise!
              <br />
              At BookMania, we understand the magic of a well-worn book and the joy of passing it on to a fellow bookworm. Our platform is dedicated to connecting passionate readers like you, where you can list your gently used books for sale and discover hidden literary gems waiting to be explored.
            </h1>
          </Slide>
        </div>
        <div className=' md:flex  justify-center items-center'>
          <Fade triggerOnce={true}>
            <img src={Books} className='w-[80vw] h-[40vh] m-3 md:w-[30vw] h-[40vh]' alt="Some error occured" />
          </Fade>
        </div>
      </div>
    </>
  )
}

export default Home
