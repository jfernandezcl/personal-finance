import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../images/icon-LogOut.svg";
import profileIcon from "../images/icon-Profile.svg";

export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleEditProfile = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const storeUsername = localStorage.getItem("username");
    if (storeUsername) {
      setUsername(storeUsername);
    }
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="w-full bg-[#025963] shadow-md mb-8 relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-white text-xl font-bold">
          <a className="hover:text-gray-300" href="/dashboard">
            Personal Finance
          </a>
        </h1>
        <div className="relative">
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="focus:outline-none flex items-center gap-x-2"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-[#025963] font-bold rounded-full text-lg">
              {getInitials(username)}
            </div>
          </button>
          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 bg-gray-300 shadow-md rounded-lg w-64 dark:border border-gray-400 z-50"
              role="menu"
              ref={dropdownRef}
            >
              <div className="p-4 flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-400 text-[#025963] font-bold rounded-full text-xl">
                  {getInitials(username)}
                </div>
                <span className="ml-4 text-[#025963] font-semibold">
                  {username}
                </span>
              </div>
              <hr className="border-gray-400" />
              <button
                className="flex items-center space-x-4 p-4 text-[#025963] font-semibold w-full hover:bg-gray-400"
                onClick={handleEditProfile}
              >
                <img src={profileIcon} alt="Profile Icon" className="h-6 w-6" />
                <span>Manage your profile</span>
              </button>
              <hr className="border-gray-400" />
              <button
                className="flex items-center space-x-4 p-4 text-[#025963] font-semibold w-full  hover:bg-gray-400 "
                onClick={handleLogout}
              >
                <img src={logoutIcon} alt="Logout Icon" className="h-6 w-6" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
