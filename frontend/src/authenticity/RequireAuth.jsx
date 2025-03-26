import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (!user) {
      navigate("/"); // Redirige al WelcomePage si no hay usuario
    }
  }, [navigate]);

  return children;
};

export default RequireAuth;
