import React from 'react';

import { FaRegStar } from 'react-icons/fa6';

import { useAuth } from '@/context/AuthContext';


const StarRating = ({ snippetId, author, starStates, handleStar }) => {
  const starHover = starStates[snippetId]?.starHover || false;
  const selectedStar = starStates[snippetId]?.selectedStar || 0;

  const { userId } = useAuth();

  return (
    <div className="relative">
      <FaRegStar
        size={22}
        className="text-white hover:text-yellow-600 cursor-pointer"
        onMouseEnter={() => handleStar(snippetId, null, true)}
        onMouseLeave={() => handleStar(snippetId, null, false)}
      />

      {starHover && (
        <div className="absolute bottom-10 right-4.5 bg-transparent border-2 border-dashed p-3 shadow-lg rounded flex gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <FaRegStar
              key={num}
              className={`cursor-pointer text-xl ${num <= selectedStar ? 'fill-yellow-300' : 'text-gray-300'}`}
              onClick={() => handleStar(snippetId, num)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StarRating;