import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar, Card } from 'react-bootstrap';
import LoginPage from './components/LoginPage.js';
import PrivatePage from './components/PrivatePage.js'
import AuthContext from './contexts/auth-context.js';
import NotFoundPage from './components/NotFoundPage.js'
import useAuth from './hooks/index.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
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

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
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

const App = () => (
  <AuthProvider>
    <Navbar>
      <AuthButton/>
    </Navbar>
    <Router>
      <div className="container p-3">
        <Routes>
          <Route path="*" element={<NotFoundPage/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <PrivatePage />
              </PrivateRoute>
            )}
          />
            <Route path="/signup" element={<LoginPage/>}/>
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
