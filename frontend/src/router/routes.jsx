import { Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "../authenticity/ProtectedRoute";
import SignUpPage from "../pages/SignUpPage";
import EditProfile from "../pages/EditProfile";

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
      <Route
        path="/editprofile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
