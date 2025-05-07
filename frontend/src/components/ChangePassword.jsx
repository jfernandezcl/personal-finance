import { useEffect, useState } from "react";
import { changePasswordService } from "../infrastructure/user/changePasswordService";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  // Decodifica el JWT para determinar el proveedor (provider)
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
    } catch {
      alert("Error changing password. Please try again.");
    }
  };

  return (
    <div className="p-5 mb-6 border border-gray-200 rounded-2xl lg:p-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-6">
        Change Password
      </h4>

      {isGoogleUser && (
        <div className="mb-4 rounded-md bg-yellow-50 p-4 border border-yellow-200 text-sm text-yellow-800">
          You signed up with Google and cannot change your password.
        </div>
      )}

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
              disabled={isGoogleUser}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600 hover:text-gray-900"
              disabled={isGoogleUser}
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
            disabled={isGoogleUser}
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
            disabled={isGoogleUser}
          />
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
            Save password
          </button>
        </div>
      </div>
    </div>
  );
}
