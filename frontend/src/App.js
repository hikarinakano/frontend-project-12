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
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100 bg-light">
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
                <Route path="/" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Routes>
            </Router>
            <ToastContainer />
          </AuthProvider>
        </Provider>
      </div>
    </div>
  </div>
);

export default App;
