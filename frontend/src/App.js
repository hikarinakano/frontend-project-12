import './assets/styles/main.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import getRoutes from './navigation/getRoutes.js';
import pagesList from './navigation/pagesList.js';
import PrivateRoute from './components/authorization/PrivateRoute.js';
import Header from './components/Header.js';
import AppWrapper from './components/AppWrapper.js';

const App = () => (
  <AppWrapper>
    <Header />
    <Router>
      <Routes>
        {getRoutes().map(({
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
