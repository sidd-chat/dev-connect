import React from 'react'

import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { PiHamburger } from "react-icons/pi";

// https://www.youtube.com/watch?v=NFrFhBJPTmI

const Sidebar = ({children}) => {
  return (
    <aside className='fixed z-10 h-screen w-75'>
      <nav className='h-full flex flex-col bg-neutral-950 border-r-neutral-400 rounded-r-md shadow-md'>
        <div className='p-4 pb-2 flex justify-between items-center'>
          <img src='../../vite.svg' alt='logo' className=''/>
          <TbLayoutSidebarLeftCollapse className='p-2 w-10 h-10 rounded-full hover:bg-neutral-900 cursor-pointer'/>
        </div>

        <ul className='flex-1 py-3'>
          {children}
        </ul>

        <div className='border-t flex p-3'>
          <img alt='User Dispay Picture' className='w-10 h-10 rounded-md'/>

          <div className='flex justify-between items-center w-52 ml-3'>
            <div className='leading-4'>
              <h4 className='font-semibold'>John Doe</h4>
              <span className='text-xs text-gray-400'>johndoe@gmail.com</span>
            </div>

            <PiHamburger className='h-10 w-5 cursor-pointer'/>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar