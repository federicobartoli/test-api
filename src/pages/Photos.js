import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
//Components
import Loader from '../components/Loader';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Card from '../components/Card';
//Css
import '../assets/css/Photos.css';
//Context
import { PhotosContext } from '../context/PhotosContext';
import { WishlistContext } from '../context/WishlistContext';

export const photosUrl = 'https://jsonplaceholder.typicode.com/photos';

const Photos = () => {
  const queryParam = 'albumId=1';
  const { photos, setPhotos } = useContext(PhotosContext);
  //State
  const [loading, setLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [error, setError] = useState(null);

  //Context
  const { wishlist, setWishlist } = useContext(WishlistContext);

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
          setError(err);
        })
        .finally(() => setLoading(false));
    }
    return () => source.cancel();
  }, [setPhotos, photos]);

  useEffect(() => {
    console.log('useEffect local');
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <div className="photos-container">
      {!loading ? (
        photos?.length > 1 ? (
          photos?.map((photo) => {
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
          `Si è presentato il seguente errore :  ${error.message}`
        ) : (
          'Nessuna foto'
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Photos;
