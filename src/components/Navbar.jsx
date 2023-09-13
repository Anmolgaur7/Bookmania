import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className='bg-black flex  justify-center items-center h-[4rem]'>
        <ul className='flex text-lg font-semibold text-white  justify-center  items-center  gap-16'>
            <li><a href="/">Home</a></li>
            <li><a href="/book/list">List your book</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar