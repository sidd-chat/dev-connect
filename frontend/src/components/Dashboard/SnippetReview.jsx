import React from 'react'
import { FaRegStar, FaShare } from 'react-icons/fa6'
import { MdOutlineModeComment } from 'react-icons/md'

const SnippetReview = ({ snippet, setStarStates, starHover, selectedStar, handleStar }) => {
  return (
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
  )
}

export default SnippetReview