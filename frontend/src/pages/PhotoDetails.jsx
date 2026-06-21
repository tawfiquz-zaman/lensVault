import { useParams, useNavigate } from "react-router-dom";
import { usePhotos } from "../context/PhotoContext";

function PhotoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    photos,
    deletePhoto,
    toggleLike,
  } = usePhotos();

  const photo = photos.find(
    (item) => item.id === Number(id)
  );

  if (!photo) {
    return (
      <div className="photo-details-page">
        <h2>Photo not found</h2>
      </div>
    );
  }

  const handleDelete = () => {
    deletePhoto(photo.id);
    navigate("/dashboard");
  };

  return (
    <div className="photo-details-page">
      <div className="photo-details-container">
        <img
          src={photo.image}
          alt={photo.title}
          className="photo-details-image"
        />

        <div className="photo-details-info">
          <h1>{photo.title}</h1>

          <p>
            <strong>Category:</strong> {photo.category}
          </p>

          <p>
            <strong>User:</strong> {photo.user}
          </p>

          <p>
            <strong>Likes:</strong> {photo.likes || 0}
          </p>

          <p>
            <strong>Comments:</strong> {photo.comments || 0}
          </p>

          <p>
            <strong>Photo ID:</strong> {photo.id}
          </p>

          <div className="photo-actions">
            <button
              className={`like-btn ${
                photo.liked ? "liked" : ""
              }`}
              onClick={() =>
                toggleLike(photo.id)
              }
            >
              ❤️ {photo.likes}
            </button>

            <button
              className="delete-photo-btn"
              onClick={handleDelete}
            >
              Delete Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetails;