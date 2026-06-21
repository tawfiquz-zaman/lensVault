import { createContext, useContext, useEffect, useState } from "react";

const PhotoContext = createContext();

export function PhotoProvider({ children }) {
  const [photos, setPhotos] = useState(() => {
    const savedPhotos = localStorage.getItem("lensvaultPhotos");

    if (!savedPhotos) return [];

    return JSON.parse(savedPhotos).map((photo) => ({
      ...photo,
      commentsList: photo.commentsList || [],
    }));
  });

  useEffect(() => {
    localStorage.setItem(
      "lensvaultPhotos",
      JSON.stringify(photos)
    );
  }, [photos]);

  const addPhotos = (newPhotos) => {
    setPhotos((prev) => [...newPhotos, ...prev]);
  };

  const deletePhoto = (id) => {
    setPhotos((prev) =>
      prev.filter((photo) => photo.id !== id)
    );
  };

  const toggleLike = (id) => {
    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id !== id) return photo;

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

  const addComment = (id, comment) => {
    if (!comment.trim()) return;

    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id !== id) return photo;

        return {
          ...photo,
          comments: (photo.comments || 0) + 1,
          commentsList: [
            ...(photo.commentsList || []),
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
        toggleLike,
        addComment,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotos() {
  return useContext(PhotoContext);
}