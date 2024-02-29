import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import UIContext from '../../lib/store/uiContext';
import logo from '../../assets/atamall-logo.png';

const Header = () => {
  const { toggleSideNav } = useContext(UIContext);
  return (
    <header className='fixed w-full z-10 bg-white py-3 shadow-md flex justify-between p-4 items-center'>
      <div className='text-2xl font-bold text-center w-[60px]'>
        <Link to={'/'}>
          {/* <p className='font-mono'>Atamall</p> */}
          <img src={logo} alt='Atamall Logo' width='' />
        </Link>
      </div>
      <div className='hidden header-search-container w-[30rem]'>
        <form>
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
              type='search'
              id='default-search'
              className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
              placeholder='Search Products'
              required
            />
            <button
              type='submit'
              className='text-white absolute end-2.5 bottom-2.5 bg-orange-500 hover:bg-white hover:text-orange-700 border hover:border-orange-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2'
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <button
        onClick={() => toggleSideNav()}
        className='text-xl border border-transparent focus:border-slate-200'
      >
        <RxHamburgerMenu size='1.4rem' />
      </button>
      <Link
        to='/login'
        className='hidden bg-orange hover:bg-transparent text-white font-semibold hover:text-orange py-2 px-4 border border-orange rounded transition-all'
        // className='bg-orange-500'
      >
        Login
      </Link>
    </header>
  );
};

export default Header;
