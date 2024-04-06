import axios from 'axios';
import { createContext, useState } from 'react';

const OrderContext = createContext({
  orders: [],
  getOrders: (token) => {},
  addOrder: (products, paymentMethod, shippingAddress, token) => {},
  finishOrder: (orderId, token) => {},
  cancelOrder: (orderId, token) => {},
});

export const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async (token) => {
    const result = {
      orders: [],
      errorObj: undefined,
    };

    try {
      // fetch user order from db
      const response = await axios.get('/api/order', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const orders = response.data.orders;
      result.orders = orders;
      setOrders(orders);
    } catch (error) {
      result.errorObj = error.response.data;
    } finally {
      return result;
    }
  };

  const addOrder = async (products, paymentMethod, shippingAddress, token) => {
    const result = {
      newOrder: undefined,
      errorObj: undefined,
    };

    try {
      // send all cart items product as the order items
      const response = await axios.post(
        '/api/order',
        { products, paymentMethod, shippingAddress },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newOrder = response.data.newOrder;
      result.newOrder = newOrder;

      // refetch orders
      getOrders(token);
    } catch (error) {
      result.errorObj = error.response.data;
    } finally {
      return result;
    }
  };

  const finishOrder = async (orderId, token) => {
    const result = {
      success: false,
      errorObj: undefined,
    };

    try {
      await axios.put(
        `/api/order/finish/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // refetch orders
      result.success = true;
      getOrders(token);
    } catch (error) {
      result.errorObj = error.response.data;
    } finally {
      return result;
    }
  };

  const cancelOrder = async (orderId, token) => {
    const result = {
      success: false,
      errorObj: undefined,
    };

    try {
      await axios.put(
        `/api/order/cancel/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // refetch orders
      result.success = true;
      getOrders(token);
    } catch (error) {
      result.errorObj = error.response.data;
    } finally {
      return result;
    }
  };

  return (
    <OrderContext.Provider
      value={{ orders, getOrders, addOrder, finishOrder, cancelOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
