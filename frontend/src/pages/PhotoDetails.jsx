import { useParams } from "react-router-dom";
import { usePhotos } from "../context/PhotoContext";

function PhotoDetails() {
  const { id } = useParams();

  const { photos } = usePhotos();

  const photo = photos.find((item) => item.id === Number(id));

  if (!photo) {
    return (
      <div className="photo-details-page">
        <h2>Photo not found</h2>
      </div>
    );
  }

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
            <strong>Likes:</strong> {photo.likes}
          </p>

          <p>
            <strong>Comments:</strong> {photo.comments}
          </p>

          <p>
            <strong>Photo ID:</strong> {photo.id}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetails;