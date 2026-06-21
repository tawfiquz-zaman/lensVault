import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePhotos } from "../context/PhotoContext";

function PhotoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");

  const {
    photos,
    deletePhoto,
    toggleLike,
    addComment,
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

  const handleAddComment = () => {
    if (!comment.trim()) return;

    addComment(photo.id, comment);

    setComment("");
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

          <div className="comments-section">
            <h3>
              Comments ({photo.comments || 0})
            </h3>

            <div className="comment-form">
              <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
              />

              <button onClick={handleAddComment}>
                Add Comment
              </button>
            </div>

            <div className="comments-list">
              {photo.commentsList?.length > 0 ? (
                photo.commentsList.map((item) => (
                  <div
                    key={item.id}
                    className="comment-item"
                  >
                    {item.text}
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetails;