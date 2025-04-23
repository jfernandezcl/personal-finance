import { useEffect, useState } from "react";
import ErrorAlert from "../alerts/CompleteFields";

export default function ProfileUserNameModal({ isOpen, onClose, onSave }) {
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      const storedUsername = localStorage.getItem("username") || "";
      setNewUsername(storedUsername);
    } else {
      setNewUsername("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveClick = () => {
    if (!newUsername.trim()) {
      setError("Username is required.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    onSave(newUsername.trim());
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-black">Edit Username</h2>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="px-4 py-2 bg-[#025963] text-white rounded hover:bg-[#013f48] transition-colors"
          >
            Save
          </button>
        </div>
        {error && <ErrorAlert error={error} onClose={() => setError("")} />}
      </div>
    </div>
  );
}
