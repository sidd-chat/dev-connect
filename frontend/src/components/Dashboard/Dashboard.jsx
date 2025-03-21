import React, { useId, useState } from 'react'

import Editor from '../CodeEditor/Editor'

import { FaArrowTurnUp } from "react-icons/fa6";
import Snippets from './Snippets';


const Dashboard = () => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [snippets, setSnippets] = useState([]);

  const id = useId();

  const handlePost = () => {
    // ! Handle Empty Submissions

    const snippet = {
      _id: id,
      title: title,
      caption: caption,
      code: code
    }

    setTitle('');
    setCaption('');
    setCode('');

    setSnippets([snippet, ...snippets]);
  }

  return (
    <main className='h-full flex flex-col items-center m-5'>
      <div className='flex flex-col bg-neutral-950 rounded-xl shadow-lg px-10 pt-10 pb-5 border-2 border-dashed'>
        <input
          type='text'
          className='mb-5 text-xl capitalize bg-neutral-950 outline-none'
          placeholder='What did you code today?'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <Editor
          code={code}
          setCode={setCode}
          readOnly={false}
        />

        <textarea
          className='w-xl h-xs text-xs outline-none rounded-b-xl p-3 mt-3 bg-neutral-950'
          placeholder='Caption...'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <div className='mt-7 mr-0 ml-auto flex items-center gap-2'>
          <FaArrowTurnUp className='rotate-90 text-lg'/>
          <button
            className='rounded-full px-4 py-2 bg-transparent text-white font-semibold hover:bg-purple-600 hover:cursor-pointer transition duration-400 uppercase'
            onClick={handlePost}
          >
            post
          </button>
        </div>
      </div>

      <hr className='bg-white w-full h-0.5 mt-5'/>

      <Snippets snippets={snippets}/>
    </main>
  )
}

export default Dashboard