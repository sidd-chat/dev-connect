import React, { useState } from 'react';

import { FaRegStar } from 'react-icons/fa6';

import { useAuth } from '@/context/AuthContext';


const StarRating = ({ snippetId, author, starStates, handleStar }) => {
  const [showStars, setShowStars] = useState(false);


  // Hide stars only if mouse leaves downward (not if moving towards stars)
  const handleMouseLeave = (e) => {
    // if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
    //   setShowStars(false);
    // }
  };

  const starHover = starStates[snippetId]?.starHover || false;
  const selectedStar = starStates[snippetId]?.selectedStar || 0;  // ! use author to init by first fetching snippet review

  const { user } = useAuth();
  const userId = user?._id;

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowStars(true)}
      onMouseLeave={handleMouseLeave}
    >
      <FaRegStar
        size={22}
        className="text-white hover:text-yellow-600 cursor-pointer"
      />

      {showStars && (
        <div className="absolute bottom-7 right-[-68px] bg-transparent border-2 border-dashed p-3 shadow-lg rounded flex gap-2"
        onMouseEnter={() => setShowStars(true)}
        onMouseLeave={() => setShowStars(false)}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <FaRegStar
              key={num}
              className={`cursor-pointer text-xl hover:text-yellow-300 ${num <= selectedStar ? 'fill-yellow-500' : 'text-gray-300'}`}
              onClick={() => handleStar(snippetId, num)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StarRating;