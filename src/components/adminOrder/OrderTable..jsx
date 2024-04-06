import { useContext, useEffect } from 'react';
import { Table, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import OrderContext from '../../lib/store/orderContext';
import UserContext from '../../lib/store/userContext';

const OrderTable = () => {
  const { orders, getOrders } = useContext(OrderContext);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const initialOrderFetch = async () => {
      await getOrders(token);
    };

    initialOrderFetch();
  }, []);

  return (
    <>
      <div className='overflow-x-auto'>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Order ID</Table.HeadCell>
            <Table.HeadCell>Customer Email</Table.HeadCell>
            <Table.HeadCell>Total Price</Table.HeadCell>
            <Table.HeadCell>Payment Method</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Order Date</Table.HeadCell>
            <Table.HeadCell>
              Actions
              <span className='sr-only'>Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {orders.map((order, index) => (
              <Table.Row
                key={order._id}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </Table.Cell>
                <Table.Cell>email@example.com</Table.Cell>
                <Table.Cell>${order.totalPrice}</Table.Cell>
                <Table.Cell>{order.paymentMethod}</Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
                <Table.Cell>{order.orderDate}</Table.Cell>
                <Table.Cell className='flex gap-2'>
                  <Button
                    size='sm'
                    onClick={() =>
                      openDeleteConfirmationHandler(prod._id, prod.title)
                    }
                    color='failure'
                  >
                    <a
                      href='#'
                      className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                    >
                      <svg
                        className='w-6 h-6 text-white dark:text-white'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z'
                        />
                      </svg>
                    </a>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default OrderTable;
