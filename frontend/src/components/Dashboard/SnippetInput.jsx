import React, { useState, useEffect } from 'react'
import { FaArrowTurnUp } from 'react-icons/fa6'
import Editor from '../CodeEditor/Editor'
import axios from 'axios';
import { useSnippets } from '@/context/SnippetsContext';


const SnippetInput = () => {
  const { setSnippets } = useSnippets();

  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  const handlePost = async () => {
    // ! Handle Empty Submissions... later

    // !
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('No token found. Please log in.');
      return;
    }

    const snippet = {
      title: title,
      snippetCode: code,
      caption: caption
    }

    console.log(snippet)

    try {
      const response = await axios.post(
        'http://localhost:5000/add-snippet',
        snippet,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Snippet Added:', response.data);
      setSnippets(prevSnippets => [response.data.snippet, ...prevSnippets]);
    } catch (err) {
      console.log('Error Posting Snippet:', err.response?.data || err.message);
    }

    setTitle('');
    setCaption('');
    setCode('');
  }

  return (
    <div className='flex flex-col bg-neutral-950 rounded-xl shadow-lg px-10 pt-10 pb-5 border-2 border-dashed'>
      <input
        type='text'
        className='mb-5 text-xl text-white capitalize bg-neutral-950 outline-none'
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
        className='w-xl h-xs text-xs text-white outline-none rounded-b-xl p-3 mt-3 bg-neutral-950'
        placeholder='Caption...'
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <div className='mt-7 mr-0 ml-auto flex items-center gap-2'>
        <FaArrowTurnUp className='rotate-90 text-lg text-white'/>

        <button
          className='rounded-full px-4 py-2 bg-transparent text-white font-semibold gradient-button hover:cursor-pointer transition uppercase relative overflow-hidden'
          onClick={handlePost}
        >
          post
        </button>
      </div>
    </div>
  )
}

export default SnippetInput