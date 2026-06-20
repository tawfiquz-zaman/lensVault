import { createContext, useContext, useEffect, useState } from "react";

const PhotoContext = createContext();

export function PhotoProvider({ children }) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const savedPhotos = localStorage.getItem("lensvaultPhotos");

    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "lensvaultPhotos",
      JSON.stringify(photos)
    );
  }, [photos]);

  const addPhotos = (newPhotos) => {
    setPhotos((prev) => [...newPhotos, ...prev]);
  };

  return (
    <PhotoContext.Provider
      value={{
        photos,
        setPhotos,
        addPhotos,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotos() {
  return useContext(PhotoContext);
}