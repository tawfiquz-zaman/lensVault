import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import StorageCard from "../components/StorageCard";
import UploadButton from "../components/UploadButton";
import GalleryGrid from "../components/GalleryGrid";
import UploadModal from "../components/UploadModal";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [photos, setPhotos] = useState([
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      category: "Nature",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      category: "Travel",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      category: "Portrait",
    },
  ]);

  const handleUpload = (newImages) => {
    const uploadedPhotos = newImages.map((file, index) => ({
      id: Date.now() + index,
      image: URL.createObjectURL(file),
      category: "Uploaded",
    }));

    setPhotos((prev) => [...uploadedPhotos, ...prev]);
  };

  return (
    <div className="dashboard">
      <DashboardNavbar />

      <StorageCard />

      <UploadButton
        onClick={() => setIsModalOpen(true)}
      />

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