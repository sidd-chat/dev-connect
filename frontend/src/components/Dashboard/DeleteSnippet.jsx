import React from 'react'
import { AiFillDelete } from "react-icons/ai";

import axios from 'axios';
import { useSnippets } from '@/context/SnippetsContext';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const DeleteSnippet = ({ snippetId }) => {
  const { setSnippets } = useSnippets();
  const [open, setOpen] = React.useState(false)

  const deleteSnippet = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/snippet/${snippetId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSnippets(prev => prev.filter(snippet => snippet._id !== snippetId))
    } catch (err) {
      console.log("Error Deleting Snippet:", err.response?.data || err.message);
    }
  }

  return (
    // <>
    //   <button onClick={deleteSnippet}>
    //     <AiFillDelete size={22} className="text-white hover:text-red-500 cursor-pointer"/>
    //   </button>
    // </>

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <AiFillDelete size={22} className="text-white hover:text-red-500 cursor-pointer" />
        </button>
      </DialogTrigger>

      {/* // ! The Cross in the top right corner of the dialog is not required. */}
      <DialogContent hideClose className="p-10 bg-neutral-950 border-1 border-neutral-500">
        <DialogHeader>
          <DialogTitle className='uppercase text-white'>Are you sure?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          This action cannot be undone. The snippet will be permanently deleted.
        </p>

        <DialogFooter>
          <Button variant="outline" className='cursor-pointer' onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" className='cursor-pointer' onClick={deleteSnippet}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteSnippet