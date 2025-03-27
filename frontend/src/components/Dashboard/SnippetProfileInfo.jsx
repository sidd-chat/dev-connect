import React from 'react'
import useNavigateWithUser from '@/hooks/navigateToProfile.hook';

const SnippetProfileInfo = ({ snippet }) => {
  const { navigateToProfile } = useNavigateWithUser();

  return (
    <div className="flex gap-2 items-center cursor-pointer group" onClick={() => navigateToProfile(snippet.author._id)}>
      <img
        src={snippet.author.profilePicture || 'https://placehold.co/100x100/orange/black'}
        alt="user profile picture"
        className="w-12 h-12 rounded-xl"
      />

      <p className="text-sm text-neutral-400 group-hover:text-white group-hover:underline transition duration-100">
        {'@' + snippet.author.username}
      </p>
    </div>
  )
}

export default SnippetProfileInfo