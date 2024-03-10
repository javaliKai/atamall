import React from 'react';

const ProductCheckout = ({ product }) => {
  return (
    <li className='flex items-start space-x-4 py-6'>
      <img
        src={product.image}
        alt={product.title}
        className='h-20 w-20 flex-none rounded-md object-contain object-center'
      />
      <div className='flex-auto space-y-1'>
        <h3 className='text-black'>{product.title}</h3>
        <p>{product.category}</p>
      </div>
      <p className='flex-none text-base font-medium text-black'>
        ${product.price}
      </p>
    </li>
  );
};

export default ProductCheckout;
