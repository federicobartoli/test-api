import { createContext, useState } from 'react';
export const WishlistContext = createContext();

const WishlistContextProvider = (props) => {
  let list = JSON.parse(localStorage.getItem('wishlist'));
  const [wishlist, setWishlist] = useState(list === null ? [] : list);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {props.children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
