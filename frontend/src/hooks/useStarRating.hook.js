import { useState } from 'react';

const useStarRating = () => {
  const [starStates, setStarStates] = useState({});

  const handleStar = (snippetId, rating, hover = null) => {
    setStarStates((prev) => ({
      ...prev,
      [snippetId]: {
        ...prev[snippetId],
        selectedStar: rating !== null ? rating : prev[snippetId]?.selectedStar || 0,
        starHover: hover !== null ? hover : prev[snippetId]?.starHover || false,
      },
    }));

    if (rating !== null) {
      // API call to update rating in DB
      console.log(`Updating rating for snippet ${snippetId} to ${rating}`);
    }
  };

  return { starStates, handleStar };
};

export default useStarRating;