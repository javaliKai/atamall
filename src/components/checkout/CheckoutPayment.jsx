import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label, Select, Button } from 'flowbite-react';
import alipayQr from '../../assets/alipay-qr.jpeg';
import wechatQr from '../../assets/wechat-qr.png';
import OrderContext from '../../lib/store/orderContext';
import UserContext from '../../lib/store/userContext';
import UIContext from '../../lib/store/uiContext';
import CartContext from '../../lib/store/cartContext';

const CheckoutPayment = ({ customerAddressArr, products }) => {
  const navigate = useNavigate();

  const { addOrder } = useContext(OrderContext);
  const { token, user } = useContext(UserContext);
  const { setAlert } = useContext(UIContext);
  const { emptyCart, getCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('credit card');

  const submitCheckoutHandler = async (e) => {
    e.preventDefault();
    const shippingAddress = user.address[0];
    console.log(shippingAddress);
    const result = await addOrder(
      products,
      paymentMethod,
      shippingAddress,
      token
    );
    if (result.errorObj) {
      setAlert({ type: 'failure', message: result.errorObj.message });
      return;
    }

    setAlert({ type: 'success', message: 'Checkout success!' });

    // empty the user cart
    emptyCart(token);

    setTimeout(() => {
      // redirect to the order page when success
      navigate('/order');
    }, 3000);
  };

  let paymentDetailsContent;
  if (paymentMethod === 'credit card') {
    paymentDetailsContent = (
      <div className='mt-10'>
        <h3 id='payment-heading' className='text-lg font-medium text-gray-900'>
          Payment details - {paymentMethod}
        </h3>

        <div className='mt-6 grid grid-cols-3 gap-y-6 gap-x-4 sm:grid-cols-4'>
          <div className='col-span-3 sm:col-span-4'>
            <label
              htmlFor='card-number'
              className='block text-sm font-medium text-gray-700'
            >
              Card number
            </label>
            <div className='mt-1'>
              <input
                required
                type='text'
                id='card-number'
                name='card-number'
                autoComplete='cc-number'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>

          <div className='col-span-2 sm:col-span-3'>
            <label
              htmlFor='expiration-date'
              className='block text-sm font-medium text-gray-700'
            >
              Expiration date (MM/YY)
            </label>
            <div className='mt-1'>
              <input
                required
                type='text'
                name='expiration-date'
                id='expiration-date'
                autoComplete='cc-exp'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='cvc'
              className='block text-sm font-medium text-gray-700'
            >
              CVC
            </label>
            <div className='mt-1'>
              <input
                required
                type='text'
                name='cvc'
                id='cvc'
                autoComplete='csc'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (paymentMethod === 'alipay') {
    paymentDetailsContent = (
      <div className='mt-10'>
        <h3 id='payment-heading' className='text-lg font-medium text-gray-900'>
          Payment details - {paymentMethod}
        </h3>

        <div className=''>
          <img src={alipayQr} width='100%' height='100%' />
        </div>
      </div>
    );
  } else if (paymentMethod === 'wechat') {
    paymentDetailsContent = (
      <div className='mt-10'>
        <h3 id='payment-heading' className='text-lg font-medium text-gray-900'>
          Payment details - {paymentMethod}
        </h3>

        <div className=''>
          <img src={wechatQr} width='100%' height='100%' />
        </div>
      </div>
    );
  }

  let addressDetailContent;
  let payButtonSection;
  if (customerAddressArr.length > 0) {
    const customerAddress = customerAddressArr[0];
    addressDetailContent = (
      <>
        <p>Country: {customerAddress.country}</p>
        <p>Province: {customerAddress.province}</p>
        <p>State: {customerAddress.state}</p>
        <p>Address Detail: {customerAddress.detail}</p>
      </>
    );

    payButtonSection = (
      <Button type='submit' className='w-full'>
        Place Order
      </Button>
    );
  } else {
    addressDetailContent = (
      <p>
        You don't have any address yet, click{' '}
        <Link to='/profile' className='underline'>
          here
        </Link>{' '}
        to add one.
      </p>
    );
  }

  return (
    <section
      aria-labelledby='payment-and-shipping-heading'
      className='py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pt-0 lg:pb-24'
    >
      <h2 id='payment-and-shipping-heading' className='sr-only'>
        Payment and shipping details
      </h2>

      {/* <form> */}
      <form onSubmit={submitCheckoutHandler}>
        <div className='mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0'>
          <div className='mt-10'>
            <h3
              id='payment-heading'
              className='text-lg font-medium text-gray-900'
            >
              Payment methods
            </h3>
            <div className='max-w-md'>
              <div className='mb-2 block'>
                <Label htmlFor='countries' value='Select your country' />
              </div>
              <Select
                onChange={(e) => setPaymentMethod(e.target.value)}
                id='countries'
                required
              >
                <option value='credit card'>Credit Card</option>
                <option value='alipay'>Alipay</option>
                <option value='wechat'>WeChat</option>
              </Select>
            </div>
          </div>

          {paymentDetailsContent}

          <div className='mt-10'>
            <h3
              id='shipping-heading'
              className='text-lg font-medium text-gray-900'
            >
              Shipping address
            </h3>

            <div>{addressDetailContent}</div>
          </div>

          <div className='mt-10 flex justify-end border-t border-gray-200 pt-6'>
            {payButtonSection}
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckoutPayment;
