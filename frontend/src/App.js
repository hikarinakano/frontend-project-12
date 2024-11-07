import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import LoginPage from './components/pages/LoginPage.js';
import ChatPage from './components/pages/ChatPage.js';
import SignupPage from './components/pages/SignupPage.js';
import PrivateRoute from './components/authorization/PrivateRoute.js';
import AuthProvider from './components/authorization/AuthProvider.js';
import NotFoundPage from './components/pages/NotFoundPage.js'
import LogOutButton from './components/authorization/AuthButton.js';
import store from '../src/store/index.js';
import { Provider } from 'react-redux';
import './styles/main.css';

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand>Hexlet Chat</Navbar.Brand>
          <div className="ms-auto">
            <LogOutButton />
          </div>
        </Container>
      </Navbar>
      <Router>
        <div className="container p-3">
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <ChatPage />
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
