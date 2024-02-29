import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductContext from '../lib/store/productContext';
import { Button, Spinner } from 'flowbite-react';
import NotFound from './NotFound';

const ProductDetail = () => {
  const { products, getProducts } = useContext(ProductContext);
  const { productId } = useParams();
  const productDetail = products.find((product) => product._id === productId);
  console.log(productDetail);

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }

    // make the view to the top of the page
    window.scrollTo(0, 0);
  }, []);

  if (products.length === 0) {
    return (
      <div className='flex items-center justify-center min-h-[80vh]'>
        <Spinner size='lg' />
      </div>
    );
  } else if (productDetail) {
    const { title, image, price, description } = productDetail;
    return (
      <section className='pt-[10vh] lg:py-32 h-screen'>
        <div className='container mx-auto'>
          {/* image & text wrapper */}
          <div className='flex flex-col lg:flex-row items-center'>
            {/* image */}
            <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
              <img
                className='max-w-[150px] lg:max-w-sm'
                width='60%'
                height='60%'
                src={image}
                alt=''
              />
            </div>
            {/* text */}
            <div className='flex-1 text-center lg:text-left'>
              <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>
                {title}
              </h1>
              <div className='text-xl text-red-500 font-medium mb-6'>
                $ {price}
              </div>
              <p className='mb-8'>{description}</p>
              <div className='flex justify-center'>
                <Button
                  // onClick={addToCartHandler}
                  className='text-center'
                >
                  Add to cart
                </Button>
                <Button
                  // onClick={addToCartHandler}
                  className='text-center'
                >
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <NotFound />;
  }
};

export default ProductDetail;
