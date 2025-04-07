import React, { useEffect, useState } from 'react';

import { FaRegStar } from 'react-icons/fa6';

import useStarRating from '@/hooks/useStarRating.hook';


const StarRating = ({ snippetId, starRating }) => {
  const { _ , handleStar } = useStarRating();
  const [showStars, setShowStars] = useState(false);
  const [selectedStar, setSelectedStar] = useState(starRating || 0);

  useEffect(() => {
    if (starRating !== undefined) {
      setSelectedStar(starRating);
    }
  }, [starRating]);

  return (
    <div className="relative">
      <FaRegStar
        size={22}
        className="text-white hover:text-yellow-600 cursor-pointer"
        onClick={() => setShowStars(curr => !curr)}
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