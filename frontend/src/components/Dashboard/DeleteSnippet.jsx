import React from 'react'
import { AiFillDelete } from "react-icons/ai";

import axios from 'axios';
import { useSnippets } from '@/context/SnippetsContext';

const DeleteSnippet = ({ snippetId }) => {
  const { snippets, setSnippets } = useSnippets();

  const deleteSnippet = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/snippet/${snippetId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSnippets(prev => prev.filter(snippet => snippet._id !== snippetId))
    } catch (err) {
      console.log("Error Deleting Snippet:", err.response?.data || err.message);
    }
  }

  return (
    <>
      <button onClick={deleteSnippet}>
        <AiFillDelete size={24} className="text-white hover:text-red-500 cursor-pointer"/>
      </button>
    </>
  )
}

export default DeleteSnippet