import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CommentsCard from './CommentsCard';

const CommentsFeed = ({ snippetId }) => {
  const [ comments, setComments ] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/snippet/${snippetId}/reviews/comments`);
      console.log(response.data.comments);
      setComments(response.data.comments || []);
    } catch (err) {
      console.log("Error fetching comments:", err);
    }
  }
  useEffect(() => {
    fetchComments();
  }, [])

  return (
    <div>
      {comments.map(comment => {
        <CommentsCard key={comment._id} comment={comment}/>
      })}
    </div>
  )
}

export default CommentsFeed