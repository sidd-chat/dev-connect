import React, { useEffect, useState } from 'react';
import { FaShare } from 'react-icons/fa6';

import StarRating from './StarRating';

import axios from 'axios';
import Comments from './Comments/Comments';
import { useAuth } from '@/context/AuthContext';


const SnippetReview = ({ snippet }) => {
  const { user } = useAuth();
  const [ review , setReview] = useState([]);
  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/snippet/${snippet._id}/reviews`);

        const userReviews = response.data.reviews.filter(review => review.user === user._id && review.snippet === snippet._id);
        console.log(userReviews)
        setReview(userReviews.filter(review => review && review.stars)[0]);
      } catch (err) {
        console.log('Error fetching reviews:', err);
      }
    };

    getReviews();
  }, [snippet._id, user]);

  return (
    <div className="mr-0 ml-auto flex gap-5">
      <StarRating snippetId={snippet._id} starRating={review?.stars || 0} />
      <Comments snippetId={snippet._id} title={snippet.title}/>
      <FaShare size={22} className="text-white hover:text-purple-500 cursor-pointer" />
    </div>
  )
};

export default SnippetReview;