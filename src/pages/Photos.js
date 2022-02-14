import { useEffect, useState, useContext } from 'react';

import axios from 'axios';
//Components
import Loader from '../components/Loader';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Card from '../components/Card';
//Css
import '../assets/css/Photos.css';

export const photosUrl = 'https://jsonplaceholder.typicode.com/photos';

const Photos = ({ favorites }) => {
  const queryParam = 'albumId=1';

  //State
  const [loading, setLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  //Context
  const [photos, setPhotos] = useState(null);

  //Functions
  const handleLike = (id) => {
    if (!wishlist.includes(id)) {
      setWishlist((prevWishlist) => {
        return [...prevWishlist, id];
      });
    } else {
      const newWishList = wishlist.filter((item) => item !== id);
      setWishlist(newWishList);
    }
  };

  //UseEffect
  useEffect(() => {
    let list = JSON.parse(localStorage.getItem('wishlist'));
    setWishlist(list);
  }, []);
  useEffect(() => {
    const source = axios.CancelToken.source();
    if (!photos) {
      setLoading(true);
      axios
        .get(`${photosUrl}?${queryParam}`, {
          cancelToken: source.token,
        })
        .then((res) => setPhotos(res.data))
        .catch((err) => {
          if (axios.isCancel());
          setError(err);
        })
        .finally(() => setLoading(false));
    }
    return () => source.cancel();
  }, [setPhotos, photos]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <div className="photos-container">
      {!loading ? (
        photos?.length > 1 ? (
          photos
            ?.filter((ph) => {
              if (favorites) {
                return wishlist.includes(ph.id);
              } else {
                return ph;
              }
            })
            .map((photo) => {
              return (
                <Card
                  handleLike={() => handleLike(photo.id)}
                  id={photo.id}
                  key={`photo--${photo.id}`}
                  liked={wishlist?.includes(photo.id) ? true : false}
                >
                  {!isImageLoaded && <ImagePlaceholder />}
                  <img
                    className={`${isImageLoaded ? 'd-block' : 'd-none'}`}
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    onLoad={() => setIsImageLoaded(true)}
                  />
                  <p>{photo.title}</p>
                </Card>
              );
            })
        ) : error ? (
          `The following error occurred :  ${error.message}`
        ) : (
          'No photos'
        )
      ) : (
        <Loader />
      )}
      {favorites && !error && !loading && wishlist.length < 1 && 'No favorites'}
    </div>
  );
};

export default Photos;
