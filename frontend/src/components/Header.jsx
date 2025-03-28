import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Header() {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  useEffect(() => {
    const storeUsername = localStorage.getItem("username");
    if (storeUsername) {
      setUsername(storeUsername);
    }
  }, []);

  // Obtener las iniciales del usuario
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="w-full bg-[#025963] shadow-md mb-8 relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-white text-xl font-bold">Personal Finance</h1>
        <button
          onClick={() => setModalOpen(!isModalOpen)}
          className="focus:outline-none"
        >
          {/* Foto de perfil con iniciales */}
          <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-[#025963] font-bold rounded-full text-lg">
            {getInitials(username)}
          </div>
        </button>
      </div>
      {isModalOpen && (
        // Capa de overlay para detectar clicks fuera de la modal
        <div className="fixed inset-0 z-10" onClick={() => setModalOpen(false)}>
          <div
            className="absolute top-24 right-60 bg-white rounded-md shadow p-6 w-52 border-2 border-[#025963]"
            onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer click dentro de la modal
          >
            <button
              className="flex items-center space-x-2 text-[#025963] font-semibold hover:text-[#02c16a] transition-all"
              onClick={() => {
                handleLogout();
                setModalOpen(false);
              }}
            >
              {/* Ícono para cerrar sesión */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-8V7"
                />
              </svg>
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
