import React from 'react';

const CheckoutHeader = () => {
  return (
    <header className='relative mx-auto max-w-7xl py-4 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:bg-transparent lg:px-8 lg:pt-16 lg:pb-2'>
      <div className='mx-auto flex max-w-2xl px-4 lg:w-full lg:max-w-lg lg:px-0'>
        <a href='#'>
          <h2 className='text-3xl mb-[2rem]'>Checkout</h2>
        </a>
      </div>
    </header>
  );
};

export default CheckoutHeader;
