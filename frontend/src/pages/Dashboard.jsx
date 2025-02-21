import React from "react";

function Dashboard() {
  let userName = localStorage.getItem("username");

  return (
    <div>
      <h1>Bienvenido {userName ? userName : "al Dashboard"}</h1>
    </div>
  );
}

export default Dashboard;
