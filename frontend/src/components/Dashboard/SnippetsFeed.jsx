import React from 'react';

import Snippet from './Snippet';

import useStarRating from '../../hooks/useStarRating.hook';
import { useSnippets } from '@/context/SnippetsContext';

const SnippetsFeed = ({ snippetsProp }) => {
  const { snippets } = useSnippets();
  const { starStates, handleStar } = useStarRating();

  const snippetsToDisplay = snippetsProp || snippets;

  if (!snippetsToDisplay || snippetsToDisplay.length === 0) {
    return <p className="text-white m-auto uppercase">No snippets found. <span className='text-yellow-500'>Post one!</span></p>;
  }

  return (
    <div className="mx-auto py-5 text-white">
      {snippetsToDisplay.map((snippet) => (
        <Snippet key={snippet._id} snippet={snippet} starStates={starStates} handleStar={handleStar} />
      ))}
    </div>
  );
};

export default SnippetsFeed;
