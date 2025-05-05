import { useState, useEffect } from "react";
import ErrorAlert from "../alerts/CompleteFields";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { fetchUserProfile } from "../infrastructure/user/fetchUserProfile";
import { updateUserProfile } from "../infrastructure/user/updateUserProfile";

export default function PersonalInformationModal({ isOpen, onClose, onSave }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const userId = getUserIdFromToken();

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await fetchUserProfile();
      if (userData) {
        setUsername(userData.username || "");
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
        setBio(userData.bio || "");
      }
    };

    if (isOpen) {
      loadUserData();
    } else {
      setUsername("");
      setEmail("");
      setPhone("");
      setBio("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveClick = async () => {
    const updatedUsername = username.trim();
    const updatedEmail = email.trim();
    const updatedPhone = phone.trim();
    const updatedBio = bio.trim();

    if (bio.trim().split(/\s+/).length > 50) {
      setError("La biografía no puede superar las 50 palabras.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const response = await updateUserProfile(
        userId,
        updatedUsername,
        updatedEmail,
        updatedPhone,
        updatedBio
      );
      if (!response.ok) throw new Error("Error updating profile");

      onSave(updatedUsername, updatedEmail, updatedPhone, updatedBio);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
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
        <h2 className="text-lg font-bold mb-4 text-black">
          Edit personal information
        </h2>

        <input
          type="text"
          placeholder="User name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black"
        />

        <input
          type="email"
          placeholder="E-mail address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black"
        />

        <input
          type="text"
          placeholder="Telephone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black"
        />

        <textarea
          placeholder="Biography (max. 50 words)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black resize-none"
          rows={4}
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
