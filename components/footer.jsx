import React from 'react'
import { Mail, Linkedin} from "lucide-react";
import { FaRegCopyright } from "react-icons/fa6";



const Footer = () => {
  return (
    <div className=' border-t bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60 w-full text-muted-foreground  mt-4  flex justify-around py-4'>
      <p className='text-xs flex items-center gap-1'><FaRegCopyright />2025 | Developed by Sayandeep Dutta  </p>
      <ul className='flex items-center gap-3 font-semibold cursor-pointer '>
        <li className="hover:scale-110 transition-all ease-in">
          <a
            href="mailto:sayandeepdutta83685@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
           <Mail className="h-4 w-4 text-muted-foreground"/>
          </a>
        </li>
        <li className=' hover:scale-110 transition-all ease-in '><a className=' ' target='_blank' href="https://www.linkedin.com/in/sayandeep-dutta-profile/"><Linkedin  className="h-4 w-4 text-muted-foreground"/></a></li>
      </ul>
    </div>
  )
}

export default Footer;