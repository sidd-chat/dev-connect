import { useState } from 'react';

import axios from 'axios';

const useStarRating = () => {
  const [starStates, setStarStates] = useState({});

  const handleStar = async (snippetId, rating, hover = null) => {
    setStarStates((prev) => ({
      ...prev,
      [snippetId]: {
        ...prev[snippetId],
        selectedStar: rating !== null ? rating : prev[snippetId]?.selectedStar || 0,
        starHover: hover !== null ? hover : prev[snippetId]?.starHover || false,
      },
    }));

    if (rating !== null) {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.post(
          `http://localhost:5000/snippet/${snippetId}/reviews/post-star`,
          { starRating: rating },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log(`Updating rating for snippet ${snippetId} to ${rating}`, response.data);
      } catch (err) {
        if(err.response.status !== 409) {
          console.log('Error Updating Rating:', err.response.data);
          return;
        }

        const token = localStorage.getItem('token');

        const response = await axios.put(
          `http://localhost:5000/snippet/${snippetId}/reviews/update-star`,
          { starRating: rating },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log(`Updating rating for snippet ${snippetId} to ${rating}`, response.data);
      }
    }
  };

  return { starStates, handleStar };
};

export default useStarRating;