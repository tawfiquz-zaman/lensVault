import { createContext, useContext, useState } from "react";

const PhotoContext = createContext();

export function PhotoProvider({ children }) {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      category: "Nature",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
      category: "Travel",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      category: "Portrait",
    },
  ]);

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