import { useRoutes } from 'react-router-dom';
import Routes from './Routes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileNav from './components/layout/MobileNav';
import { useContext, useEffect } from 'react';
import UIContext from './lib/store/uiContext';
import { Alert } from 'flowbite-react';
import UserContext from './lib/store/userContext';

function App() {
  const { alert, resetAlert, setAlert } = useContext(UIContext);
  const { tradeToken, user } = useContext(UserContext);

  let isAuthenticated =
    user !== undefined || localStorage.getItem('atamall_auth');
  const routing = useRoutes(Routes(isAuthenticated));

  // run on initial render
  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('atamall_auth');
      if (!token) {
        return;
      }

      const tradeTokenResult = await tradeToken(token);
      if (!tradeTokenResult.user) {
        localStorage.removeItem('atamall_auth');
        return setAlert({
          type: 'failure',
          message: 'Session expired, please signin again.',
        });
      }
      // if tradeToken contains user, it means session is preserved.
      // behind the scene, tradeToken will set the user obj as session, so the step ends here.
    };

    authenticateUser();
  }, []);

  useEffect(() => {
    // alert will be removed in 3s
    const alertTimeout = setTimeout(() => {
      resetAlert();
    }, 3000);

    // clean-up function
    return () => {
      clearTimeout(alertTimeout);
    };
  }, [alert]);

  return (
    <>
      {alert && (
        <Alert className='fixed right-2 top-[10vh] z-50' color={alert.type}>
          <span>{alert.message}</span>
        </Alert>
      )}
      <Header />
      <MobileNav />
      <main className='py-[5rem] px-[1rem]'>{routing}</main>
      <Footer />
    </>
  );
}

export default App;
