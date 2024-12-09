import LoginPage from '../components/pages/LoginPage.js';
import ChatPage from '../components/pages/ChatPage.js';
import SignupPage from '../components/pages/SignupPage.js';
import NotFoundPage from '../components/pages/NotFoundPage.js';

const pagesList = {
  ChatPage: <ChatPage />,
  LoginPage: <LoginPage />,
  SignupPage: <SignupPage />,
  NotFoundPage: <NotFoundPage />,
};

export default pagesList;
