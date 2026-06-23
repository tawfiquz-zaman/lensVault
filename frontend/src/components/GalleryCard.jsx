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

  const isSelected =
    selectedPhotos?.includes(photo.id);

  return (
    <div
      className={`gallery-card ${
        isSelected ? "selected-card" : ""
      }`}
    >
      <div className="photo-select">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() =>
            onSelectPhoto(photo.id)
          }
        />
      </div>

      <Link to={`/dashboard/photo/${photo.id}`}>
        <img
          src={photo.image}
          alt={photo.title}
        />
      </Link>

      <div className="gallery-card-content">
        <h3>{photo.title}</h3>

        <p className="photo-user">
          Uploaded by {photo.user}
        </p>

        <span className="category">
          {photo.category}
        </span>

        <div className="gallery-actions">
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
            {photo.favorite ? "⭐" : "☆"}
          </button>

          <button
            className={`like-btn ${
              photo.liked ? "liked" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(photo.id);
            }}
          >
            ❤️ {photo.likes || 0}
          </button>

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