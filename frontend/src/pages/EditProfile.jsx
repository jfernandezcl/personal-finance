import Header from "../components/Header";
import RequireAuth from "../authenticity/RequireAuth";
import { useState } from "react";

function EditProfile() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <RequireAuth>
      <Header />
      <div className="rounded-2xl border border-gray-200 bg-white p-6 max-w-6xl mx-auto shadow mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          {/* Titulo de la pagina */}
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

        {/* Caja de perfil y redes */}
        <div className="p-5 mb-6 border border-gray-200 rounded-2xl lg:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
              {/*imagen del perfil, por defecto las letras del nombre */}
              <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full">
                <img
                  className="object-cover w-full h-full"
                  src="https://i.pinimg.com/564x/4c/0b/2f/4c0b2f1a3d5e6a7d8e9f1a3d5e6a7d8.jpg"
                />
              </div>
              <div className="order-3 xl:order-2">
                <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 xl:text-left">
                  User name
                </h4>
                <p className="text-sm text-gray-600">Email</p>
              </div>
            </div>

            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
              <button
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300
               bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 lg:inline-flex lg:w-auto"
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Formulario de datos personales */}
        <div className="p-5 mb-6 border border-gray-200 rounded-2xl lg:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">
                Personal Information
              </h4>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500">
                    First Name
                  </p>
                  <p className="text-sm font-medium text-gray-800">Javi</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500">
                    Last Name
                  </p>
                  <p className="text-sm font-medium text-gray-800">Fdzcl</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500">
                    Email address
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    javier78@...gmail.com
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500">
                    Phone
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    6444585216
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500">
                    Biography
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    Team Manager
                  </p>
                </div>
              </div>
            </div>
            {/* Boton para editar los datos personales */}
            <button
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 
            text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 lg:inline-flex lg:w-auto"
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
              Edit
            </button>
          </div>
        </div>

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
