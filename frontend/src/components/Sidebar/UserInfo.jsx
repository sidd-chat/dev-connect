import React from 'react'
import useNavigateWithUser from '@/hooks/navigateToProfile.hook';
import { PiHamburger } from 'react-icons/pi'

const UserInfo = ({ user, expanded }) => {
  const { navigateToProfile } = useNavigateWithUser();

  return (
    <div className='border-t border-dashed flex pt-5 mb-2 p-3'>
      <img
        src='https://placehold.co/100x100/orange/black'
        alt='User Dispay Picture'
        className='w-10 h-10 rounded-xl cursor-pointer transition-all'
        onClick={() => navigateToProfile(user?._id)}
      />

      {expanded &&
        <div className='flex justify-between items-center w-52 ml-3 transition-all'>
          <div className='leading-4 flex flex-col gap-2' onClick={() => navigateToProfile(user?._id)}>
            <h4 className='font-semibold text-white cursor-pointer'>{`@${user?.username}`}</h4>
            <span className='text-xs text-gray-400 cursor-pointer'>{`${user?.email.slice(0,23)}...`}</span>
          </div>

          <PiHamburger className='h-10 w-5 cursor-pointer text-white'/>
        </div>
      }
    </div>
  )
}

export default UserInfo