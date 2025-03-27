import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        axios.get(`http://localhost:5000/profile/${userId}`)
          .then(response => {
            setUser(response.data.userDetails);
          })
          .catch(error => {
            console.log('Error fetching user details:', error);
          })
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);
