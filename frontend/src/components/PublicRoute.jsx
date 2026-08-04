import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

// ========================================
// Public Route Component
// Prevents logged-in users from accessing
// Login and Register pages.
// ========================================
function PublicRoute({ children }) {
  // Get current logged-in user
  const { currentUser } = useAuth();

  // If user is already logged in,
  // redirect to Dashboard.
  if (currentUser) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  // User is not logged in.
  return children;
}

export default PublicRoute;