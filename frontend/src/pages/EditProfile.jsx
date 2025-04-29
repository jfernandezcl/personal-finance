import Header from "../components/Header";
import RequireAuth from "../authenticity/RequireAuth";
import { useState } from "react";

import ProfileUserName from "../components/ProfileUserName";
import PersonalInformation from "../components/PersonalInformation";

function EditProfile() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <RequireAuth>
      <Header />
      <div className="rounded-2xl border border-gray-200 bg-white p-6 max-w-6xl mx-auto shadow mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
          <nav>
            <a
              className="inline-flex items-center gap-1.5 text-lg text-gray-400 hover:text-gray-800"
              href="/dashboard"
            >
              Home
            </a>
          </nav>
        </div>

        {/* Caja de perfil-nombre */}
        <ProfileUserName />

        {/* Caja de información personal */}
        <PersonalInformation />

        {/* Formulario de cambiar contraseña */}
        <div className="p-5 mb-6 border border-gray-200 rounded-2xl lg:p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-6">
            Change Password
          </h4>
          <div className="space-y-5">
            {/* Contraseña actual */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Current password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm"
                  placeholder="Enter your password"
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

            {/* Nueva contraseña */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                New password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                placeholder="New password"
              />
            </div>

            {/* Confirmar nueva contraseña */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Repeat new password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                placeholder="Repeat the password"
              />
            </div>

            {/* Botón para confirmar cambio */}
            <div>
              <button
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white 
        px-6 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50"
              >
                Save password
              </button>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}

export default EditProfile;
