import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { useContext, useEffect, useState } from 'react';

import OrderContext from '../lib/store/orderContext';
import UserContext from '../lib/store/userContext';
import OrderProgress from '../components/order/OrderProgress';
import { Button } from 'flowbite-react';
import OrderConfirmModal from '../components/order/OrderConfirmModal';
import UIContext from '../lib/store/uiContext';

const OrderDetail = () => {
  const { orderId } = useParams();

  const [isCancelling, setIsCancelling] = useState(false);
  const { toggleConfirmOrderModal } = useContext(UIContext);
  const { orders, getOrders } = useContext(OrderContext);
  const { token, tradeToken } = useContext(UserContext);
  const orderItem = orders.find((item) => item._id === orderId);
  const orderDetail = orderItem.products;

  let subtotal = 0;
  if (orderDetail) {
    orderDetail.forEach((item) => {
      subtotal = subtotal + item.price;
    });
  }
  subtotal = subtotal.toFixed(2);

  let total = Number(subtotal) + 25; // 25 is the shipping fee
  total = total.toFixed(2);

  useEffect(() => {
    if (token) {
      tradeToken(token);
      getOrders(token);
    }
  }, [token]);

  if (!orderItem) {
    return <NotFound />;
  }

  // return orderItem && !customerLoading ? (
  return (
    <>
      <OrderConfirmModal orderId={orderId} isCancelling={isCancelling} />
      <div className='py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto'>
        <div className='flex justify-start item-start space-y-2 flex-col'>
          <h1 className='text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800'>
            Order #{orderId}
          </h1>
          <p className='text-base dark:text-gray-300 font-medium leading-6 text-gray-600'>
            Issued At: {orderItem.orderDate.toLocaleString()}
          </p>
        </div>
        <>
          <OrderProgress status={orderItem.status} />
        </>
        <div className='mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0'>
          <div className='flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8'>
            <div className='flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full'>
              <p className='text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800'>
                Order Items
              </p>
              {orderDetail.map((od) => (
                <div
                  key={od.productId}
                  className='mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full'
                >
                  <div className='pb-4 md:pb-8 w-full md:w-40'>
                    <img
                      className='w-full hidden md:block'
                      src={od.image}
                      alt={od.title}
                    />
                    <img
                      className='w-full md:hidden'
                      src={od.image}
                      alt={od.title}
                    />
                  </div>
                  <div className='border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0'>
                    <div className='w-full flex flex-col justify-start items-start space-y-8'>
                      <h3 className='text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800'>
                        {od.title}
                      </h3>
                      <div className='flex justify-start items-start flex-col space-y-2'>
                        <p className='text-sm dark:text-white capitalize leading-none text-gray-800'>
                          {od.category}
                        </p>
                      </div>
                    </div>
                    <div className='flex justify-between space-x-8 items-start w-full'>
                      <p className='text-base dark:text-white xl:text-lg leading-6'>
                        {' '}
                      </p>
                      <div className='text-base dark:text-white flex flex-col items-center justify-between gap-5 xl:text-lg leading-6 text-gray-800'>
                        <p className='font-bold'>Quantity</p>
                        <p>{od.quantity}</p>
                      </div>
                      <div className='text-base dark:text-white flex flex-col items-center justify-between gap-5 xl:text-lg leading-6 text-gray-800'>
                        <p className='font-bold'>Price</p>
                        <p>${od.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8'>
              <div className='flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6'>
                <h3 className='text-xl dark:text-white font-semibold leading-5 text-gray-800'>
                  Summary
                </h3>
                <div className='flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4'>
                  <div className='flex justify-between w-full'>
                    <p className='text-base dark:text-white leading-4 text-gray-800'>
                      Subtotal
                    </p>
                    <p className='text-base dark:text-gray-300 leading-4 text-gray-600'>
                      ${subtotal}
                    </p>
                  </div>
                  <div className='flex justify-between items-center w-full'>
                    <p className='text-base dark:text-white leading-4 text-gray-800'>
                      Shipping
                    </p>
                    <p className='text-base dark:text-gray-300 leading-4 text-gray-600'>
                      $25.00
                    </p>
                  </div>
                </div>
                <div className='flex justify-between items-center w-full'>
                  <p className='text-base dark:text-white font-semibold leading-4 text-gray-800'>
                    Total
                  </p>
                  <p className='text-base dark:text-gray-300 font-semibold leading-4 text-gray-600'>
                    ${total}
                  </p>
                </div>
              </div>
              <div className='flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6'>
                <h3 className='text-xl dark:text-white font-semibold leading-5 text-gray-800'>
                  Shipping
                </h3>
                <div className='flex justify-between items-start w-full'>
                  <div className='flex justify-center items-center space-x-4'>
                    <div className='w-8 h-8'>
                      <img
                        className='w-full h-full'
                        alt='logo'
                        src='https://i.ibb.co/L8KSdNQ/image-3.png'
                      />
                    </div>
                    <div className='flex flex-col justify-start items-center'>
                      <p className='text-lg leading-6 dark:text-white font-semibold text-gray-800'>
                        DPD Delivery
                        <br />
                        <span className='font-normal'>
                          Delivery within 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className='text-lg font-semibold leading-6 dark:text-white text-gray-800'>
                    $25.00
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col'>
            <div className='flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0'>
              <div className='flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0'>
                <div className='flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start'>
                  <div className='flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8'>
                    <p className='text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800'>
                      Shipping Address
                    </p>
                    <div className='w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-md leading-5 text-gray-600'>
                      <p>Country: {orderItem.shippingAddress.country}</p>
                      <p>Province: {orderItem.shippingAddress.province}</p>
                      <p>State: {orderItem.shippingAddress.state}</p>
                      <p>Detail: {orderItem.shippingAddress.detail}</p>
                    </div>
                  </div>
                  <div className='flex justify-center md:justify-start items-center md:items-start flex-col space-y-4'>
                    <p className='text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800'>
                      Payment Method
                    </p>
                    <p className='w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center capitalize md:text-left text-md leading-5 text-gray-600'>
                      {orderItem.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {orderItem.status !== 'finished' &&
          orderItem.status !== 'cancelled' && (
            <div className='px-[20vw] flex flex-col gap-3'>
              <Button
                className='w-full'
                onClick={() => {
                  toggleConfirmOrderModal(true);
                  setIsCancelling(false);
                }}
              >
                Finish Order
              </Button>
              <Button
                className='w-full'
                color='failure'
                onClick={() => {
                  toggleConfirmOrderModal(true);
                  setIsCancelling(true);
                }}
              >
                Cancel Order
              </Button>
            </div>
          )}
      </div>
    </>
  );
};

export default OrderDetail;
