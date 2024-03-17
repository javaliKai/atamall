import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartItemComponent from '../components/cart/CartItemComponent';
import { Spinner } from 'flowbite-react';
import CartContext from '../lib/store/cartContext';
import UserContext from '../lib/store/userContext';

const Cart = () => {
  const { token } = useContext(UserContext);
  const { getCart, cartItems } = useContext(CartContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getCart(token);
      setLoading(false);
    }
  }, [token]);

  // Calculating price
  let total = 0;
  // Calulating total number of items in a cart (all quantities)
  let cartItemsTotal = 0;
  cartItems.forEach((item) => {
    total = parseFloat(total + item.price * item.quantity).toFixed(2);
    cartItemsTotal += item.quantity;
  });

  let cartItemContent;
  let cartItemClasses;
  if (cartItemsTotal === 0) {
    cartItemClasses = 'min-h-[50vh] flex justify-center items-center italic';
    cartItemContent = <p>Your cart is empty</p>;
  } else {
    cartItemContent = cartItems.map((item) => {
      return <CartItemComponent item={item} key={item._id} />;
    });
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[80vh]'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <>
      <div className='min-h-[70vh] max-w-[65%] mx-auto'>
        <div className='flex items-center justify-between py-6 border-b'>
          <div className='uppercase text-sm font-semibold'>
            Shopping Cart ({cartItemsTotal})
          </div>
          {/* icon */}
        </div>
        <div className={cartItemClasses}>
          {cartItemContent}
          {cartItemsTotal > 0 && (
            <div className='flex flex-col gap-y-3 py-4 mt-4'>
              <div className='flex w-full justify-between items-center'>
                <div className='uppercase font-semibold'>
                  <span className='mr-2'>Total:</span>$ {total}
                </div>
              </div>
              <Link
                to='/checkout'
                className='bg-primary flex p-4 justify-center items-center text-white w-full font-medium'
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
