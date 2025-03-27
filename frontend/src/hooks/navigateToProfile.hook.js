import { useNavigate } from "react-router-dom";

const useNavigateWithUser = () => {
  const navigate = useNavigate();

  const navigateToProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return { navigateToProfile };
};

export default useNavigateWithUser;
