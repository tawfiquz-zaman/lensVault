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

        uploadDate:
          photo.uploadDate ||
          "Unknown",

        uploadTime:
          photo.uploadTime || "",

        uploadedAt:
          photo.uploadedAt ||
          Date.now(),

        // Phase 23
        tags: photo.tags || [],
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
    const photosWithTags =
      newPhotos.map((photo) => ({
        ...photo,
        tags: photo.tags || [],
      }));

    setPhotos((prev) => [
      ...photosWithTags,
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
    const trimmedTitle =
      newTitle.trim();

    if (!trimmedTitle) return;

    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id !== id
          ? photo
          : {
              ...photo,
              title: trimmedTitle,
            }
      )
    );
  };

  // Toggle like
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

  // Toggle favorite
  const toggleFavorite = (id) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id !== id
          ? photo
          : {
              ...photo,
              favorite:
                !photo.favorite,
            }
      )
    );
  };

  // Bulk delete
  const bulkDelete = (ids) => {
    setPhotos((prev) =>
      prev.filter(
        (photo) =>
          !ids.includes(photo.id)
      )
    );
  };

  // Bulk favorite
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

  // Bulk unfavorite
  const bulkUnfavorite = (
    ids
  ) => {
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

  // Add comment
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

  // ===============================
  // Phase 23
  // Add Tag
  // ===============================
  const addTag = (
    id,
    newTag
  ) => {
    const tag =
      newTag.trim();

    if (!tag) return;

    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id !== id)
          return photo;

        const exists =
          photo.tags.some(
            (t) =>
              t.toLowerCase() ===
              tag.toLowerCase()
          );

        if (exists)
          return photo;

        return {
          ...photo,
          tags: [
            ...photo.tags,
            tag,
          ],
        };
      })
    );
  };

  // ===============================
  // Remove Tag
  // ===============================
  const removeTag = (
    id,
    tagToRemove
  ) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id !== id
          ? photo
          : {
              ...photo,
              tags:
                photo.tags.filter(
                  (tag) =>
                    tag !==
                    tagToRemove
                ),
            }
      )
    );
  };

  // ===============================
  // Edit Tag
  // ===============================
  const editTag = (
    id,
    oldTag,
    newTag
  ) => {
    const tag =
      newTag.trim();

    if (!tag) return;

    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id !== id)
          return photo;

        const exists =
          photo.tags.some(
            (t) =>
              t !== oldTag &&
              t.toLowerCase() ===
                tag.toLowerCase()
          );

        if (exists)
          return photo;

        return {
          ...photo,
          tags:
            photo.tags.map(
              (tagItem) =>
                tagItem === oldTag
                  ? tag
                  : tagItem
            ),
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

        // Phase 23
        addTag,
        removeTag,
        editTag,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotos() {
  return useContext(PhotoContext);
}