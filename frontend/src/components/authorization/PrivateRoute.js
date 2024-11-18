import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../../hooks';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const storedAuth = localStorage.getItem('userId');
  const isAuthenticated = auth.loggedIn || token || storedAuth;
  return (
    isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
