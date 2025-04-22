import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  return children;
};

export default RequireAuth;
