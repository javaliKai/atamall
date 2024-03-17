import { Link } from 'react-router-dom';
import { Card } from 'flowbite-react';

const OrderItem = ({ order }) => {
  return (
    <li className='pb-3 sm:pb-4 cursor-pointer'>
      <Link to={`/order/${order._id}`}>
        <Card>
          <div className='flex items-center space-x-4 rtl:space-x-reverse'>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                #{order._id}
              </p>
              <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                {order.orderDate.toLocaleString()}
              </p>
            </div>
            <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
              {order.status}
            </div>
          </div>
        </Card>
      </Link>
    </li>
  );
};

export default OrderItem;
