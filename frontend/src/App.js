import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import LoginPage from './components/pages/LoginPage.js';
import PrivatePage from './components/pages/PrivatePage.js'
import AuthContext from './contexts/auth-context.js';
import NotFoundPage from './components/pages/NotFoundPage.js'
import useAuth from './hooks/index.js';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthInfo, clearAuthInfo } from '../src/store/slices/authSlice.js'
import store from '../src/store/index.js';
import { Provider } from 'react-redux';

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

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const storedAuth = localStorage.getItem('userId');

  console.log('PrivateRoute check:', {
    authLoggedIn: auth.loggedIn,
    reduxToken: token,
    storedAuth: storedAuth,
    parsedAuth: storedAuth ? JSON.parse(storedAuth) : null
  });
  const isAuthenticated = auth.loggedIn || token || storedAuth;
  return (
    isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  return (
    auth.loggedIn
      ? <Button className="ml-auto" onClick={auth.logOut}>Log out</Button>
      : ''
  );
};
console.log(window.localStorage)

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <Navbar>
        <AuthButton />
      </Navbar>
      <Router>
        <div className="container p-3">
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <PrivatePage />
                </PrivateRoute>
              )}
            />
            <Route path="/signup" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  </Provider>
);

export default App;
