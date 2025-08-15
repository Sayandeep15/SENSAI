import React from 'react'
import { ImGithub } from "react-icons/im";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa6";



const Footer = () => {
  return (
    <div className=' border-t bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60 w-full text-white  mt-4  flex justify-around py-4'>
        <p className='text-xs flex items-center gap-1'><FaRegCopyright />2025 | Developed by Sayandeep Dutta  </p>
        <ul className='flex items-center gap-4 font-semibold cursor-pointer '>
            <li className=' hover:scale-110 transition-all ease-in '><a className=' ' target='_blank' href="https://github.com/Sayandeep15/Password-Manager"><ImGithub /></a></li>
            <li className=' hover:scale-110 transition-all ease-in '><a className=' ' target='_blank' href="https://www.linkedin.com/in/sayandeep-dutta-profile/"><FaLinkedinIn /></a></li>
        </ul>
    </div>
  )
}

export default Footer;