import { useEffect, useState } from "react";
import editPencil from "../images/editPencil.svg";
import PersonalInformationModal from "./PersonalInformationModal";
import { fetchUserProfile } from "../infrastructure/user/fetchUserProfile";

import { useTranslation } from "react-i18next";

export default function PersonalInformation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadUserProfile = async () => {
      const userData = await fetchUserProfile();
      if (userData) {
        setUsername(userData.username || "");
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
        setBio(userData.bio || "");
      }
    };

    loadUserProfile();
  }, []);

  const handleSave = (newUsername, newEmail, newPhone, newBio) => {
    setUsername(newUsername);
    setEmail(newEmail);
    setPhone(newPhone);
    setBio(newBio);
    setIsModalOpen(false);
  };

  return (
    <div className="p-5 mb-6 border border-gray-200 rounded-2xl lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">
            {t("personalInformation.personal.title")}
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">
                {t("personalInformation.personal.username")}
              </p>
              <p className="text-sm font-medium text-gray-800">{username}</p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">
                {t("personalInformation.personal.email")}
              </p>
              <p className="text-sm font-medium text-gray-800">{email}</p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">
                {t("personalInformation.personal.phone")}
              </p>
              <p className="text-sm font-medium text-gray-800">{phone}</p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">
                {t("personalInformation.personal.biography")}
              </p>
              <p className="text-sm font-medium text-gray-800">{bio}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 
            text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 lg:inline-flex lg:w-auto"
        >
          <img
            className="fill-current"
            width="18"
            height="18"
            src={editPencil}
            alt="edit icon"
          />
          {t("common.edit")}
        </button>
      </div>
      <PersonalInformationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        username={username}
        email={email}
        phone={phone}
        bio={bio}
      />
    </div>
  );
}
