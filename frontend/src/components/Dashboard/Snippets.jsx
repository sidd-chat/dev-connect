import React from 'react';

import Editor from '../CodeEditor/Editor';
import SnippetReview from './SnippetReview';
import SnippetProfileInfo from './SnippetProfileInfo';

const Snippets = ({ snippet, starHover, selectedStar, setStarStates, handleStar }) => {
  return (
    <div className="p-5 mb-4 bg-black rounded-xl shadow-lg flex flex-col px-10 pt-10 pb-5 border-2">
      <h2 className="text-xl font-semibold mb-5 capitalize">{snippet.title}</h2>

      <Editor code={snippet.snippetCode} setCode={() => {}} readOnly={true} />

      {snippet.caption && (
        <h3 className="text-sm font-light mt-5 text-neutral-300 bg-neutral-950 p-5 rounded-lg">
          {snippet.caption}
        </h3>
      )}

      <div className="flex items-center justify-between mt-10 mb-5">
        <SnippetProfileInfo snippet={snippet}/>

        <SnippetReview snippet={snippet} setStarStates={setStarStates} starHover={starHover} selectedStar={selectedStar} handleStar={handleStar}/>
      </div>
    </div>
  );
}

export default Snippets