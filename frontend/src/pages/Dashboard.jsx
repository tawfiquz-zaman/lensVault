import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import StorageCard from "../components/StorageCard";
import UploadButton from "../components/UploadButton";
import GalleryGrid from "../components/GalleryGrid";
import UploadModal from "../components/UploadModal";

import { usePhotos } from "../context/PhotoContext";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { photos, addPhotos } = usePhotos();

const handleUpload = async (selectedFiles) => {
  const convertedPhotos = await Promise.all(
    selectedFiles.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            resolve({
              id: Date.now() + Math.random(),

              image: reader.result,

              title: file.name,

              category: "Uploaded",

              user: "You",

              likes: 0,

              comments: 0,
            });
          };

          reader.readAsDataURL(file);
        })
    )
  );

  addPhotos(convertedPhotos);
};
  return (
    <div className="dashboard">
      <DashboardNavbar />

      <div className="dashboard-header">
        <StorageCard />
        <UploadButton onClick={() => setIsModalOpen(true)} />
      </div>

      <GalleryGrid photos={photos} />

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}

export default Dashboard;