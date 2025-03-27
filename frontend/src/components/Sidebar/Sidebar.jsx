import React from 'react'
import { useNavigate } from 'react-router-dom';

import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { PiHamburger } from "react-icons/pi";
import { RiHome3Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { LuMessageCircleDashed } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";

import SidebarElement from './SidebarElement';
import { useAuth } from '@/context/AuthContext';
import useNavigateWithUser from '@/hooks/navigateToProfile.hook';


// to toggle sidebar, more info:
// https://www.youtube.com/watch?v=NFrFhBJPTmI

const Sidebar = () => {
  const { navigateToProfile } = useNavigateWithUser();
  const navigate = useNavigate();

  const { user } = useAuth();
  const userId = user?._id;


  return (
    <aside className='fixed z-10 h-screen w-75 top-0 left-0'>
      <nav className='h-full flex flex-col bg-black border-r-neutral-400 rounded-r-md shadow-md'>
        <div className='p-4 pb-2 flex justify-between items-center'>
          <img src='../../vite.svg' alt='logo' className='cursor-pointer' onClick={() => navigate('/')}/>
          <TbLayoutSidebarLeftCollapse className='p-2 w-10 h-10 rounded-full hover:bg-neutral-900 cursor-pointer text-white'/>
        </div>

        <ul className='flex-1 py-3'>
          <SidebarElement icon={<RiHome3Line size={20}/>} text='Home' active/>
          <SidebarElement icon={<CiSearch size={20}/>} text='Search'/>
          <SidebarElement icon={<FaCode size={20}/>} text='Collaborate'/>
          <SidebarElement icon={<LuMessageCircleDashed size={20}/>} text='Messages' alert/>
          <SidebarElement icon={<IoSettingsOutline size={20}/>} text='Settings'/>
        </ul>

        <div className='border-t border-dashed flex pt-5 mb-2 p-3'>
          <img
            src='https://placehold.co/100x100/orange/black'
            alt='User Dispay Picture'
            className='w-12 h-12 rounded-xl cursor-pointer'
            onClick={() => navigateToProfile(userId)}
          />

          <div className='flex justify-between items-center w-52 ml-3'>
            <div className='leading-4 flex flex-col gap-2' onClick={() => navigateToProfile(userId)}>
              <h4 className='font-semibold text-white cursor-pointer'>{`@${user?.username}`}</h4>
              <span className='text-xs text-gray-400 cursor-pointer'>{`${user?.email.slice(0,23)}...`}</span>
            </div>

            <PiHamburger className='h-10 w-5 cursor-pointer text-white'/>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar