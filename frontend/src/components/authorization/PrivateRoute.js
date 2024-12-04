import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectors } from '../../store/slices/authSlice';
const PrivateRoute = ({ children }) => {
  const loggedIn = useSelector(selectors.selectIsLoggedIn);
  const location = useLocation();
  return (
    loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
