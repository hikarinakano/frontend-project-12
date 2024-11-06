import AuthContext from '../../contexts/auth-context.js';
import { setAuthInfo, clearAuthInfo } from '../../store/slices/authSlice.js';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedAuth = localStorage.getItem('userId');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        dispatch(setAuthInfo({
          username: parsedAuth.username,
          token: parsedAuth.token
        }));
        setLoggedIn(true);
      } catch(e) {
        console.error('Failed to parse auth data', e)
      }
    }
  }, [dispatch]);

  const logIn = (authData) => {
    setLoggedIn(true);
    const authToStore = {
      username: authData.username,
      token: authData.token
    };
    localStorage.setItem('userId', JSON.stringify(authToStore));
    dispatch(setAuthInfo(authToStore));
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    dispatch(clearAuthInfo());
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;