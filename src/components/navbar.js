import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className=' font-serif'>
        <div className=' h-40  font-semibold flex justify-between items-center'> 
    <div className=' p-8 cursor-pointer h-full items-center'>
        Pothole Detection
    </div>
    <div className=' w-[40%] justify-between p-8 flex h-full'>
        <div className=' h-fit cursor-pointer  hover:border-b-2 border-black'>
        <Link to = "/"> 
            Home  
        </Link>
        </div>
        <div className=' h-fit cursor-pointer  hover:border-b-2 border-black'>
        <Link to = "/AboutUs"> 
            About Us 
        </Link>
        </div>
        <div className=' h-fit cursor-pointer  hover:border-b-2 border-black'>
        <Link to = "/Contact"> 
            Contact Us 
        </Link>
        </div>
        <div >
            <button className=' text-white relative -translate-y-3 bg-black rounded-lg'>
            <Link to = "/Signup"> 
             <div className=' font-thin mx-6 my-3 '>
             Sign Up
             </div> 
            </Link>
            </button>
        </div>
    </div>
    
    </div>
    <Outlet/>
    </div>
  )
}
