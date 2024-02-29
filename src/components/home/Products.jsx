import React from 'react';
import ProductCard from './ProductCard';

const Products = ({ data }) => {
  return (
    <div className='mx-auto'>
      <div className='flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
        {/* <div className='grid'> */}
        {data.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
    </div>
  );
};

export default Products;
