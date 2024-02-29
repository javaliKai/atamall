import { Link } from 'react-router-dom';
// import icons
import { IoMdArrowForward, IoMdLogOut } from 'react-icons/io';
import { useContext, useState } from 'react';
import UIContext from '../../lib/store/uiContext';
import { Button } from 'flowbite-react';
import UserContext from '../../lib/store/userContext';

const MobileNav = () => {
  const { showSideNav, toggleSideNav } = useContext(UIContext);
  const { user, signOut } = useContext(UserContext);

  const signOutHandler = () => {
    signOut();
  };

  let navLinks;
  if (user) {
    navLinks = (
      <>
        <li className='hover:underline hover:text-cyan-900'>
          <Link to='/profile'>Profile</Link>
        </li>
        <li className='hover:underline hover:text-cyan-900'>
          <Link to='/wishlist'>Wishlist</Link>
        </li>
        <li
          onClick={() => signOutHandler()}
          className='hover:underline hover:text-cyan-900 cursor-pointer'
        >
          <span className='flex items-center gap-1'>
            Sign Out <IoMdLogOut />
          </span>
        </li>
      </>
    );
  } else {
    navLinks = (
      <li onClick={() => toggleSideNav()}>
        <Link to='/signin'>
          <Button className='w-full' pill>
            Sign in
          </Button>
        </Link>
      </li>
    );
  }

  return (
    <>
      {/* Background */}
      <div
        className={`${
          !showSideNav ? 'hidden' : ''
        } overflow-y-auto w-full bg-black opacity-40 fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
      ></div>
      <div
        className={`${showSideNav ? 'right-0' : '-right-full'}
           overflow-y-auto w-[50%] bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
      >
        <div className={'flex items-center justify-between py-6 border-b'}>
          <div className={'uppercase text-sm font-semibold'}>
            {/* Shopping Cart ({cartItemsTotal}) */}
            Menu
          </div>
          {/* icon */}
          <div
            onClick={() => toggleSideNav()}
            className={
              'cursor-pointer w-8 h-8 flex justify-center items-center'
            }
          >
            <IoMdArrowForward className={'text-2xl'} />
          </div>
        </div>
        <nav>
          <ul className='mt-5 w-full flex flex-col gap-3'>{navLinks}</ul>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
