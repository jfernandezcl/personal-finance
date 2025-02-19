import logo from '../images/logo.svg'
import iconEmail from '../images/icon-email.svg'
import iconPassword from '../images/icon-password.svg'
import iconGoogle from '../images/icon-google.svg'
import iconUser from '../images/icon-user.svg'
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar las contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/");
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Server error");
    }
  }

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 mt-20">
      <div className="rounded-sm border border-stroke bg-white shadow-default">
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
                <img className="w-[350px] h-[350px]" src="src/images/mobile-illustration.svg" alt="illustration" />
              </span>
            </div>
          </div>

          {/*Registro de usuarios*/}
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
                  <label className="mb-2.5 block font-medium text-black">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name='username'
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border 
                              border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary 
                              focus-visible:shadow-none"
                      onChange={handleChange}
                      value={formData.username}
                    />
                    <span className="absolute right-4 top-4">
                      <img className="fill-current" width="22" height="22" src={iconUser} />
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name='email'
                      placeholder="Enter your email"
                      className="w-full rounded-lg border 
                              border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary 
                              focus-visible:shadow-none"
                      onChange={handleChange}
                      value={formData.email}
                    />
                    <span className="absolute right-4 top-4">
                      <img className="fill-current" width="22" height="22" src={iconEmail} />
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      name='password'
                      placeholder="Enter your password"
                      className="w-full rounded-lg border 
                              border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary 
                              focus-visible:shadow-none"
                      onChange={handleChange}
                      value={formData.password}
                    />
                    <span className="absolute right-4 top-4">
                      <img className="fill-current" width="22" height="22" src={iconPassword} />
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black">Re-type Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      name='confirmPassword'
                      placeholder="Re-enter your password"
                      className="w-full rounded-lg border 
                              border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary 
                              focus-visible:shadow-none"
                      onChange={handleChange}
                      value={formData.confirmPassword}
                    />
                    <span className="absolute right-4 top-4">
                      <img className="fill-current" width="22" height="22" src={iconPassword} />
                    </span>
                  </div>
                </div>
                <div className="mb-5">
                  <button type="submit" className="w-full cursor-pointer rounded-lg border border-[#3c50e0] bg-[#3c50e0] p-4 font-medium text-white transition hover:bg-opacity-90">
                    Create account
                  </button>
                </div>
                <button className="flex w-full items-center justify-center gap-3.5 rounded-lg 
                            border border-[#D1D5DB] bg-[#E2E8F0] p-4 font-medium text-[#788596] 
                            hover:bg-opacity-70">
                  <span>
                    <img className="fill-current" width="20" height="20" src={iconGoogle} />
                  </span>
                  Sign in with Google
                </button>
                <div className="mt-6 text-center">
                  <p className="font-medium text-[#788596]">
                    Already have an account?
                    <a href="/" className="text-blue-500 underline cursor-pointer"> Sign in</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage