import { useState } from "react";

import DashboardNavbar from "../components/DashboardNavbar";
import StorageCard from "../components/StorageCard";
import UploadButton from "../components/UploadButton";
import GalleryGrid from "../components/GalleryGrid";
import UploadModal from "../components/UploadModal";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  return (
    <div className="dashboard">
      <DashboardNavbar />

      <StorageCard />

      <UploadButton
        onClick={() => setIsModalOpen(true)}
      />

      <GalleryGrid />

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Dashboard;