import './assets/styles/main.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store/index.js';
import LoginPage from './components/pages/LoginPage.js';
import ChatPage from './components/chat/ChatPage.js';
import SignupPage from './components/pages/SignupPage.js';
import PrivateRoute from './components/authorization/PrivateRoute.js';
import AuthProvider from './components/authorization/AuthProvider.js';
import NotFoundPage from './components/pages/NotFoundPage.js';
import Header from './components/Header.js';
import AppWrapper from './components/AppWrapper.js';

const App = () => (
  <AppWrapper>
    <Provider store={store}>
      <AuthProvider>
        <Header />
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
  </AppWrapper>
);

export default App;
