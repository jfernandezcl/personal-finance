import { useEffect, useState } from "react";
import { changePasswordService } from "../infrastructure/user/changePasswordService";

import hideEye from "../images/hide-eye.svg";
import showEye from "../images/show-eye.svg";
import UpdatePasswordAlert from "../alerts/UpdatePasswordAlert";

import { useTranslation } from "react-i18next";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setIsGoogleUser(payload.provider === "google");
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  }, []);

  const handleSavePassword = async () => {
    if (!currentPassword || !newPassword || !repeatPassword) {
      setAlertMessage("Please fill in all fields.");
      setAlertType("error");
      return;
    }
    if (newPassword !== repeatPassword) {
      setAlertMessage("New password and repeat password do not match.");
      setAlertType("error");
      return;
    }
    try {
      await changePasswordService(currentPassword, newPassword);
      setAlertMessage("Password changed successfully.");
      setAlertType("success");

      setCurrentPassword("");
      setNewPassword("");
      setRepeatPassword("");
    } catch {
      setAlertMessage("Error changing password. Please try again.");
      setAlertType("error");
    }
  };

  return (
    <div className="p-5 mb-6 border border-gray-200 rounded-2xl lg:p-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-6">
        {t("personalInformation.password.title")}
      </h4>

      <UpdatePasswordAlert message={alertMessage} type={alertType} />

      {isGoogleUser && (
        <div className="mb-4 rounded-md bg-yellow-50 p-4 border border-yellow-200 text-sm text-yellow-800">
          {t("personalInformation.disable")}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t("personalInformation.password.current")}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm"
              placeholder="Enter your password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={isGoogleUser}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-2 text-sm"
            >
              <img
                src={showPassword ? showEye : hideEye}
                alt={showPassword ? "Show password" : "Hide password"}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t("personalInformation.password.new_input")}
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              placeholder={t("personalInformation.password.new_input")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isGoogleUser}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-2 text-sm"
            >
              <img
                src={showNewPassword ? showEye : hideEye}
                alt={showNewPassword ? "Show password" : "Hide password"}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t("personalInformation.password.repeat")}
          </label>
          <div className="relative">
            <input
              type={showRepeatPassword ? "text" : "password"}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
              placeholder={t("personalInformation.password.repeat")}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              disabled={isGoogleUser}
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className="absolute right-4 top-2 text-sm"
            >
              <img
                src={showRepeatPassword ? showEye : hideEye}
                alt={showRepeatPassword ? "Show password" : "Hide password"}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        <div>
          <button
            onClick={handleSavePassword}
            disabled={isGoogleUser}
            className={`inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium
              ${
                isGoogleUser
                  ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
          >
            {t("personalInformation.save")}
          </button>
        </div>
      </div>
    </div>
  );
}
