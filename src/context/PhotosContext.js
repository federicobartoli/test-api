import { createContext, useState } from 'react';
export const PhotosContext = createContext();

const PhotosContextProvider = (props) => {
  const [photos, setPhotos] = useState(null);

  return (
    <PhotosContext.Provider value={{ photos, setPhotos }}>{props.children}</PhotosContext.Provider>
  );
};

export default PhotosContextProvider;
