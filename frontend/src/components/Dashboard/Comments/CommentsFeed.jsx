import React from 'react'
import CommentsCard from './CommentsCard';

const CommentsFeed = ({ snippetId, comments, setComments }) => {

  return (
    <div>
      {comments.map(comment => {
        return <CommentsCard key={comment?._id} commentDetails={comment} setComments={setComments}/>
      })}
    </div>
  )
}

export default CommentsFeed