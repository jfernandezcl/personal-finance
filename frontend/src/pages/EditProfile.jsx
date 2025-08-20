import Header from "../components/Header";
import ProtectedRoute from "../authenticity/ProtectedRoute";

import ProfileUserName from "../components/ProfileUserName";
import PersonalInformation from "../components/PersonalInformation";
import ChangePassword from "../components/ChangePassword";
import DeleteAccount from "../infrastructure/user/DeleteAccount";

import { useTranslation } from "react-i18next";

function EditProfile() {
  const { t, i18n } = useTranslation();

  return (
    <ProtectedRoute>
      <Header />
      <div className="rounded-2xl border border-gray-200 bg-white p-6 max-w-6xl mx-auto shadow mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            {t("common.profile")}
          </h3>
          <nav>
            <a
              className="inline-flex items-center gap-1.5 text-lg text-gray-400 hover:text-gray-800"
              href="/dashboard"
            >
              {t("common.home")}
            </a>
          </nav>
        </div>

        <ProfileUserName />

        <PersonalInformation />

        <ChangePassword />

        <DeleteAccount />
      </div>
    </ProtectedRoute>
  );
}

export default EditProfile;
