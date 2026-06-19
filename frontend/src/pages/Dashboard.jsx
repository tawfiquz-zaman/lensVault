import DashboardNavbar from "../components/DashboardNavbar";
import StorageCard from "../components/StorageCard";
import UploadButton from "../components/UploadButton";
import GalleryGrid from "../components/GalleryGrid";

function Dashboard() {
  return (
    <>
      <DashboardNavbar />

      <section className="dashboard-container">
        <div className="dashboard-header">
          <StorageCard />
          <UploadButton />
        </div>

        <div className="dashboard-filters">
          <button className="active">All</button>
          <button>Nature</button>
          <button>Travel</button>
          <button>Wildlife</button>
          <button>Portraits</button>
        </div>

        <GalleryGrid />
      </section>
    </>
  );
}

export default Dashboard;