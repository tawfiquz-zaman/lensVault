import { Link } from "react-router-dom";
import { usePhotos } from "../context/PhotoContext";

function GalleryCard({ photo }) {
  const { deletePhoto } = usePhotos();

  return (
    <div className="gallery-card">
      <img src={photo.image} alt={photo.title} />

      <div className="gallery-card-content">
        <h3>{photo.title}</h3>

        <div className="gallery-actions">
          <Link
            to={`/dashboard/photo/${photo.id}`}
            className="view-btn"
          >
            View Photo
          </Link>

          <button
            className="delete-btn"
            onClick={() => deletePhoto(photo.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;