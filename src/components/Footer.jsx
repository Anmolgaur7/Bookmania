import React from 'react'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import {Fade  } from "react-awesome-reveal";

function footer() {
  return (
    <div className=' bg-black justify-center h-[30vh]  flex-col items-center flex p-12 md:p-20 '>
        <Fade triggerOnce={true}>
        <h1 className='text-4xl text-white font-bold font-sans md:text-4xl flex justify-center items-center'>Developed by:<a href="https://github.com/Anmolgaur7" className='hover:text-gray-300 flex justify-center items-center ml-1'><FaGithub/>Anmol Gaur</a></h1>
        </Fade>
     <div className='p-4  text-white flex  text-2xl mt-4 justify- flex-wrap'>
    <Fade triggerOnce={true}>
    <a href="https://www.instagram.com/anmol____gaur/"><FaInstagram className=' m-2  hover:text-red-400 md:m-4 text-3xl'/></a>
    <a href="https://www.linkedin.com/in/anmol-gaur-79963222b/"><FaLinkedin className=' m-2 hover:text-blue-400 md:m-4 text-3xl'/></a>
    <a href="https://twitter.com/AnmolGaur26"><FaTwitter className=' m-2 hover:text-blue-500 md:m-4 text-3xl'/></a>
    </Fade>
     </div>
    </div>
  )
}

export default footer

