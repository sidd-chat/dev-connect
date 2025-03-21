import React from 'react'

import { FaRegStar } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import { FaShare } from "react-icons/fa6";

import Editor from '../CodeEditor/Editor'


const Snippets = ({snippets}) => {

  const handleStar = () => {

  }

  const handleComment = () => {

  }

  const handleShare = () => {

  }

  return (
    <div className="mx-auto py-5">
      {snippets.map(snippet => (
        <div
          key={snippet._id}
          className="p-5 mb-4 bg-black rounded-xl shadow-lg flex flex-col px-10 pt-10 pb-5 border-2"
        >
          <h2 className="text-xl font-semibold mb-5">{snippet.title}</h2>

          <Editor code={snippet.code} readOnly={true}/>

          <h3 className="text-sm font-light mt-5">{snippet.caption}</h3>

          <div className="mt-5 mr-0 ml-auto flex gap-5">
            <FaRegStar size={22} className="text-white hover:text-red-500 cursor-pointer" onClick={handleStar}/>
            <MdOutlineModeComment size={22} className="text-white hover:text-purple-500 cursor-pointer" onClick={handleComment}/>
            <FaShare size={22} className="text-white hover:text-purple-500 cursor-pointer" onClick={handleShare}/>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Snippets