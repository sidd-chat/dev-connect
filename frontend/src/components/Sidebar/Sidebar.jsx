import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { RiHome3Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { LuMessageCircleDashed } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";


import SidebarElement from './SidebarElement';
import { useAuth } from '@/context/AuthContext';
import UserInfo from './UserInfo';


// ! to toggle sidebar, use Context instead
// https://www.youtube.com/watch?v=NFrFhBJPTmI

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [ expanded, setExpanded ] = useState(true);

  return (
    <aside className={`fixed z-10 h-screen top-0 left-0 transition-all duration-200 ${expanded ? "w-75" : "w-17"}`}>
      <nav className='h-full flex flex-col bg-black border-r-neutral-400 rounded-r-md shadow-md'>
        <div className={`p-4 pb-2 flex items-center transition-all ${expanded ? "justify-between" : "justify-center"}`}>
          <img
            src='../../vite.svg'
            alt='logo'
            className={`cursor-pointer overflow-hidden transition-all duration-200 ${expanded ? "w-8" : "w-0"}`}
            onClick={() => navigate('/')}
          />
          <button onClick={() => setExpanded(curr => !curr)} className={`transition-all duration-600 ${expanded ? "mr-0" : "mr-2 rotate-180"}`}>
            <TbLayoutSidebarLeftCollapse className='p-2 w-10 h-10 rounded-full hover:bg-neutral-900 cursor-pointer text-white'/>
          </button>
        </div>

        <ul className='flex-1 py-3'>
          <SidebarElement icon={<RiHome3Line size={24}/>} text='Home' active expanded={expanded}/>
          <SidebarElement icon={<IoSearch size={22}/>} text='Search' expanded={expanded}/>
          <SidebarElement icon={<BsCurrencyDollar size={23}/>} text='Bounties Board' expanded={expanded}/>
          <SidebarElement icon={<FaCode size={23}/>} text='Collaborate' expanded={expanded}/>
          <SidebarElement icon={<LuMessageCircleDashed size={24}/>} text='Messages' alert expanded={expanded}/>
          <SidebarElement icon={<IoSettingsOutline size={24}/>} text='Settings' expanded={expanded}/>
        </ul>

        <UserInfo user={user} expanded={expanded}/>
      </nav>
    </aside>
  )
}

export default Sidebar