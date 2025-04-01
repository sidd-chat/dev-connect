import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import axios from 'axios';
import SnippetsFeed from '@/components/Dashboard/SnippetsFeed';
import Sidebar from '@/components/Sidebar/Sidebar';

const Profile = () => {
  const { userId } = useParams();
  const [ user, setUser ] = useState({});
  const [ snippets, setSnippets ] = useState([]);

  useEffect(() => {
    const getUserDetails = async () => {
      const userDetails = await axios.get(`http://localhost:5000/profile/${userId}`);
      setUser(userDetails.data.userDetails);
    }

    getUserDetails();
  }, [userId]);

  useEffect(() => {
    const getSnippets = async () => {
      const snippetDetails = await axios.get(`http://localhost:5000/profile/${userId}/snippets`);
      console.log(snippetDetails.data.snippets)
      setSnippets(snippetDetails.data.snippets);
    }

    getSnippets();
  }, []);

  return (
    <main>
      <Sidebar />

      <div className='flex flex-col justify-center items-center mt-15 gap-10'>
        <div className='flex items-center justify-center gap-12 p-5 rounded-lg'>
          <img src= {user?.profilePicture || 'https://placehold.co/100x100/orange/black'} className='rounded-2xl'/>

          <hr className='h-20 w-0.5 bg-white'/>

          <div className='text-white'>
            <p>{user?.username && `@${user.username}`}</p>

            <div className='flex gap-10 my-2'>
              <p>{snippets && `${snippets.length} Snippets`}</p>
              <p>{user?.followers && `${user.followers.length} Followers`}</p>
              <p>{user?.following && `${user.following.length} Following`}</p>
            </div>

            <p className='pt-4'>{user?.bio && `${user.bio.length} Bio`}</p>
          </div>
        </div>

        <hr className='h-0.5 w-[50%] bg-white overflow-hidden my-10'/>

        <h2 className='text-xl text-white'>{"Posted Snippets ->"}</h2>
        <SnippetsFeed snippetsProp={snippets}/>
      </div>
    </main>
  )
}

export default Profile