import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UIContextProvider } from './lib/store/uiContext.jsx';
import { UserContextProvider } from './lib/store/userContext.jsx';
import { ProductContextProvider } from './lib/store/productContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <UIContextProvider>
      <UserContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </UserContextProvider>
    </UIContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
