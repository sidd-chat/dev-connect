import React from 'react'
import CommentsCard from './CommentsCard';

const CommentsFeed = ({ snippetId, comments }) => {

  return (
    <div>
      {comments.map(comment => {
        return <CommentsCard key={comment?._id} commentDetails={comment}/>
      })}
    </div>
  )
}

export default CommentsFeed