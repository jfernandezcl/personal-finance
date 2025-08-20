import logo from "../images/logo.svg";
import iconEmail from "../images/icon-email.svg";
import iconGoogle from "../images/icon-google.svg";
import iconUser from "../images/icon-user.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorAlert from "../alerts/ErrorAlert";
import SuccessAlert from "../alerts/SuccessAlert";
import { GoogleLogin } from "@react-oauth/google";

import hideEye from "../images/hide-eye.svg";
import showEye from "../images/show-eye.svg";

import { useTranslation } from "react-i18next";

function SignUpPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { t, i18n } = useTranslation();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(t("messages.errors.password_error"));
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
        setError(data.message || t("messages.errors.data_message"));
        setTimeout(() => setError(""), 3000);
        return;
      }
      setSuccessMessage(t("success.registration_successful"));
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/dashboard");
      }, 2000);
    } catch {
      setError(t("messages.errors.server_error"));
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(t("messages.errors.google_failed"));
        setTimeout(() => setError(""), 3000);
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      setSuccess(t("messages.success.login_successful"));
      setTimeout(() => {
        setSuccess("");
        navigate("/dashboard");
      }, 1500);
    } catch {
      setError(t("messages.errors.error_google_login"));
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 mt-20">
      {error && <ErrorAlert error={error} onClose={() => setError("")} />}
      {success && (
        <SuccessAlert message={success} onClose={() => setSuccess("")} />
      )}
      {successMessage && (
        <SuccessAlert
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}
      <div className="rounded-sm bg-white shadow-default">
        <div className="flex flex-wrap items-center mt-4 pb-10">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <a className="mb-5.5 flex items-center justify-center gap-2">
                <img className="w-10 h-auto" src={logo} alt="logo" />
                <span className="text-lg font-semibold">
                  {t("common.appName")}
                </span>
              </a>
              <p className="font-medium 2xl:px-20 mt-6">
                {t("common.information")}
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
            <div className="flex justify-end">
              <button
                className="px-4 py-1 m-2 cursor-pointer rounded-lg border border-[#025963] bg-[#025963] p- font-medium text-white transition hover:bg-opacity-90"
                onClick={() => i18n.changeLanguage("en")}
              >
                EN
              </button>
              <button
                className="px-4 py-1 m-2 cursor-pointer rounded-lg border border-[#025963] bg-[#025963] p- font-medium text-white transition hover:bg-opacity-90"
                onClick={() => i18n.changeLanguage("es")}
              >
                ES
              </button>
            </div>
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium text-[#788596]">
                {t("common.start")}
              </span>
              <h2 className="mb-9 text-2xl font-bold text-black sm:text-title-xl2">
                {t("signUpPage.signupTitle")}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black">
                    {t("common.name.label")}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      placeholder={t("common.name.placeholder")}
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
                    {t("common.email.label")}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder={t("common.email.placeholder")}
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
                    {t("common.password.label")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder={t("common.password.placeholder")}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                      onChange={handleChange}
                      value={formData.password}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-5 text-sm"
                    >
                      <img
                        src={showPassword ? showEye : hideEye}
                        alt={showPassword ? "Show password" : "Hide password"}
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black">
                    {t("signUpPage.repeatPassword.label")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder={t("signUpPage.repeatPassword.placeholder")}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                      onChange={handleChange}
                      value={formData.confirmPassword}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-5 text-sm"
                    >
                      <img
                        src={showPassword ? showEye : hideEye}
                        alt={showPassword ? "Show password" : "Hide password"}
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </div>
                <div className="mb-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-[#025963] bg-[#025963] p-4 font-medium text-white transition hover:bg-opacity-90"
                  >
                    {t("signUpPage.create")}
                  </button>
                </div>

                <div className="mb-5">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      setError("Google login failed");
                      setTimeout(() => setError(""), 3000);
                    }}
                    useOneTap
                    render={(renderProps) => (
                      <button
                        type="button"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
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
                      </button>
                    )}
                  />
                </div>
                <div className="mt-6 text-center">
                  <p className="font-medium text-[#788596]">
                    {t("signUpPage.login")}
                    <a
                      href="/"
                      className="text-[#025963] underline cursor-pointer"
                    >
                      {" "}
                      {t("signUpPage.signin")}
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

export default SignUpPage;
