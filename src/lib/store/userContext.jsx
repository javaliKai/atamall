import axios from 'axios';
import { createContext, useState } from 'react';

// Creating a context (global state) with its initial value
const UserContext = createContext({
  user: undefined,
  token: undefined,
  signIn: (email, password) => {},
  signOut: () => {},
  tradeToken: (token) => {},
});

// Exporting provider: the wrapper component that enables state sharing
export const UserContextProvider = (props) => {
  /** Define the state here... */
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(undefined);

  /** Sign in method, returns a result object that indicates whether the request success or not */
  // @async
  const signIn = async (email, password) => {
    const result = {
      user: undefined,
      errorObj: undefined,
    };

    try {
      const response = await axios.post('/api/auth/signin', {
        email,
        password,
      });

      // receive and set token session
      const userToken = response.data.token;
      setToken(userToken);

      // save to localStorage
      localStorage.setItem('atamall_auth', userToken);

      // get user info and store in the context
      const tradeTokenResponse = await axios.get('/api/user/trade/token', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const user = tradeTokenResponse.data.user;
      setUser(user);

      result.user = user;
    } catch (error) {
      result.errorObj = error.response.data;
    }
    return result;
  };

  const signOut = () => {
    // clear all auth states
    setUser(undefined);
    setToken(undefined);

    // clear local storage
    localStorage.removeItem('atamall_auth');
  };

  const tradeToken = async (token) => {
    const result = {
      user: undefined,
      errorObj: undefined,
    };
    try {
      const response = await axios.get('/api/user/trade/token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data.user;
      setUser(user);
      setToken(token);

      result.user = user;
    } catch (error) {
      result.errorObj = error.response.data;
    }

    return result;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        signIn,
        signOut,
        tradeToken,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

// Exporting the context to be used in the hook
export default UserContext;
