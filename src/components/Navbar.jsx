import React from 'react'
import movie from '../assets/logo.png'
import profile from '../assets/user.png'

const Navbar = () => {
  return (
   <>
   <div className='flex justify-between '>
   <div className='flex '>
      <img className='w-32 h-16 ml-2' src={movie} alt="" />
      <ul className='flex gap-6 ml-24 items-center text-xl font-semibold'>
        <li>TV Show</li>
        <li>Movies</li>
      </ul>
    </div>
    <div>
        
        <img className='w-12 mt-2 mr-2' src={profile} alt="" />
    </div>
  </div>
    </>
  )
}

export default Navbar
