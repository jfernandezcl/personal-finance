import { Routes, Route } from "react-router-dom";
import WelcomePage from "../components/WelcomePage";
import SignUpPage from "../components/SignUpPage";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default AppRoutes