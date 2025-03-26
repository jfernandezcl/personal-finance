import { useState } from "react";
import iconEmail from "../images/icon-email.svg";
import iconPassword from "../images/icon-password.svg";
import iconGoogle from "../images/icon-google.svg";
import logo from "../images/logo.svg";
import ErrorAlert from "../alerts/ErrorAlert";
import SuccessAlert from "../alerts/SuccessAlert";
import { useNavigate } from "react-router";

function WelcomePage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError("Invalid credentials");
        setTimeout(() => setError(""), 3000);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      setSuccess("Login successful!");
      setTimeout(() => {
        setSuccess("");
        navigate("/dashboard"); // Redirigir al dashboard
      });
    } catch {
      setError("Server error. Please try again later.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 mt-20">
      {/* Alertas */}
      {error && <ErrorAlert error={error} onClose={() => setError("")} />}
      {success && (
        <SuccessAlert message={success} onClose={() => setSuccess("")} />
      )}

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
                Sign in to Personal finances
              </h2>
              {/* Formulario con `onSubmit` */}
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border 
                      border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary 
                      focus-visible:shadow-none"
                      required
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
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="6+ Characters, 1 Capital letter"
                      className="w-full rounded-lg border 
                      border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary 
                      focus-visible:shadow-none"
                      required
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
                  <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg 
                    border border-[#025963] bg-[#025963] p-4 font-medium text-white transition 
                    hover:bg-opacity-90"
                  />
                </div>
                <button
                  className="flex w-full items-center justify-center gap-3.5 rounded-lg 
                  border border-[#D1D5DB] bg-[#E2E8F0] p-4 font-medium text-[#788596] 
                  hover:bg-opacity-70"
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
                <div className="mt-6 text-center">
                  <p className="font-medium text-[#788596]">
                    Register new account
                    <a
                      href="/signup"
                      className="text-[#025963] underline cursor-pointer"
                    >
                      {" "}
                      Sign Up
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
