import { Link } from "react-router-dom";
import { usePhotos } from "../context/PhotoContext";

function GalleryCard({
  photo,
  selectedPhotos,
  onSelectPhoto,
}) {
  const {
    deletePhoto,
    toggleLike,
    toggleFavorite,
  } = usePhotos();

  // Check if photo is selected
  const isSelected =
    selectedPhotos?.includes(photo.id);

  // Download photo
  const handleDownload = (e) => {
    e.stopPropagation();

    const link =
      document.createElement("a");

    link.href = photo.image;
    link.download = photo.title;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <div
      className={`gallery-card ${
        isSelected
          ? "selected-card"
          : ""
      }`}
    >
      {/* Selection Checkbox */}
      <div className="photo-select">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() =>
            onSelectPhoto(photo.id)
          }
        />
      </div>

      {/* Photo */}
      <Link
        to={`/dashboard/photo/${photo.id}`}
      >
        <img
          src={photo.image}
          alt={photo.title}
        />
      </Link>

      {/* Photo Info */}
      <div className="gallery-card-content">
        <h3>{photo.title}</h3>

        <p className="photo-user">
          Uploaded by {photo.user}
        </p>

        <span className="category">
          {photo.category}
        </span>

        {/* Action Buttons */}
        <div className="gallery-actions">
          {/* Favorite */}
          <button
            className={`favorite-btn ${
              photo.favorite
                ? "favorited"
                : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(photo.id);
            }}
          >
            {photo.favorite
              ? "⭐"
              : "☆"}
          </button>

          {/* Like */}
          <button
            className={`like-btn ${
              photo.liked
                ? "liked"
                : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(photo.id);
            }}
          >
            ❤️ {photo.likes || 0}
          </button>

          {/* Download */}
          <button
            className="download-btn"
            onClick={handleDownload}
          >
            Download
          </button>

          {/* Delete */}
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              deletePhoto(photo.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;