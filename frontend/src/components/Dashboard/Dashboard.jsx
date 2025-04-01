import React from 'react'

import SnippetInput from './SnippetInput';
import SnippetsFeed from './SnippetsFeed';

const Dashboard = () => {
  return (
    <main className='h-full flex flex-col items-center m-5'>
      <SnippetInput/>

      <hr className='bg-white w-full h-0.5 mt-5'/>

      <SnippetsFeed/>
    </main>
  )
}

export default Dashboard