// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // ✅ Check your auth condition (localStorage in this case)
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    // Not logged in? Redirect to /register or /login
    return <Navigate to="/register" replace />;
  }

  // Logged in? Render the protected content
  return children;
};

export default ProtectedRoute;

