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
        <button className="login-btn">Login</button>
        <button className="join-btn">Join Free</button>
      </div>
    </nav>
  );
}

export default Navbar;