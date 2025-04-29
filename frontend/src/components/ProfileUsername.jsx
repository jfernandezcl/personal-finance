import { useEffect, useState } from "react";
import editPencil from "../images/editPencil.svg";
import ProfileUserNameModal from "./ProfileUsernameModal";

export default function ProfileUserName() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storeUsername = localStorage.getItem("username");
    const storeEmail = localStorage.getItem("email");

    if (storeUsername) setUsername(storeUsername);
    if (storeEmail) setEmail(storeEmail);
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
    setIsModalOpen(false);
  };

  return (
    <div className="p-5 mb-6 border border-gray-200 rounded-2xl lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div className="w-20 h-20 flex items-center justify-center bg-gray-300 text-[#025963] font-bold rounded-full text-3xl">
            {getInitials(username)}
          </div>

          <div className="order-3 xl:order-2">
            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 xl:text-left">
              {username}
            </h4>
            <p className="text-sm text-gray-600">{email}</p>
          </div>
        </div>

        <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300
         bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 lg:inline-flex lg:w-auto"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            <img
              className="fill-current"
              width="18"
              height="18"
              src={editPencil}
              alt="edit icon"
            ></img>
            Edit
          </button>
        </div>
      </div>
      {/*Modal*/}
      <ProfileUserNameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
