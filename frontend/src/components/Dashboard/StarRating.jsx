import React, { useEffect, useState } from 'react';

import { FaRegStar } from 'react-icons/fa6';

import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import useStarRating from '@/hooks/useStarRating.hook';


const StarRating = ({ snippetId, author, starRating }) => {
  const { starStates, handleStar } = useStarRating();
  const [showStars, setShowStars] = useState(false);
  const { user } = useAuth();
  const userId = user?._id;
  const [selectedStar, setSelectedStar] = useState(starRating || 0);
  const [isLoading, setIsLoading] = useState(!starRating);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:5000/snippet/${snippetId}/reviews/get-stars`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        // Find the user's review in the snippet's reviews array
        if (response.data && response.data.reviews) {
          // Find the user's review in the reviews array
          const userReview = response.data.reviews.find(
            review => review.user && review.user._id === userId
          );

          if (userReview) {
            setSelectedStar(userReview.stars || 0);
          }
        }
      } catch (err) {
        console.error("Error fetching stars rating: ", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (userId && !starRating) {
      fetchStars();
    }
  }, [snippetId, userId, starRating]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative" onClick={() => setShowStars(curr => !curr)}>
      <FaRegStar
        size={22}
        className="text-white hover:text-yellow-600 cursor-pointer"
      />

      {showStars && (
        <div
          className="absolute bottom-7 right-[-68px] bg-transparent border-2 border-dashed p-3 shadow-lg rounded flex gap-2"
          onMouseEnter={() => setShowStars(true)}
          onMouseLeave={() => setShowStars(false)}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <FaRegStar
              key={num}
              className={`cursor-pointer text-xl hover:text-yellow-300 ${num <= selectedStar ? 'fill-yellow-500' : 'text-gray-300'}`}
              onClick={() => {
                handleStar(snippetId, num);
                setSelectedStar(num);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StarRating;