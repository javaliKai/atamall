import React, { useContext, useEffect, useState } from 'react';
import ProductCard from '../components/home/ProductCard';
import UserContext from '../lib/store/userContext';
import ProductContext from '../lib/store/productContext';
import { Button, Spinner } from 'flowbite-react';

const Wishlist = () => {
  const { user } = useContext(UserContext);
  const { products, getProducts } = useContext(ProductContext);
  const wishlistProduct = [];
  // populate wishlist product
  if (user && user.wishlist.length > 0) {
    user.wishlist.forEach((wishlistProd) => {
      const product = products.find(
        (prod) => prod._id === wishlistProd.productId
      );
      wishlistProduct.push(product);
    });
  }

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }

    // make the view to the top of the page
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className='mt-3'>
        <h2 className='text-2xl md:text-3xl mb-[2rem]'>Wishlist</h2>

        <div className='flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
          {wishlistProduct.length === 0 && (
            <p className='italic'>No wishlist found.</p>
          )}
          {wishlistProduct.length > 0 && (
            <>
              {wishlistProduct.map((wp) => (
                <ProductCard key={wp._id} product={wp} isWishlist={true} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
