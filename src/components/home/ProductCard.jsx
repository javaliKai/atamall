//import link
import { Link, useNavigate } from 'react-router-dom';
//import icons
import { BsPlus, BsEyeFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { Card, Button } from 'flowbite-react';
import './ProductCard.css';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../../lib/store/userContext';
import UIContext from '../../lib/store/uiContext';

const ProductCard = ({ product, isWishlist }) => {
  const { _id, title, price, image, category } = product;
  const { token, tradeToken } = useContext(UserContext);
  const { setAlert } = useContext(UIContext);

  const addToWishlistHandler = () => {
    axios
      .post(
        '/api/user/wishlist',
        {
          productId: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        setAlert({
          type: 'success',
          message: 'Product added to wishlist!',
        });
        // re-fetch wishlist
        tradeToken(token);
      })
      .catch((error) => {
        setAlert({
          type: 'failure',
          message: error.response.data.message,
        });
      });
  };

  const removeWishlistHandler = () => {
    axios
      .delete(`api/user/wishlist/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlert({
          type: 'success',
          message: 'Product removed from wishlist!',
        });
        tradeToken(token);
      })
      .catch((error) => {
        setAlert({
          type: 'failure',
          message: error.response.data.message,
        });
      });
  };

  return (
    <Card className={`w-[100%] h-[75%] fbCard`}>
      <div className='fbborder border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition'>
        <div className='w-full h-full flex justify-center items-center'>
          {/*image*/}
          <div className='w-[200px] mx-auto flex justify-center items-center'>
            <img
              className='max-h-[160px] group-hover:scale-110 transition duration-300'
              src={image}
              alt=''
            />
          </div>
        </div>
        {/*buttons*/}
        <div className='absolute top-6 -right-11 group-hover:right-5 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
          {/* <button onClick={addToCartHandler}> */}
          <button>
            <div className='flex justify-center items-center text-white w-12 h-12 bg-red-500'>
              <BsPlus className='text-3xl' />
            </div>
          </button>
          <Link
            to={`/product/${_id}`}
            className='w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl'
          >
            <BsEyeFill />
          </Link>
          {/* <button> */}
          <button onClick={() => addToWishlistHandler()}>
            <div className='flex justify-center items-center text-rose-500 w-12 h-12 bg-white'>
              <FaHeart />
            </div>
          </button>
        </div>
      </div>
      {/* category & title & price */}
      <div>
        <div className='text-sm capitalize text-gray-500 mb-1'>{category}</div>
        <Link to={`/product/${_id}`}>
          <h2 className='font-semibold mb-1'>{title}</h2>
        </Link>
        <div className='font-semibold'>${price}</div>
      </div>
      {isWishlist && (
        <div>
          <Button onClick={() => removeWishlistHandler()} color='failure'>
            Remove From Wishlist
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
