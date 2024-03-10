// import link
import { Link, useNavigate } from 'react-router-dom';
// import icons
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';
import { useContext, useState } from 'react';
import UserContext from '../../lib/store/userContext';
import CartContext from '../../lib/store/cartContext';
import UIContext from '../../lib/store/uiContext';
import { Button } from 'flowbite-react';

const CartItemComponent = ({ item }) => {
  const { token } = useContext(UserContext);
  const { increaseQty, decreaseQty, removeItem } = useContext(CartContext);
  const { setAlert } = useContext(UIContext);
  const [disableBtn, setDisableBtn] = useState(false);
  console.log(disableBtn);

  const { productId, title, image, price, quantity } = item;

  const decreaseQtyHandler = async () => {
    setDisableBtn(true);
    const result = await decreaseQty(productId, token);
    if (result.errorObj) {
      setAlert({ type: 'failure', message: result.errorObj.message });
    }
    setDisableBtn(false);
  };

  const increaseQtyHandler = async () => {
    setDisableBtn(true);
    const result = await increaseQty(productId, token);
    if (result.errorObj) {
      setAlert({ type: 'failure', message: result.errorObj.message });
    }
    setDisableBtn(false);
  };

  const removeItemHandler = async () => {
    setDisableBtn(true);
    const result = await removeItem(productId, token);
    if (result.errorObj) {
      setAlert({ type: 'failure', message: result.errorObj.message });
    }
    setDisableBtn(false);
  };

  return (
    <div
      className={
        'flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500'
      }
    >
      <div className={'w-full min-h-[150px] flex items-center gap-x-4'}>
        {/* image */}
        <Link to={`/product/${productId}`}>
          <img className={'max-w-[80px]'} src={image} alt={''} />
        </Link>
        <div className={'w-full flex flex-col'}>
          {/* title & remove icon */}
          <div className={'flex justify-between mb-2'}>
            {/* title */}
            <Link
              to={`/product/${productId}`}
              className={
                'text-sm uppercase font-medium max-w-[240px] text-primary hover:underline'
              }
            >
              {title}
            </Link>
            {/* remove icon */}
            <div
              onClick={() => removeItemHandler()}
              className={'text-xl cursor-pointer'}
            >
              <IoMdClose
                className={'text-gray-500 hover:text-red-500 transition'}
              />
            </div>
          </div>
          <div className={'flex gap-x-2 h-[36px] text-sm'}>
            {/* qty */}
            <div
              className={
                'flex flex-1 gap-2 max-w-[100px] items-center h-full text-primary font-medium'
              }
            >
              {/* minus icon */}
              <Button
                size='xs'
                color='gray'
                disabled={disableBtn}
                onClick={() => decreaseQtyHandler()}
                className={
                  'flex-1 h-full flex justify-center items-center cursor-pointer'
                }
              >
                <IoMdRemove />
              </Button>

              <div className={'h-full flex justify-center items-center px-2'}>
                {quantity}
              </div>
              {/* plus icon */}
              <Button
                size='xs'
                color='gray'
                disabled={disableBtn}
                onClick={() => increaseQtyHandler()}
                className={
                  'flex-1 h-full flex justify-center items-center cursor-pointer'
                }
              >
                <IoMdAdd />
              </Button>
            </div>
            {/* item price */}
            <div className={'ml-4 flex-1 flex items-center'}>
              {'x'} $ {price}
            </div>
            {/* final price */}
            {/* make the price at two decimals */}
            <div
              className={
                'flex-1 flex justify-end items-center text-primary font-medium'
              }
            >
              {`$ ${parseFloat(price * quantity).toFixed(2)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
