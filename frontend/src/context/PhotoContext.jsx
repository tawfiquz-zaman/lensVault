import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Create the Context
const PhotoContext = createContext();

export function PhotoProvider({
  children,
}) {
  // Load photos from localStorage when the app starts
  // Also upgrade older photos with any new fields added in later phases
  const [photos, setPhotos] = useState(() => {
    const savedPhotos =
      localStorage.getItem(
        "lensvaultPhotos"
      );

    if (!savedPhotos) return [];

    return JSON.parse(savedPhotos).map(
      (photo) => ({
        ...photo,

        // Ensure these properties always exist
        liked: photo.liked || false,

        favorite:
          photo.favorite || false,

        commentsList:
          photo.commentsList || [],

        comments:
          photo.comments || 0,

        // ===============================
        // Phase 21
        // Upload Date & Time System
        // ===============================
        // Older photos won't have these fields,
        // so provide safe fallback values.
        uploadDate:
          photo.uploadDate ||
          "Unknown",

        uploadTime:
          photo.uploadTime || "",

        uploadedAt:
          photo.uploadedAt ||
          Date.now(),
      })
    );
  });

  // Save every change automatically
  useEffect(() => {
    localStorage.setItem(
      "lensvaultPhotos",
      JSON.stringify(photos)
    );
  }, [photos]);

  // Add newly uploaded photos
  const addPhotos = (newPhotos) => {
    setPhotos((prev) => [
      ...newPhotos,
      ...prev,
    ]);
  };

  // Delete a single photo
  const deletePhoto = (id) => {
    setPhotos((prev) =>
      prev.filter(
        (photo) => photo.id !== id
      )
    );
  };

  // Rename a photo
  const renamePhoto = (
    id,
    newTitle
  ) => {
    // Remove unnecessary spaces
    const trimmedTitle =
      newTitle.trim();

    // Ignore empty names
    if (!trimmedTitle) return;

    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id !== id)
          return photo;

        return {
          ...photo,
          title: trimmedTitle,
        };
      })
    );
  };

  // Toggle like status
  const toggleLike = (id) => {
    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id !== id)
          return photo;

        return {
          ...photo,

          liked: !photo.liked,

          likes: photo.liked
            ? photo.likes - 1
            : photo.likes + 1,
        };
      })
    );
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id !== id)
          return photo;

        return {
          ...photo,

          favorite:
            !photo.favorite,
        };
      })
    );
  };

  // Delete multiple selected photos
  const bulkDelete = (ids) => {
    setPhotos((prev) =>
      prev.filter(
        (photo) =>
          !ids.includes(photo.id)
      )
    );
  };

  // Mark selected photos as favorite
  const bulkFavorite = (ids) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        ids.includes(photo.id)
          ? {
              ...photo,
              favorite: true,
            }
          : photo
      )
    );
  };

  // Remove favorite from selected photos
  const bulkUnfavorite = (ids) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        ids.includes(photo.id)
          ? {
              ...photo,
              favorite: false,
            }
          : photo
      )
    );
  };

  // Add a comment to a photo
  const addComment = (
    id,
    comment
  ) => {
    if (!comment.trim()) return;

    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id !== id)
          return photo;

        return {
          ...photo,

          comments:
            (photo.comments || 0) +
            1,

          commentsList: [
            ...(photo.commentsList ||
              []),

            {
              id: Date.now(),
              text: comment,
            },
          ],
        };
      })
    );
  };

  return (
    <PhotoContext.Provider
      value={{
        photos,
        addPhotos,
        deletePhoto,
        renamePhoto,
        toggleLike,
        toggleFavorite,
        bulkDelete,
        bulkFavorite,
        bulkUnfavorite,
        addComment,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
}

// Custom hook for accessing the PhotoContext
export function usePhotos() {
  return useContext(PhotoContext);
}