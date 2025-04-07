import React from 'react'

import DeleteSnippet from './DeleteSnippet';
import EditSnippet from './EditSnippet';

const SnippetEditDelete = ({ snippet }) => {
  return (
    <div className="mr-0 ml-auto flex gap-5 relative items-center">
      <EditSnippet snippet={snippet}/>
      <DeleteSnippet snippetId={snippet._id}/>
    </div>
  )
}

export default SnippetEditDelete