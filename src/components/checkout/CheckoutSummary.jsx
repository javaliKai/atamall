import ProductCheckout from './ProductCheckout';

const CheckoutSummary = ({ cartItems }) => {
  console.log(cartItems);
  let subTotal = 0;
  cartItems.forEach((product) => {
    subTotal += (product.price * 100 * product.quantity) / 100;
  });

  return (
    <section
      aria-labelledby='summary-heading'
      className=' pt-6 pb-12 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-24'
    >
      <div className='mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0 text-black'>
        <h2 id='summary-heading' className='sr-only'>
          Order summary
        </h2>

        <dl>
          <dd className='mt-1 text-3xl font-bold tracking-tight'>Cart Items</dd>
        </dl>

        <ul
          role='list'
          className='divide-y divide-white divide-opacity-10 text-sm font-medium'
        >
          {cartItems.map((product) => (
            <ProductCheckout key={product._id} product={product} />
          ))}
        </ul>

        <dl className='border-t border-white border-opacity-10 pt-6 text-sm'>
          <div className='flex items-center justify-between border-t-2 py-4 font-medium'>
            <dt>Subtotal</dt>
            <dd>${subTotal}</dd>
          </div>

          <div className='flex items-center justify-between border-b-2 py-4 font-medium'>
            <dt>Shipping</dt>
            <dd>$25.00</dd>
          </div>

          <div className='flex items-center justify-between border-b py-6 text-black font-bold'>
            <dt className='text-2xl'>Total</dt>
            <dd className='text-2xl'>${subTotal + 25.0}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default CheckoutSummary;
