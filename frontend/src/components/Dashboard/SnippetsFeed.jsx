import React, { useState } from 'react';

import Snippet from './Snippet';

const SnippetsFeed = ({ snippets }) => {
  const [starStates, setStarStates] = useState({}); // Stores starHover & selectedStar per snippet

  const handleStar = (snippetId, rating) => {
    setStarStates((prev) => ({
      ...prev,
      [snippetId]: { ...prev[snippetId], selectedStar: rating, starHover: false },
    }));

    // API call to update rating in DB
  };

  return (
    <div className="mx-auto py-5 text-white">
      {snippets.map((snippet) => {
        const starHover = starStates[snippet._id]?.starHover || false;
        const selectedStar = starStates[snippet._id]?.selectedStar || 0;

        return (
          <Snippet
            key={snippet._id}
            snippet={snippet}
            starHover={starHover}
            selectedStar={selectedStar}
            setStarStates={setStarStates}
            handleStar={handleStar}/>
        );
      })}
    </div>
  );
};

export default SnippetsFeed;