import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./router/routes.jsx";

function App() {

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </Router>
  )
}

export default App
