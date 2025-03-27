import React, { useEffect, useState } from 'react';
import { FaRegStar, FaShare } from 'react-icons/fa6';
import { MdOutlineModeComment } from 'react-icons/md';

import { LuPencil } from "react-icons/lu";
import { AiFillDelete } from "react-icons/ai";

import StarRating from './StarRating';
import { useAuth } from '@/context/AuthContext';

import axios from 'axios';


const SnippetReview = ({ snippet, starStates, handleStar }) => {
  const [reviews, setReviews] = useState([]);

  const { user } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/snippet/${snippet._id}/reviews`);
        setReviews(response.data.review);
      } catch (err) {
        console.log('Error fetching reviews:', err);
      }
    };

    getReviews();
  }, [snippet._id]);

  if(userId === snippet.author) {
    return (
      <div className="mr-0 ml-auto flex gap-5 relative">
        <LuPencil size={20} className="text-white hover:text-yellow-500 cursor-pointer"/>
        <AiFillDelete size={24} className="text-white hover:text-red-500 cursor-pointer"/>
      </div>
    )
  } else {
    return (
      <div className="mr-0 ml-auto flex gap-5 relative">
        <StarRating snippetId={snippet._id} author={snippet.author} starStates={starStates} handleStar={handleStar} />
        <MdOutlineModeComment size={22} className="text-white hover:text-purple-500 cursor-pointer" />
        <FaShare size={22} className="text-white hover:text-purple-500 cursor-pointer" />
      </div>
    )
  }
};

export default SnippetReview;