import './assets/styles/main.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { pageRoutes } from './routes.js';
import PrivateRoute from './components/authorization/PrivateRoute.js';
import Header from './components/Header.js';
import AppWrapper from './components/AppWrapper.js';
import LoginPage from './components/pages/LoginPage.js';
import ChatPage from './components/pages/ChatPage.js';
import SignupPage from './components/pages/SignupPage.js';
import NotFoundPage from './components/pages/NotFoundPage.js';

const pagesList = {
  ChatPage: <ChatPage />,
  LoginPage: <LoginPage />,
  SignupPage: <SignupPage />,
  NotFoundPage: <NotFoundPage />,
};


const App = () => (
  <AppWrapper>
    <Header />
    <Router>
      <Routes>
        {pageRoutes().map(({
          key,
          path,
          component,
          private: isPrivate,
        }) => (
          <Route
            key={key}
            path={path}
            element={
              isPrivate ? (
                <PrivateRoute>{pagesList[component]}</PrivateRoute>
              ) : (
                pagesList[component]
              )
            }
          />
        ))}
      </Routes>
    </Router>
    <ToastContainer />
  </AppWrapper>
);

export default App;
