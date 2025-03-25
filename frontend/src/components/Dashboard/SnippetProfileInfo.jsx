import React from 'react'

const SnippetProfileInfo = ({ snippet }) => {
  return (
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
  )
}

export default SnippetProfileInfo