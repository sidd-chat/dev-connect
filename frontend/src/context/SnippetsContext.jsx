import { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";
import Loader from "@/components/Loader/Loader";

const SnippetsContext = createContext();

export const SnippetsProvider = ({ children }) => {
  const [snippetToEdit, setSnippetToEdit] = useState(null);
  const [snippets, setSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/all-snippets');
        setSnippets(response.data.snippets);
      } catch (error) {
        console.log("Error Fetching Snippets:", error);
      }
    }
    setIsLoading(curr => !curr);
    fetchSnippets();
    setIsLoading(curr => !curr);
  }, [])

  if(isLoading)
    return (
      <Loader message={'Loading Snippets...'}/>
    )

  return (
    <SnippetsContext.Provider
      value={{
        snippets,
        setSnippets,
        snippetToEdit,
        setSnippetToEdit,
      }}>
      {children}
    </SnippetsContext.Provider>
  )
};

export const useSnippets = () => useContext(SnippetsContext);