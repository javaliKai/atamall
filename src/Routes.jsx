import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import CustomerProfile from './pages/CustomerProfile';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';

const Routes = (isAuthenticated) => [
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signin',
    element: isAuthenticated ? <Navigate to='/' /> : <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profile',
    element: isAuthenticated ? <CustomerProfile /> : <Navigate to='/signin' />,
  },
  {
    path: '/product/:productId',
    element: <ProductDetail />,
  },
  {
    path: '/wishlist',
    element: isAuthenticated ? <Wishlist /> : <Navigate to='/signin' />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default Routes;
