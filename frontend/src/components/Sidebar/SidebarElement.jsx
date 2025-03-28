import React from 'react'

const SidebarElement = ({ icon, text, alert, active, expanded }) => {
  return (
    <li className={`relative w-auto h-12 text-white flex items-center py-2 px-5 my-1 font-medium rounded-md cursor-pointer transition-colors ${active ? "bg-gradient-to-r from-neutral-900 to-neutral-950 font-bold" : "hover:bg-neutral-900"}`}>
      <div className={`${active && "text-yellow-500"}`}>
        {icon}
      </div>

      {expanded && <span className='w-52 ml-5 transition-all duration-100'>{text}</span>}

      {alert && <div className={`absolute left-5 top-2 w-2 h-2 rounded bg-yellow-500`} />}
    </li>
  )
}

export default SidebarElement