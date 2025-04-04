import React from 'react'
import SnippetProfileInfo from '../SnippetProfileInfo';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import StarRating from '../StarRating';
import { FaRegStar } from 'react-icons/fa6';
import useStarRating from '@/hooks/useStarRating.hook';

dayjs.extend(customParseFormat);

const CommentsCard = ({ commentDetails }) => {
  const { comment, createdAt, snippet, user, stars } = {...commentDetails};
  console.log(comment, user)
  const { starStates, handleStar } = useStarRating();

  return (
    <div className='w-full h-auto bg-neutral-900 rounded-xl rounded-br-none py-5 px-5 flex flex-col justify-between gap-5 my-10'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-2 items-center mx-1'>
          {Array.from({ length: 5 }, (_, num) => (
            <FaRegStar
              key={num}
              size={22}
              className={`text-xl ${num + 1 <= stars ? 'fill-yellow-500' : 'text-gray-300'}`}
            />
          ))}
        </div>

        <div>

        </div>
      </div>

      <h2 className='text-md text-white bg-neutral-800 p-4 rounded-md'>{comment}</h2>

      <div className='flex items-center justify-between text-xs px-1'>
        <SnippetProfileInfo author={user} />
        <p className='text-neutral-600'>{dayjs(createdAt).format('DD-MMM-YYYY')}</p>
      </div>
    </div>
  )
}

export default CommentsCard