import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-circle">P</div>
        <span>PhotoVault</span>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="nav-actions">
        <Link
          to="/login"
          className="login-btn"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="join-btn"
        >
          Join Free
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;