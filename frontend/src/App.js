import './assets/styles/main.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PAGES } from './routes.js';
import PrivateRoute from './components/authorization/PrivateRoute';
import Header from './components/Header';
import AppWrapper from './components/AppWrapper';
import LoginPage from './components/Pages/LoginPage';
import ChatPage from './components/Pages/ChatPage';
import SignupPage from './components/Pages/SignupPage';
import NotFoundPage from './components/Pages/NotFoundPage';

const App = () => {
  return (
    <Router>
      <AppWrapper>
        <Header />
        <Routes>
          <Route path={PAGES.getLogin()} element={<LoginPage />} />
          <Route path={PAGES.getSignup()} element={<SignupPage />} />
          <Route element={<PrivateRoute />}>
            <Route path={PAGES.getChat()} element={<ChatPage />} />
          </Route>
          <Route path={PAGES.getNotFound()} element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </AppWrapper>
    </Router>
  );
};


export default App;
