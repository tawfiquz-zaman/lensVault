import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardNavbar() {
  // Authentication
  const { currentUser, logout } = useAuth();

  // Navigation
  const navigate = useNavigate();

  // ===========================
  // Logout
  // ===========================
  const handleLogout = () => {
    logout();

    // Redirect to Login
    navigate("/login");
  };

  // ===========================
  // Get User Initials
  // ===========================
  const getInitials = () => {
    if (!currentUser?.name) return "?";

    return currentUser.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="dashboard-navbar">
      {/* Logo */}
      <h2>LensVault</h2>

      <div className="dashboard-user">
        {/* Connection Badge */}
        <span className="status-badge">
          Drive Connected
        </span>

        {/* Recycle Bin */}
        <Link
          to="/recycle-bin"
          style={{
            marginLeft: "15px",
            marginRight: "15px",
            textDecoration: "none",
            color: "#2563eb",
            fontWeight: "600",
          }}
        >
          🗑 Recycle Bin
        </Link>

        {/* Logged-in User Name */}
        <span
          style={{
            fontWeight: "600",
            marginRight: "10px",
          }}
        >
          {currentUser?.name}
        </span>

        {/* Avatar */}
        <div className="user-avatar">
          {getInitials()}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            marginLeft: "12px",
            padding: "8px 14px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background: "#ef4444",
            color: "white",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default DashboardNavbar;