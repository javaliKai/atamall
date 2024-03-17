import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import CustomerProfile from './pages/CustomerProfile';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';

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
    path: '/cart',
    element: isAuthenticated ? <Cart /> : <Navigate to='/signin' />,
  },
  {
    path: '/checkout',
    element: isAuthenticated ? <Checkout /> : <Navigate to='/signin' />,
  },
  {
    path: '/order',
    element: isAuthenticated ? <Orders /> : <Navigate to='/signin' />,
  },
  {
    path: '/order/:orderId',
    element: isAuthenticated ? <OrderDetail /> : <Navigate to='/signin' />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default Routes;
