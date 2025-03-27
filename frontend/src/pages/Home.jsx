import React from 'react'

import Sidebar from '../components/Sidebar/Sidebar'
import Dashboard from '../components/Dashboard/Dashboard'

// * justify-evenly or justify-around only work if the direct children of the flex container
// * (Sidebar and Dashboard) have a defined width.

const Home = () => {
  return (
    <div className='flex'>
      <Sidebar className=''/>

      <div className="flex-1 flex justify-center">
        <Dashboard />
      </div>
    </div>
  )
}

export default Home
