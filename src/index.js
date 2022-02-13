import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//Context
import WishlistContextProvider from './context/WishlistContext';

ReactDOM.render(
  <React.StrictMode>
    <WishlistContextProvider>
      <App />
    </WishlistContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
