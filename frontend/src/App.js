import './assets/styles/main.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectors } from './store/slices/authSlice.js';
import { PAGES } from './routes.js';
import PrivateRoute from './components/authorization/PrivateRoute';
import Header from './components/Header';
import AppWrapper from './components/AppWrapper';
import LoginPage from './components/Pages/LoginPage';
import ChatPage from './components/Pages/ChatPage';
import SignupPage from './components/Pages/SignupPage';
import NotFoundPage from './components/Pages/NotFoundPage';

const App = () => {
  const isAuth = useSelector(selectors.selectIsLoggedIn);
  return (

    <AppWrapper>
      <Header />
      <Router>
        <Routes>
          <Route path={PAGES.getLogin()} element={<LoginPage />} />
          <Route path={PAGES.getSignup()} element={<SignupPage />} />
          <Route element={<PrivateRoute isAuth={isAuth} />}>
            <Route path={PAGES.getChat()} element={<ChatPage />} />
          </Route>
          <Route path={PAGES.getNotFound()} element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </AppWrapper>
  );
};


export default App;
