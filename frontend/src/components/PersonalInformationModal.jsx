import { useState, useEffect } from "react";
import ErrorAlert from "../alerts/CompleteFields";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { fetchUserProfile } from "../infrastructure/user/fetchUserProfile";
import { updateUserProfile } from "../infrastructure/user/updateUserProfile";

import { useTranslation } from "react-i18next";

export default function PersonalInformationModal({ isOpen, onClose, onSave }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const userId = getUserIdFromToken();

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const { t, i18n } = useTranslation();

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
    let hasError = false;
    setUsernameError("");
    setEmailError("");
    setError("");

    const updatedUsername = username.trim();
    const updatedEmail = email.trim();
    const updatedPhone = phone.trim();
    const updatedBio = bio.trim();

    if (!updatedUsername) {
      setUsernameError(t("messages.errors.required_name"));
      hasError = true;
    }

    if (!updatedEmail) {
      setEmailError(t("messages.errors.required_email"));
      hasError = true;
    }

    if (bio.trim().split(/\s+/).length > 50) {
      setError(t("messages.errors.biography"));
      setTimeout(() => setError(""), 3000);
      hasError = true;
    }
    if (hasError) return;

    try {
      const response = await updateUserProfile(
        userId,
        updatedUsername,
        updatedEmail,
        updatedPhone,
        updatedBio
      );
      if (!response.ok) throw new Error(t("messages.errors.profile_error"));

      onSave(updatedUsername, updatedEmail, updatedPhone, updatedBio);
    } catch (error) {
      console.error(t("messages.errors.profile_error"), error);
      setError(t("messages.errors.update_error"));
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
          {t("personalInformation.personal.edit_title")}
        </h2>

        <input
          type="text"
          placeholder={t("personalInformation.personal.placeholder_name")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black"
        />
        {usernameError && (
          <p className="text-red-500 text-sm mb-2">{usernameError}</p>
        )}

        <input
          type="email"
          placeholder={t("personalInformation.personal.placeholder_email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black"
        />
        {emailError && (
          <p className="text-red-500 text-sm mb-2">{emailError}</p>
        )}

        <input
          type="text"
          placeholder={t("personalInformation.personal.placeholder_telephone")}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black"
        />

        <textarea
          placeholder={t("personalInformation.personal.placeholder_biography")}
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
            {t("personalInformation.cancel")}
          </button>
          <button
            onClick={handleSaveClick}
            className="px-4 py-2 bg-[#025963] text-white rounded hover:bg-[#013f48] transition-colors"
          >
            {t("personalInformation.save")}
          </button>
        </div>
        {error && <ErrorAlert error={error} onClose={() => setError("")} />}
      </div>
    </div>
  );
}
