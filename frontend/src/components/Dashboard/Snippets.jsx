import React, { useState } from 'react';

import { FaRegStar } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import { FaShare } from "react-icons/fa6";

import Editor from '../CodeEditor/Editor';

const Snippets = ({ snippets }) => {
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
        const selectedStar = starStates[snippet._id]?.selectedStar || 3;

        return (
          <div
            key={snippet._id}
            className="p-5 mb-4 bg-black rounded-xl shadow-lg flex flex-col px-10 pt-10 pb-5 border-2"
          >
            <h2 className="text-xl font-semibold mb-5">{snippet.title}</h2>

            <Editor code={snippet.snippetCode} setCode={() => {}} readOnly={true} />

            {snippet.caption && <h3 className="text-sm font-light mt-5">{snippet.caption}</h3>}

            <div className="flex items-center justify-between mt-10 mb-5">
              <div className="flex gap-2 items-center cursor-pointer group">
                <img
                  src={snippet.author?.profilePicture || 'https://placehold.co/100x100/orange/black'}
                  alt="user profile picture"
                  className="w-12 h-12 rounded-xl"
                />
                <p className="text-sm text-neutral-400 group-hover:text-white group-hover:underline transition duration-100">
                  {'@' + snippet.author?.username}
                </p>
              </div>

              <div className="mr-0 ml-auto flex gap-5 relative">
                <FaRegStar
                  size={22}
                  className="text-white hover:text-yellow-600 cursor-pointer"
                  onMouseEnter={() =>
                    setStarStates((prev) => ({
                      ...prev,
                      [snippet._id]: { ...prev[snippet._id], starHover: true },
                    }))
                  }
                />

                {starHover && (
                  <div
                    className="absolute bottom-10 right-4.5 bg-transparent border-2 border-dashed p-3 shadow-lg rounded flex gap-2"
                    onMouseLeave={() =>
                      setStarStates((prev) => ({
                        ...prev,
                        [snippet._id]: { ...prev[snippet._id], starHover: false },
                      }))
                    }
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <FaRegStar
                        key={num}
                        className={`cursor-pointer text-xl bg-purple opacity-100 ${
                          num <= selectedStar ? 'fill-yellow-300' : 'text-gray-300'
                        }`}
                        onClick={() => handleStar(snippet._id, num)}
                      />
                    ))}
                  </div>
                )}

                <MdOutlineModeComment size={22} className="text-white hover:text-purple-500 cursor-pointer" />
                <FaShare size={22} className="text-white hover:text-purple-500 cursor-pointer" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Snippets;