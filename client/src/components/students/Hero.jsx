import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70'>
      <h1 className='md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto'>Unlock potential with expert courses<span className='text-green-600'> for your goals</span> 
            
     

      </h1>

      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
      We connect expert instructors, dynamic content, and a thriving community to support your personal and professional growth.
      </p>


         {/* for mobile screen  */}
      <p  className='md:hidden hidden text-gray-500 max-w-sm mx-auto'>We connect expert instructors, dynamic content, and a thriving community to support your personal and professional growth.</p>
      
       {/* for search bar  */}
      <SearchBar/>

    </div>
  )
}

export default Hero









