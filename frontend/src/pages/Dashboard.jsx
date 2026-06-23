import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import StorageCard from "../components/StorageCard";
import UploadButton from "../components/UploadButton";
import GalleryGrid from "../components/GalleryGrid";
import UploadModal from "../components/UploadModal";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";
import BulkActions from "../components/BulkActions";

import { usePhotos } from "../context/PhotoContext";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [sortBy, setSortBy] =
    useState("newest");

  const [
    selectedPhotos,
    setSelectedPhotos,
  ] = useState([]);

  const {
    photos,
    addPhotos,
    bulkDelete,
    bulkFavorite,
    bulkUnfavorite,
  } = usePhotos();

  const filteredPhotos = photos.filter(
    (photo) => {
      const matchesSearch =
        photo.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        photo.category
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        photo.user
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All"
          ? true
          : selectedCategory ===
            "Favorites"
          ? photo.favorite
          : photo.category ===
            selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  const sortedPhotos = [
    ...filteredPhotos,
  ];

  if (sortBy === "oldest") {
    sortedPhotos.sort(
      (a, b) => a.id - b.id
    );
  }

  if (sortBy === "newest") {
    sortedPhotos.sort(
      (a, b) => b.id - a.id
    );
  }

  if (sortBy === "likes") {
    sortedPhotos.sort(
      (a, b) =>
        (b.likes || 0) -
        (a.likes || 0)
    );
  }

  if (sortBy === "comments") {
    sortedPhotos.sort(
      (a, b) =>
        (b.comments || 0) -
        (a.comments || 0)
    );
  }

  if (sortBy === "title") {
    sortedPhotos.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  const handleSelectPhoto = (id) => {
    setSelectedPhotos((prev) =>
      prev.includes(id)
        ? prev.filter(
            (item) => item !== id
          )
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedPhotos(
      sortedPhotos.map(
        (photo) => photo.id
      )
    );
  };

  const handleBulkDelete = () => {
    bulkDelete(selectedPhotos);

    setSelectedPhotos([]);
  };

  const handleBulkFavorite = () => {
    bulkFavorite(selectedPhotos);
  };

  const handleBulkUnfavorite = () => {
    bulkUnfavorite(selectedPhotos);
  };

  const handleUpload = async (
    selectedFiles
  ) => {
    const convertedPhotos =
      await Promise.all(
        selectedFiles.map(
          (file) =>
            new Promise((resolve) => {
              const reader =
                new FileReader();

              reader.onloadend =
                () => {
                  resolve({
                    id:
                      Date.now() +
                      Math.random(),

                    image:
                      reader.result,

                    title: file.name,

                    category:
                      "Uploaded",

                    user: "You",

                    likes: 0,

                    comments: 0,

                    liked: false,

                    favorite: false,

                    commentsList:
                      [],
                  });
                };

              reader.readAsDataURL(
                file
              );
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

        <UploadButton
          onClick={() =>
            setIsModalOpen(true)
          }
        />
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={
          setSearchTerm
        }
      />

      <div className="category-filters">
        <button
          className={
            selectedCategory ===
            "All"
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setSelectedCategory(
              "All"
            )
          }
        >
          All
        </button>

        <button
          className={
            selectedCategory ===
            "Uploaded"
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setSelectedCategory(
              "Uploaded"
            )
          }
        >
          Uploaded
        </button>

        <button
          className={
            selectedCategory ===
            "Favorites"
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setSelectedCategory(
              "Favorites"
            )
          }
        >
          Favorites
        </button>
      </div>

      <SortBar
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <button
        className="select-all-btn"
        onClick={handleSelectAll}
      >
        Select All
      </button>

      <BulkActions
        selectedPhotos={
          selectedPhotos
        }
        onDelete={
          handleBulkDelete
        }
        onFavorite={
          handleBulkFavorite
        }
        onUnfavorite={
          handleBulkUnfavorite
        }
      />

      {sortedPhotos.length > 0 ? (
        <GalleryGrid
          photos={sortedPhotos}
          selectedPhotos={
            selectedPhotos
          }
          onSelectPhoto={
            handleSelectPhoto
          }
        />
      ) : (
        <div className="empty-search">
          <h2>No photos found</h2>

          <p>
            Try another title,
            category, user, or
            sort option.
          </p>
        </div>
      )}

      <UploadModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onUpload={handleUpload}
      />
    </div>
  );
}

export default Dashboard;