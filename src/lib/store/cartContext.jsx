import axios from 'axios';
import { createContext, useState } from 'react';

const CartContext = createContext({
  cartItems: [],
  getCart: () => {},
  addToCart: (productId, token) => {},
  increaseQty: (productObj, token) => {},
  decreaseQty: (productId) => {},
  removeItem: (productId) => {},
  emptyCart: (token) => {},
});

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const getCart = async (token) => {
    const result = {
      cartItems: [],
      errorObj: undefined,
    };

    try {
      const response = await axios.get('/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cartData = response.data.cartData;
      setCartItems(cartData.products);
      result.cartItems = cartData.products;
    } catch (error) {
      result.errorObj = error.response.data;
    } finally {
      return result;
    }
  };

  const addToCart = async (productObj, token) => {
    const result = {
      userCart: {},
      errorObj: undefined,
    };
    try {
      const response = await axios.put('/api/cart/', productObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getCart(token);
      result.userCart = response.data.userCart;
    } catch (error) {
      result.errorObj = error.response.data;
    } finally {
      return result;
    }
  };

  const increaseQty = async (productId, token) => {
    const result = {
      userCart: {},
      errorObj: undefined,
    };
    try {
      const response = await axios.put(
        '/api/cart/increase',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getCart(token);
      result.userCart = response.data.userCart;
    } catch (error) {
      result.errorObj = error.response.data;
    } finally {
      return result;
    }
  };

  const decreaseQty = async (productId, token) => {
    const result = {
      userCart: {},
      errorObj: undefined,
    };
    try {
      const response = await axios.put(
        '/api/cart/decrease',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getCart(token);
      result.userCart = response.data.userCart;
    } catch (error) {
      result.errorObj = error.response.data;
    } finally {
      return result;
    }
  };

  const removeItem = async (productId, token) => {
    const result = {
      userCart: {},
      errorObj: undefined,
    };
    try {
      const response = await axios.put(
        '/api/cart/remove',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getCart(token);
      result.userCart = response.data.userCart;
    } catch (error) {
      result.errorObj = error.response.data;
    } finally {
      return result;
    }
  };

  const emptyCart = async (token) => {
    const result = {
      success: false,
      errorObj: undefined,
    };
    try {
      const response = await axios.delete('/api/cart/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const currentUserCart = response.data.userCart;
      setCartItems([]);
      console.log(cartItems);
      // getCart(token);
      result.success = true;
    } catch (error) {
      result.errorObj = error.response.data;
    } finally {
      return result;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        getCart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
