import { useEffect, useState } from "react";
import axios from "axios";
//Components
import Loader from "../components/Loader";

export const photosUrl = "https://jsonplaceholder.typicode.com/photos";

const Photos = () => {
  const queryParam = "albumId=1";
  const [photos, setPhotos] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);
    axios
      .get(`${photosUrl}?${queryParam}`, {
        cancelToken: source.token,
      })
      .then((res) => setPhotos(res.data))
      .catch((err) => {
        setError(err.response);
      })
      .finally(() => setLoading(false));
    return () => source.cancel();
  }, []);
  return (
    <>
      {photos ? (
        photos?.map((photo) => {
          return <p key={photo.id}>{photo.title}</p>;
        })
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default Photos;
