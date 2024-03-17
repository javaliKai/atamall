import { useContext, useEffect } from 'react';
import OrderItem from '../components/order/OrderItem';
import OrderContext from '../lib/store/orderContext';
import { MdOutlineBorderStyle } from 'react-icons/md';
import UserContext from '../lib/store/userContext';

const Orders = () => {
  const { orders, getOrders } = useContext(OrderContext);
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      getOrders(token);
    }
  }, [token]);

  return (
    <>
      <div className='my-5'>
        <h2 className='my-3 text-2xl dark:text-white lg:text-3xl font-semibold leading-7 lg:leading-9 text-gray-800'>
          Your Orders
        </h2>
        <ul className='flex flex-col-reverse mx-auto my-5 max-w-md divide-y divide-gray-200 dark:divide-gray-700'>
          {orders.length === 0 && <p>You have no orders.</p>}
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Orders;
