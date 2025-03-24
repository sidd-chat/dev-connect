import React from 'react'

import { FaRegStar } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import { FaShare } from "react-icons/fa6";

import Editor from '../CodeEditor/Editor'
import CodeToImage from '../CodeEditor/CodeToImage';


const Snippets = ({ snippets }) => {

  const handleStar = () => {

  }

  const handleComment = () => {

  }

  const handleShare = () => {

  }

  return (
    <div className="mx-auto py-5 text-white">
      {snippets.map(snippet => {
        return (
        <div
          key={snippet._id}
          className="p-5 mb-4 bg-black rounded-xl shadow-lg flex flex-col px-10 pt-10 pb-5 border-2"
        >
          <h2 className="text-xl font-semibold mb-5">{snippet.title}</h2>

          <Editor code={snippet.snippetCode} setCode={() => {}} readOnly={true}/>
          {/* <CodeToImage code={snippet.snippetCode} /> */}

          {snippet.caption && <h3 className="text-sm font-light mt-5">{snippet.caption}</h3>}

          <div className='flex items-center justify-between mt-10 mb-5'>
            <div className='flex gap-2 items-center cursor-pointer group'>
              <img
                src={snippet.author?.profilePicture ? snippet.author.profilePicture : 'https://placehold.co/100x100/orange/black'}
                alt='user profile picture'
                className='w-12 h-12 rounded-xl'
              />
              <p className='text-sm text-neutral-400 group-hover:text-white group-hover:underline transition duration-100'>
                {'@' + snippet.author?.username}
              </p>
            </div>

            <div className="mr-0 ml-auto flex gap-5">
              <FaRegStar size={22} className="text-white hover:text-yellow-600 cursor-pointer" onClick={handleStar}/>
              <MdOutlineModeComment size={22} className="text-white hover:text-purple-500 cursor-pointer" onClick={handleComment}/>
              <FaShare size={22} className="text-white hover:text-purple-500 cursor-pointer" onClick={handleShare}/>
            </div>
          </div>
        </div>
      )})}
    </div>
  )
}

export default Snippets