import { Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import SignUpPage from "../pages/SignUpPage";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../authenticity/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
