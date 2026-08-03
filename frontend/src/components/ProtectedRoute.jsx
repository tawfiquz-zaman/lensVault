import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

// ========================================
// Protected Route Component
// Prevents users from accessing private pages
// unless they are logged in.
// ========================================
function ProtectedRoute({ children }) {
  // Get current logged-in user
  const { currentUser } = useAuth();

  // If user is NOT logged in,
  // redirect them to Login page.
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated.
  return children;
}

export default ProtectedRoute;