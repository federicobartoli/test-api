import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//Context
import PhotosContextProvider from './context/PhotosContext';
import WishlistContextProvider from './context/WishlistContext';

ReactDOM.render(
  <React.StrictMode>
    <PhotosContextProvider>
      <WishlistContextProvider>
        <App />
      </WishlistContextProvider>
    </PhotosContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
