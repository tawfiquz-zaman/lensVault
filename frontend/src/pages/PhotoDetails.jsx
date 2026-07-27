import { useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import { usePhotos } from "../context/PhotoContext";

function PhotoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for new comment
  const [comment, setComment] =
    useState("");

  const {
    photos,
    deletePhoto,
    renamePhoto,
    toggleLike,
    toggleFavorite,
    addComment,
  } = usePhotos();

  // Find the current photo
  const photo = photos.find(
    (item) => item.id === Number(id)
  );

  // If photo doesn't exist
  if (!photo) {
    return (
      <div className="photo-details-page">
        <h2>Photo not found</h2>
      </div>
    );
  }

  // Delete photo and return to dashboard
  const handleDelete = () => {
    deletePhoto(photo.id);
    navigate("/dashboard");
  };

  // Rename photo
  const handleRename = () => {
    const newTitle = prompt(
      "Enter a new photo name:",
      photo.title
    );

    // User pressed Cancel
    if (newTitle === null) return;

    // Update title
    renamePhoto(photo.id, newTitle);
  };

  // Add a new comment
  const handleAddComment = () => {
    if (!comment.trim()) return;

    addComment(photo.id, comment);

    setComment("");
  };

  // Download the image
  const handleDownload = () => {
    const link =
      document.createElement("a");

    link.href = photo.image;
    link.download = photo.title;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="photo-details-page">
      <div className="photo-details-container">
        {/* Photo Preview */}
        <img
          src={photo.image}
          alt={photo.title}
          className="photo-details-image"
        />

        <div className="photo-details-info">
          <h1>{photo.title}</h1>

          <p>
            <strong>Category:</strong>{" "}
            {photo.category}
          </p>

          <p>
            <strong>User:</strong>{" "}
            {photo.user}
          </p>

          <p>
            <strong>Likes:</strong>{" "}
            {photo.likes || 0}
          </p>

          <p>
            <strong>Comments:</strong>{" "}
            {photo.comments || 0}
          </p>

          <p>
            <strong>Photo ID:</strong>{" "}
            {photo.id}
          </p>

          {/* Action Buttons */}
          <div className="photo-actions">
            {/* Favorite */}
            <button
              className={`favorite-btn ${
                photo.favorite
                  ? "favorited"
                  : ""
              }`}
              onClick={() =>
                toggleFavorite(photo.id)
              }
            >
              {photo.favorite
                ? "★ Saved"
                : "☆ Save"}
            </button>

            {/* Like */}
            <button
              className={`like-btn ${
                photo.liked
                  ? "liked"
                  : ""
              }`}
              onClick={() =>
                toggleLike(photo.id)
              }
            >
              ❤️ {photo.likes}
            </button>

            {/* Rename */}
            <button
              className="rename-btn"
              onClick={handleRename}
            >
              Rename
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
              className="delete-photo-btn"
              onClick={handleDelete}
            >
              Delete Photo
            </button>
          </div>

          {/* Comments */}
          <div className="comments-section">
            <h3>
              Comments (
              {photo.comments || 0})
            </h3>

            <div className="comment-form">
              <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) =>
                  setComment(
                    e.target.value
                  )
                }
              />

              <button
                onClick={
                  handleAddComment
                }
              >
                Add Comment
              </button>
            </div>

            <div className="comments-list">
              {photo.commentsList
                ?.length > 0 ? (
                photo.commentsList.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="comment-item"
                    >
                      {item.text}
                    </div>
                  )
                )
              ) : (
                <p>
                  No comments yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetails;