import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

export default function Header() {
  const {userdata} = useContext(AppContext);
  // console.log(userdata);
  
  return (
    <div className="flex flex-col items-center mt-10 sm:mt-20 px-4 py-8 text-center text-gray-800">
  <img
    src={assets.header_img}
    alt="Profile"
    className="w-28 h-28 sm:w-36 sm:h-36 rounded-full mb-4 sm:mb-6 shadow-lg"
  /> 
  <h1 className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
    Hey, {userdata ? userdata.name : 'Developer!' }
    <img src={assets.hand_wave} alt="wave" className="w-4 sm:w-5 aspect-square" />
  </h1> 
  <h2 className="text-lg sm:text-xl font-semibold mt-2 text-purple-600">
    Welcome to Our Creative Space 🚀
  </h2> 
  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-md">
    You’ve just landed at the heart of innovation. Here, code meets creativity, and ideas come alive.
    Whether you’re building your first app or scaling to the moon — we’re here to grow with you.
  </p> 
  <button
    className="w-full sm:w-auto mt-6 px-6 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition-all"
  >
    🚀 Get Started
  </button>
</div> 
  )
}
