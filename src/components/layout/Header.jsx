import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdArrowForward, IoMdLogOut } from 'react-icons/io';

import UIContext from '../../lib/store/uiContext';
import logo from '../../assets/atamall-logo.png';
import { Button } from 'flowbite-react';
import UserContext from '../../lib/store/userContext';

const Header = () => {
  const { toggleSideNav } = useContext(UIContext);
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
    <header className='fixed w-full z-10 bg-white py-3 shadow-md flex justify-between p-4 items-center'>
      <div className='text-2xl font-bold text-center w-[60px]'>
        <Link to={'/'}>
          {/* <p className='font-mono'>Atamall</p> */}
          <img src={logo} alt='Atamall Logo' width='' />
        </Link>
      </div>
      <button
        onClick={() => toggleSideNav()}
        className='md:hidden text-xl border border-transparent focus:border-slate-200'
      >
        <RxHamburgerMenu size='1.4rem' />
      </button>
      <nav className='hidden md:block'>
        <ul className='w-full flex items-center gap-5'>{navLinks}</ul>
      </nav>
    </header>
  );
};

export default Header;
