import axios from 'axios';
import React from 'react'
import { AiFillDelete } from "react-icons/ai";

const DeleteComment = ({ snippetId, commentId, setComments }) => {

  const deleteComment = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/snippet/${snippetId}/reviews/delete-comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Comment Deleted Successfully.");
      setComments(prev => prev.filter(comment => comment._id !== commentId))

    } catch (err) {
      console.log("Error Deleting Comment:", err.response?.data || err.message);
    }
  }

  return (
    <div>
      <button onClick={deleteComment}>
        <AiFillDelete size={24} className="text-white hover:text-red-500 cursor-pointer"/>
      </button>
    </div>
  )
}

export default DeleteComment