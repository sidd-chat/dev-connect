import React, { useCallback, useEffect, useState } from 'react'

import { MdOutlineModeComment } from 'react-icons/md';
import { IoReturnUpBackOutline } from "react-icons/io5";
import { AiOutlineEnter } from "react-icons/ai";

import CommentsFeed from './CommentsFeed';
import axios from 'axios';


const Comments = ({ snippetId, title }) => {
  const [ toggleCommentsModal, setToggleCommentsModal ] = useState(false);
  const [ commentContent, setCommentContent ] = useState('');
  const [ comments, setComments ] = useState([]);

  const fetchComments = useCallback(
    async () => {
      try {
        const response = await axios.get(`http://localhost:5000/snippet/${snippetId}/reviews/comments`);
        setComments(response.data.comments || []);
      } catch (err) {
        console.log("Error fetching comments:", err);
      }
    },
    [snippetId],
  );
  useEffect(() => {
    fetchComments();
  }, [fetchComments])


  const addComment = async (e) => {
    e.preventDefault();

    if(!commentContent || commentContent.length === 0)
      return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/snippet/${snippetId}/reviews/post-comment`,
        {
          comment: commentContent
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
      });
      console.log("Comment Post Successful:", response.data);
      setComments(prevComments => [response.data.comment, ...prevComments]);
    } catch (err) {
      console.error("Error Posting Comment:", err);
    }
  }

  return (
    <main>
      <MdOutlineModeComment
        size={22}
        className="text-white hover:text-purple-500 cursor-pointer"
        onClick={() => setToggleCommentsModal(curr => !curr)}
      />

      {toggleCommentsModal && (
        // ! Check why transition is not working
        <div className={`${toggleCommentsModal ? "w-[30%]" : "w-0"} overflow-y-scroll transition-all duration-300 fixed z-10 top-0 right-0 w-[30%] h-screen bg-black p-10 flex flex-col`}>
          <div className='grow-1'>
            <div className='flex items-center justify-between'>
              <button
                className='h-12 w-12 rounded-full cursor-pointer hover:bg-neutral-900'
                onClick={() => setToggleCommentsModal(curr => !curr)}
              >
                <IoReturnUpBackOutline size={25} className='m-auto'/>
              </button>

              <h2 className='capitalize'>{title}</h2>
            </div>

            <hr className='my-8 border-2 border-dashed'/>

            <CommentsFeed snippetId={snippetId} comments={comments} setComments={setComments}/>
          </div>

          <div className='flex justify-between items-center bg-blue border-2 bottom-0 w-full px-5 py-3'>
            <textarea
              className='w-[80%] outline-none'
              // onSubmit={addComment}
              placeholder='Add Comment...'
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button
              className='cursor-pointer rounded-full hover:bg-neutral-900 h-10 w-10 flex items-center justify-center'
              onClick={(e) => {
                addComment(e);
                setCommentContent('');
              }}
            >
              <AiOutlineEnter />
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default Comments