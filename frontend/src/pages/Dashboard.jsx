import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import StorageCard from "../components/StorageCard";
import UploadButton from "../components/UploadButton";
import GalleryGrid from "../components/GalleryGrid";
import UploadModal from "../components/UploadModal";
import SearchBar from "../components/SearchBar";

import { usePhotos } from "../context/PhotoContext";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { photos, addPhotos } = usePhotos();

  const filteredPhotos = photos.filter(
    (photo) =>
      photo.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      photo.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      photo.user
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

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
                liked: false,
                commentsList: [],
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

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <>
        {filteredPhotos.length > 0 ? (
          <GalleryGrid photos={filteredPhotos} />
        ) : (
          <div className="empty-search">
            <h2>No photos found</h2>
            <p>
              Try another title, category,
              or user.
            </p>
          </div>
        )}
      </>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}

export default Dashboard;