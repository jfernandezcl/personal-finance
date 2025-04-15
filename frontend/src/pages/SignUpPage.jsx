import logo from "../images/logo.svg";
import iconEmail from "../images/icon-email.svg";
import iconPassword from "../images/icon-password.svg";
import iconGoogle from "../images/icon-google.svg";
import iconUser from "../images/icon-user.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorAlert from "../alerts/ErrorAlert";
import SuccessAlert from "../alerts/SuccessAlert";
import { useGoogleLogin } from "@react-oauth/google";

function SignUpPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar que las contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "The user already exists, enter other data");
        setTimeout(() => setError(""), 3000);
        return;
      }
      setSuccessMessage("Registration successful!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/dashboard");
      }, 2000);
    } catch {
      setError("Server error");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Función para gestionar el registro con Google
  const handleGoogleLogin = async (response) => {
    try {
      const googleToken = response.credential;
      const res = await fetch("http://localhost:3001/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Se envía la credencial a la API que se encargará de registrar (o loguear) al usuario
        body: JSON.stringify({ credential: googleToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError("Google registration failed. Please try again.");
        setTimeout(() => setError(""), 3000);
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      setSuccessMessage("Registration successful!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/dashboard");
      }, 1500);
    } catch {
      setError(
        "Server error during Google registration. Please try again later."
      );
      setTimeout(() => setError(""), 3000);
    }
  };

  // Configura el hook para el registro con Google
  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: () => {
      setError("Google registration failed. Please try again.");
      setTimeout(() => setError(""), 3000);
    },
  });

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 mt-20">
      <div className="rounded-sm bg-white shadow-default">
        <div className="flex flex-wrap items-center mt-10 pb-10">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <a className="mb-5.5 flex items-center justify-center gap-2">
                <img className="w-10 h-auto" src={logo} alt="logo" />
                <span className="text-lg font-semibold">Personal finances</span>
              </a>
              <p className="font-medium 2xl:px-20 mt-6">
                Manage your personal finances easily and efficiently.
              </p>
              <span className="mt-20 inline-block">
                <img
                  className="w-[350px] h-[350px]"
                  src="src/images/mobile-illustration.svg"
                  alt="illustration"
                />
              </span>
            </div>
          </div>
          <div className="w-full border-stroke xl:w-1/2 xl:border-l-2 px-[70px]">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium text-[#788596]">
                Start for free
              </span>
              <h2 className="mb-9 text-2xl font-bold text-black sm:text-title-xl2">
                Sign Up to Personal finances
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                      onChange={handleChange}
                      value={formData.username}
                    />
                    <span className="absolute right-4 top-4">
                      <img
                        className="fill-current"
                        width="22"
                        height="22"
                        src={iconUser}
                        alt="user icon"
                      />
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                      onChange={handleChange}
                      value={formData.email}
                    />
                    <span className="absolute right-4 top-4">
                      <img
                        className="fill-current"
                        width="22"
                        height="22"
                        src={iconEmail}
                        alt="email icon"
                      />
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                      onChange={handleChange}
                      value={formData.password}
                    />
                    <span className="absolute right-4 top-4">
                      <img
                        className="fill-current"
                        width="22"
                        height="22"
                        src={iconPassword}
                        alt="password icon"
                      />
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                      onChange={handleChange}
                      value={formData.confirmPassword}
                    />
                    <span className="absolute right-4 top-4">
                      <img
                        className="fill-current"
                        width="22"
                        height="22"
                        src={iconPassword}
                        alt="password icon"
                      />
                    </span>
                  </div>
                </div>
                <div className="mb-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-[#025963] bg-[#025963] p-4 font-medium text-white transition hover:bg-opacity-90"
                  >
                    Create account
                  </button>
                </div>
                <div className="mb-5">
                  <button
                    type="button"
                    onClick={googleLogin}
                    className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-[#D1D5DB] bg-[#E2E8F0] p-4 font-medium text-[#788596] hover:bg-opacity-70"
                  >
                    <span>
                      <img
                        className="fill-current"
                        width="20"
                        height="20"
                        src={iconGoogle}
                        alt="google icon"
                      />
                    </span>
                    Sign in with Google
                  </button>
                </div>
                <div className="mt-6 text-center">
                  <p className="font-medium text-[#788596]">
                    Already have an account?
                    <a
                      href="/"
                      className="text-[#025963] underline cursor-pointer"
                    >
                      {" "}
                      Sign in
                    </a>
                  </p>
                </div>
              </form>
              <ErrorAlert error={error} onClose={() => setError("")} />
              {successMessage && (
                <SuccessAlert
                  message={successMessage}
                  onClose={() => setSuccessMessage("")}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
