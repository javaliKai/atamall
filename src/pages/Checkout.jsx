import { useContext, useEffect } from 'react';
import { Spinner } from 'flowbite-react';
import CheckoutHeader from '../components/checkout/CheckoutHeader';
import CheckoutSummary from '../components/checkout/CheckoutSummary';
import CheckoutPayment from '../components/checkout/CheckoutPayment';
import CartContext from '../lib/store/cartContext';
import UserContext from '../lib/store/userContext';

const Checkout = () => {
  const { getCart, cartItems } = useContext(CartContext);
  const { token, user } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      getCart(token);
    }
  }, [token]);

  if (cartItems.length === 0) {
    return (
      <div className='flex items-center justify-center min-h-[80vh]'>
        <Spinner size='lg' />
      </div>
    );
  }
  return (
    <div>
      {/* Background color split screen for large screens */}
      <div
        className='fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block'
        aria-hidden='true'
      />
      <div
        className='fixed top-0 right-0 hidden h-full w-1/2 border-slate-250 border-l-2 lg:block'
        aria-hidden='true'
      />
      <CheckoutHeader />
      <main className='relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8'>
        <h1 className='sr-only'>Checkout</h1>
        <CheckoutSummary cartItems={cartItems} />
        <CheckoutPayment
          customerAddressArr={user.address}
          products={cartItems}
        />
      </main>
    </div>
  );
};

export default Checkout;
