import { createContext, useContext, useEffect, useState } from "react";

const PhotoContext = createContext();

export function PhotoProvider({ children }) {
  const [photos, setPhotos] = useState(() => {
    const savedPhotos = localStorage.getItem("lensvaultPhotos");

    return savedPhotos ? JSON.parse(savedPhotos) : [];
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

  return (
    <PhotoContext.Provider
      value={{
        photos,
        addPhotos,
        deletePhoto,
        toggleLike,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotos() {
  return useContext(PhotoContext);
}