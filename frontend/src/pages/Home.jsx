import React from 'react'

import { RiHome3Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { LuMessageCircleDashed } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";

import Sidebar from '../components/Sidebar/Sidebar'
import Dashboard from '../components/Dashboard/Dashboard'
import SidebarElement from '../components/Sidebar/SidebarElement'

// * justify-evenly or justify-around only work if the direct children of the flex container
// * (Sidebar and Dashboard) have a defined width.

const Home = () => {
  return (
    <div className='flex'>
      <Sidebar className=''>
        <SidebarElement icon={<RiHome3Line size={20}/>} text='Home' active/>
        <SidebarElement icon={<CiSearch size={20}/>} text='Search'/>
        <SidebarElement icon={<FaCode size={20}/>} text='Collaborate'/>
        <SidebarElement icon={<LuMessageCircleDashed size={20}/>} text='Messages' alert/>
        <SidebarElement icon={<IoSettingsOutline size={20}/>} text='Settings'/>
      </Sidebar>

      <div className="flex-1 flex justify-center">
        <Dashboard />
      </div>
    </div>
  )
}

export default Home
