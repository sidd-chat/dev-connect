import axios from 'axios';
import React from 'react'
import { LuPencil } from "react-icons/lu";


const EditComment = ({ snippetId, commentId, setComments }) => {

  const editComment = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/snippet/${snippetId}/reviews/edit-comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // setComments(prev => prev.map(comment => comment._id === commentId ? { ...comment, content: newContent } : comment))
    } catch (err) {
      console.log("Error Editing Comment:", err.response?.data || err.message);
    }
  }

  return (
    <div>
      <button onClick={editComment}>
        <LuPencil size={20} className="text-white hover:text-yellow-500 cursor-pointer"/>
      </button>
    </div>
  )
}

export default EditComment