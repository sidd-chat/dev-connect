import React from 'react';

import Editor from '../CodeEditor/Editor';
import SnippetReview from './SnippetReview';
import SnippetProfileInfo from './SnippetProfileInfo';

import { useAuth } from '@/context/AuthContext';
import SnippetEditDelete from './SnippetEditDelete';

const Snippet = ({ snippet, starStates, handleStar }) => {
  const { user } = useAuth();
  const userId = user?._id;

  return (
    <div className="p-5 mb-4 bg-black rounded-xl shadow-lg flex flex-col px-10 pt-10 pb-5 border-2">
      <h2 className="text-xl font-semibold mb-5 capitalize">{snippet.title}</h2>

      <Editor code={snippet.snippetCode} setCode={() => {}} readOnly />

      {snippet.caption && (
        <h3 className="text-sm font-light mt-5 text-neutral-300 bg-neutral-950 p-5 rounded-lg">
          {snippet.caption}
        </h3>
      )}

      <div className="flex items-center justify-between mt-10 mb-5">
        {snippet.author?.username && <SnippetProfileInfo author={snippet.author} />}

        {/* // ! Not working on Profile Page */}
        {userId === snippet?.author?._id ?
        <SnippetEditDelete snippetId={snippet._id}/>
        :
        <SnippetReview snippet={snippet} starStates={starStates} handleStar={handleStar} />
        }
      </div>
    </div>
  );
};

export default Snippet;