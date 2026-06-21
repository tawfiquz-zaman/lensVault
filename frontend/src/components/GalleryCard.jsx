import { Link } from "react-router-dom";
import { usePhotos } from "../context/PhotoContext";

function GalleryCard({ photo }) {
  const { deletePhoto, toggleLike } = usePhotos();

  return (
    <div className="gallery-card">
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