import React from 'react'

function lfs1() {
    return (
        <div className='  flex flex-col h-[50vh] gap-10   justify-center items-center'>
            <h1 className='text-4xl  font-semibold text-center font-mono '>Please Login or Signup First ❤</h1>
            <div className='flex gap-14 items-center'>
                <button className='text-2xl font-bold bg-black text-white p-4 opacity-95 rounded-md hover:bg-slate-800'><a href="/signup"> Sign Up</a></button>
                <button className='text-2xl font-bold bg-black text-white p-4 opacity-95 rounded-md hover:bg-slate-800'> <a href="/login">Sign In</a></button>
            </div>
        </div>
    )
}

export default lfs1
