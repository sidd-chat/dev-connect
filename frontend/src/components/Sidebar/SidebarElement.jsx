import React from 'react'
import { Link } from 'react-router-dom'

const SidebarElement = ({ icon, text, alert, active, expanded, link }) => {
  return (
    <Link to={link}>
      <li className={`relative w-auto h-12 text-white flex gap-5 items-center py-2 px-5 my-1 font-medium rounded-md cursor-pointer transition-colors ${active ? "bg-gradient-to-r from-neutral-900 to-neutral-950 font-bold" : "hover:bg-neutral-900"}`}>
        <div className={`${active && "text-yellow-500"}`}>
          {icon}
        </div>

        {expanded && <span className='w-52 transition-all duration-100'>{text}</span>}

        {alert && <div className={`absolute left-5 top-2 w-2 h-2 rounded bg-yellow-500`} />}
      </li>
    </Link>
  )
}

export default SidebarElement