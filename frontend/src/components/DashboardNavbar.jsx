function DashboardNavbar() {
  return (
    <nav className="dashboard-navbar">
      <h2>LensVault</h2>

      <div className="dashboard-user">
        <span className="status-badge">
          Drive Connected
        </span>

        <div className="user-avatar">
          MU
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;