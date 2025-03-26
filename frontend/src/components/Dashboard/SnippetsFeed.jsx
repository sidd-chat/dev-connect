import React from 'react';

import Snippet from './Snippet';

import useStarRating from '../../hooks/useStarRating.hook';

const SnippetsFeed = ({ snippets }) => {
  const { starStates, handleStar } = useStarRating();

  return (
    <div className="mx-auto py-5 text-white">
      {snippets.map((snippet) => (
        <Snippet key={snippet._id} snippet={snippet} starStates={starStates} handleStar={handleStar} />
      ))}
    </div>
  );
};

export default SnippetsFeed;
