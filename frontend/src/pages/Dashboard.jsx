import React from "react";
import { useNavigate } from "react-router";

function Dashboard() {
  let userName = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    //Eliminar datos del localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    navigate("/");
  }

  return (
    <div>
      <h1>Bienvenido {userName ? userName : "al Dashboard"}</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >Log out</button>
    </div>
  );
}

export default Dashboard;
