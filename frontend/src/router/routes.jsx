import { Routes, Route } from "react-router-dom";
import WelcomePage from "../components/WelcomePage";
import SignUpPage from "../components/SignUpPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  )
}

export default AppRoutes