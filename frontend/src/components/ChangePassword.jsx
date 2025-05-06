import { useState } from "react";
import { changePasswordService } from "../infrastructure/user/changePasswordService";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSavePassword = async () => {
    if (!currentPassword || !newPassword || !repeatPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== repeatPassword) {
      alert("New password and repeat password do not match.");
      return;
    }

    try {
      await changePasswordService(currentPassword, newPassword);
      alert("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setRepeatPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password. Please try again.");
    }
  };

  return (
    <div className="p-5 mb-6 border border-gray-200 rounded-2xl lg:p-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-6">
        Change Password
      </h4>
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Current password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm"
              placeholder="Enter your password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            New password
          </label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Repeat new password
          </label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            placeholder="Repeat the password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>

        <div>
          <button
            className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white 
        px-6 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50"
            onClick={handleSavePassword}
          >
            Save password
          </button>
        </div>
      </div>
    </div>
  );
}
