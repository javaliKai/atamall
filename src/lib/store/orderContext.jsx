import axios from 'axios';
import { createContext, useState } from 'react';

const OrderContext = createContext({
  orders: [],
  getOrders: (token) => {},
  addOrder: (products, paymentMethod, token) => {},
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

  const addOrder = async (products, paymentMethod, token) => {
    const result = {
      newOrder: undefined,
      errorObj: undefined,
    };

    try {
      // send all cart items product as the order items
      const response = await axios.post(
        '/api/order',
        { products, paymentMethod },
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

  return (
    <OrderContext.Provider value={{ orders, getOrders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
