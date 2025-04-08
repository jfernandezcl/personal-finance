import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        // 🆕 Llamada al backend para verificar el token
        const res = await fetch("http://localhost:3001/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Token not valid");

        setIsValid(true);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsValid(false);
      }
    };

    verify();
  }, []);

  if (isValid === null) return <p>Loading...</p>; // 🆕 Espera a que se valide
  if (!isValid) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
