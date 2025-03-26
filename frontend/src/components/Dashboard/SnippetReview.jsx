import React, { useEffect, useState } from 'react';
import { FaRegStar, FaShare } from 'react-icons/fa6';
import { MdOutlineModeComment } from 'react-icons/md';

import StarRating from './StarRating';
import { useAuth } from '@/context/AuthContext';

import axios from 'axios';


const SnippetReview = ({ snippet, starStates, handleStar }) => {
  const [reviews, setReviews] = useState([]);

  const { userId } = useAuth();

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

  if(userId === snippet._id) {
    return (
      <div className="mr-0 ml-auto flex gap-5 relative">
        <h2>Edit Note</h2>
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