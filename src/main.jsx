import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UIContextProvider } from './lib/store/uiContext.jsx';
import { UserContextProvider } from './lib/store/userContext.jsx';
import { ProductContextProvider } from './lib/store/productContext.jsx';
import { CartContextProvider } from './lib/store/cartContext.jsx';
import { OrderContextProvider } from './lib/store/orderContext.jsx';
import { AnalyticsContextProvider } from './lib/store/analyticsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <UIContextProvider>
      <UserContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <OrderContextProvider>
              <AnalyticsContextProvider>
                <App />
              </AnalyticsContextProvider>
            </OrderContextProvider>
          </CartContextProvider>
        </ProductContextProvider>
      </UserContextProvider>
    </UIContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
