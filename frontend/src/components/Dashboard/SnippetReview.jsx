import React, { useEffect, useState } from 'react';
import { FaRegStar, FaShare } from 'react-icons/fa6';

import StarRating from './StarRating';

import axios from 'axios';
import Comments from './Comments/Comments';


const SnippetReview = ({ snippet, starStates, handleStar }) => {
  const [reviews, setReviews] = useState([]);
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

  return (
    <div className="mr-0 ml-auto flex gap-5">
      <StarRating snippetId={snippet._id} author={snippet.author} starStates={starStates} handleStar={handleStar} />
      <Comments snippetId={snippet._id} title={snippet.title}/>
      <FaShare size={22} className="text-white hover:text-purple-500 cursor-pointer" />
    </div>
  )
};

export default SnippetReview;