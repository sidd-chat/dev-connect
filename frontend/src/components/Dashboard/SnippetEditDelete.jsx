import React from 'react'

import { LuPencil } from "react-icons/lu";
import DeleteSnippet from './DeleteSnippet';

const SnippetEditDelete = ({ snippetId }) => {
  return (
    <div className="mr-0 ml-auto flex gap-5 relative items-center">
      <LuPencil size={20} className="text-white hover:text-yellow-500 cursor-pointer"/>
      <DeleteSnippet snippetId={snippetId}/>
    </div>
  )
}

export default SnippetEditDelete