import { Navbar } from 'flowbite-react';
import { useContext } from 'react';
import UserContext from '../../lib/store/userContext';
import { Link, useLocation } from 'react-router-dom';

const AdminNav = () => {
  const { pathname } = useLocation();
  const currentPage = pathname.split('/')[2];

  const { signOut } = useContext(UserContext);

  return (
    <Navbar fluid rounded className='bg-gray-200'>
      <Navbar.Brand>
        <span className='self-center whitespace-nowrap text-xl font-semibold'>
          Atamall Admin
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link active={currentPage === 'dashboard'}>
          <Link to='/admin/dashboard'>Products</Link>
        </Navbar.Link>
        <Navbar.Link active={currentPage === 'orders'}>
          <Link to='/admin/orders'>Orders</Link>
        </Navbar.Link>
        <Navbar.Link active={currentPage === 'analytics'}>
          <Link to='/admin/analytics'>Sales Analytics</Link>
        </Navbar.Link>
        <Navbar.Link onClick={() => signOut()} className='cursor-pointer'>
          Sign Out
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNav;
