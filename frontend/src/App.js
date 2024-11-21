import './styles/main.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import store from './store/index.js';
import LoginPage from './components/pages/LoginPage.js';
import ChatPage from './components/chat/ChatPage.js';
import SignupPage from './components/pages/SignupPage.js';
import PrivateRoute from './components/authorization/PrivateRoute.js';
import AuthProvider from './components/authorization/AuthProvider.js';
import NotFoundPage from './components/pages/NotFoundPage.js';
import LogOutButton from './components/authorization/AuthButton.js';

const App = () => (
  <div className="d-flex flex-column vh-100 bg-light">
    <Provider store={store}>
      <AuthProvider>
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
            <LogOutButton />
          </Container>
        </Navbar>
        <Router>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/"
              element={(
                <div className="container h-100 my-4 overflow-hidden rounded shadow flex-grow-1">
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
                </div>
              )}
            />
            <Route
              path="/login"
              element={(
                <div className="container h-100 my-4 overflow-hidden rounded shadow flex-grow-1">
                  <LoginPage />
                </div>
              )}
            />
            <Route
              path="/signup"
              element={(
                <div className="container h-100 my-4 overflow-hidden rounded shadow flex-grow-1">
                  <SignupPage />
                </div>
              )}
            />
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </Provider>
  </div>
);

export default App;
