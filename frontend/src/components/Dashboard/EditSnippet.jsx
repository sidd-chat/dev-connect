import { useSnippets } from '@/context/SnippetsContext';
import React from 'react'
import { LuPencil } from 'react-icons/lu'

const EditSnippet = ({ snippet }) => {
  const { setSnippetToEdit } = useSnippets();

  const handleEdit = () => {
    setSnippetToEdit(snippet);
  };

  return (
    <button onClick={handleEdit}>
      <LuPencil size={18}className="text-white hover:text-yellow-500 cursor-pointer" />
    </button>
  )
}

export default EditSnippet