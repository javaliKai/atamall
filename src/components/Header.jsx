import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='fixed w-full z-10 bg-white py-3 shadow-md flex justify-between p-4 items-center'>
      <div className='text-2xl font-bold text-center'>
        <Link to={'/'}>
          <p className='font-mono'>GroovyGoodies</p>
        </Link>
      </div>
      <div className='header-search-container w-[30rem]'>
        <form
        // onSubmit={productSearchHandler}
        >
          <label
            htmlFor='default-search'
            className='mb-2 text-sm font-medium text-gray-900 sr-only'
          >
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              // ref={searchRef}
              type='search'
              id='default-search'
              className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
              placeholder='Search Products'
              required
            />
            <button
              type='submit'
              className='text-white absolute end-2.5 bottom-2.5 bg-rose-600 hover:bg-white hover:text-rose-700 border hover:border-rose-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <Link
        to='/login'
        // className='bg-transparent hover:bg-rose-500 text-rose-700 font-semibold hover:text-white py-2 px-4 border border-rose-500 hover:border-transparent rounded'
      >
        <Button
          variant='contained'
          color='secondary'
          // className='bg-transparent hover:bg-rose-500 text-rose-700 font-semibold hover:text-white py-2 px-4 border border-rose-500 hover:border-transparent rounded'
        >
          Login
        </Button>
      </Link>
      {/* {isAuthenticated ? (
        <div className='cursor-pointer flex items-center gap-5'>
          <Link to='/profile'>
            <IoPersonCircleOutline className='text-3xl' />
          </Link>
          <Link to='/orders'>
            <RiBillLine className='text-3xl' />
          </Link>
          <span onClick={wishlistClickHandler}>
            <IoMdHeartEmpty className='text-3xl' />
          </span>
          <div onClick={cartClickHandler} className='relative'>
            <MdOutlineShoppingCart className='text-3xl' />
            <div
              className='bg-red-500 absolute top-[-10px] right-[-5px] text-[12px]
          w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'
            >
              {cartItemsTotal}
            </div>
          </div>
          <div onClick={logoutHandler}>
            <IoMdExit className='text-3xl' />
          </div>
        </div>
      ) : (
        <Link
          to='/login'
          className='bg-transparent hover:bg-rose-500 text-rose-700 font-semibold hover:text-white py-2 px-4 border border-rose-500 hover:border-transparent rounded'
        >
          Login
        </Link>
      )} */}
    </header>
  );
};

export default Header;
