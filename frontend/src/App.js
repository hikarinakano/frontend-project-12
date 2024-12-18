import './assets/styles/main.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PAGES } from './routes.js';
import PrivateRoute from './components/authorization/PrivateRoute.js';
import Header from './components/Header.js';
import AppWrapper from './components/AppWrapper.js';
import LoginPage from './components/pages/LoginPage.js';
import ChatPage from './components/pages/ChatPage.js';
import SignupPage from './components/pages/SignupPage.js';
import NotFoundPage from './components/pages/NotFoundPage.js';

const App = () => (
  <AppWrapper>
    <Header />
    <Router>
      <Routes>
        <Route path={PAGES.getLogin()} element={<LoginPage />} />
        <Route path={PAGES.getSignup()} element={<SignupPage />} />
        <Route element={<PrivateRoute />}>
          <Route path={PAGES.getChat()} element={<ChatPage />} />
        </Route>
        <Route path={PAGES.getNotFound()} element={<NotFoundPage />} />
      </Routes>
    </Router>
    <ToastContainer />
  </AppWrapper>
);

export default App;
