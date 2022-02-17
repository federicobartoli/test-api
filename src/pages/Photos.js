import { useEffect, useState } from 'react';

import axios from 'axios';
//Components
import Loader from '../components/Loader';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
//Css
import '../assets/css/Photos.css';

export const photosUrl = 'https://jsonplaceholder.typicode.com/photos';

const Photos = ({ favorites }) => {
  const queryParam = 'albumId=1';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [photos, setPhotos] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [wishlist, setWishlist] = useState([]);
  const [keyWords, setKeyWords] = useState([]);
  const [andOr, setAndOr] = useState(false);

  const handleLike = (id) => {
    if (!wishlist.includes(id)) {
      //add the id of the photo in wishlist
      setWishlist((prevWishlist) => {
        return [...prevWishlist, id];
      });
    } else {
      //remove the id of the photo in wishlist(filtering wishlist and setting a new one)
      const newWishList = wishlist.filter((item) => item !== id);
      setWishlist(newWishList);
    }
  };
  const handleFilter = (keyWords) => {
    // I add to KeyWordsArray only the .name of the keyWords object and then I set it in a state
    const keyWordsArray = [];
    keyWords.map((keyWord) => {
      return keyWordsArray.push(keyWord.name);
    });
    setKeyWords([...keyWordsArray]);
  };

  useEffect(() => {
    /* at onmount i search for the list of photo IDs in local storage, 
    if there is one I set the Wishlist status.
    Only run once.
    */
    let list = JSON.parse(localStorage.getItem('wishlist'));
    if (list) {
      setWishlist(list);
    }
  }, []);

  useEffect(() => {
    // If I don't have pictures I make the call to set them up.
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
    // Whenever the wishlist changes I set up local storage.
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return favorites && !wishlist ? (
    <p className="text-center">No favorites.</p>
  ) : (
    <>
      <SearchBar andOr={andOr} setAndOr={setAndOr} handleFilter={handleFilter} />
      <div className="photos-container">
        {!loading ? (
          photos?.length > 0 ? (
            photos
              ?.filter((ph) => {
                if (favorites) {
                  return wishlist.includes(ph.id);
                } else {
                  return ph;
                }
              })
              .filter((ph) => {
                if (keyWords?.length > 0) {
                  if (!andOr) {
                    return keyWords.some((keyword) => ph.title.includes(keyword));
                  } else {
                    return keyWords.every((keyword) => ph.title.includes(keyword));
                  }
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
    </>
  );
};

export default Photos;
