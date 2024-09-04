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
import LoginPage  from './components/Form.js';
import { NotFound } from './components/NotFound.js';
import PublicPage from './components/PublicPage.js';
import PrivatePage from './components/PrivateChat.js';
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
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Secret Place</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/public">Public page</Nav.Link>
          <Nav.Link as={Link} to="/private">Private page</Nav.Link>
        </Nav>
        <AuthButton />
      </Navbar>

      <div className="container p-3">
        <h1 className="text-center mt-5 mb-4">Welcome to the secret place!</h1>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/error" element={<NotFound/>} />
          <Route path="/public" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/private"
            element={(
              <PrivateRoute>
                <PrivatePage />
              </PrivateRoute>
            )}
          />
        </Routes>
      </div>

    </Router>
  </AuthProvider>)
}

export default App;