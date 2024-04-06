import { Progress } from 'flowbite-react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const PROGRESS_VALUE = {
  processing: 25,
  delivering: 75,
  delivered: 75,
  finished: 100,
};

const OrderProgress = ({ status }) => {
  return (
    <div className='max-w-xl mx-auto my-4 border-b-2 pb-4'>
      <div className='flex text-xs content-center text-center'>
        <div className='w-1/4 flex flex-col justify-center items-center gap-2'>
          <span>
            {PROGRESS_VALUE[status] >= 25 ? (
              <FaCheckCircle className='text-2xl text-cyan-500' />
            ) : (
              <FaRegCircle className='text-2xl text-cyan-500' />
            )}
          </span>
          <p>Confirm Payment</p>
        </div>

        <div className='w-1/4 flex flex-col justify-center items-center gap-2'>
          <span>
            {PROGRESS_VALUE[status] >= 75 ? (
              <FaCheckCircle className='text-2xl text-cyan-500' />
            ) : (
              <FaRegCircle className='text-2xl text-cyan-500' />
            )}{' '}
          </span>
          <p>Waiting for Courier</p>{' '}
        </div>

        <div className='w-1/4 flex flex-col justify-center items-center gap-2'>
          <span>
            {PROGRESS_VALUE[status] >= 75 ? (
              <FaCheckCircle className='text-2xl text-cyan-500' />
            ) : (
              <FaRegCircle className='text-2xl text-cyan-500' />
            )}{' '}
          </span>
          <p>Shipping to Address</p>{' '}
        </div>

        <div className='w-1/4 flex flex-col justify-center items-center gap-2'>
          <span>
            {PROGRESS_VALUE[status] >= 100 ? (
              <FaCheckCircle className='text-2xl text-cyan-500' />
            ) : (
              <FaRegCircle className='text-2xl text-cyan-500' />
            )}{' '}
          </span>
          <p>Confirm Acceptance</p>{' '}
        </div>
      </div>
      <div className='my-5'>
        <Progress progress={PROGRESS_VALUE[status]} color='cyan' />
      </div>
    </div>
  );
};

export default OrderProgress;
