import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import LoginPage  from './Components/Form';
import { NotFound } from './Components/NotFound.js';
import PrivatePage from './Components/PrivateChat';
import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';

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
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  );
};

const App = () => {
  return (<AuthProvider>
  <Router>
    <div className="container p-3">
      <h1 className="text-center mt-5 mb-4">Welcome to the secret chat!</h1>
      <Routes>
        <Route path="/" element={null} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/error" element={<NotFound />} />
        {/* <Route
          path="/private"
          element={(
            <PrivateRoute>
              <PrivatePage />
            </PrivateRoute>
          )}
        /> */}
      </Routes>
    </div>

  </Router>
</AuthProvider>)
}

export default App;