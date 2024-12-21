import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectors } from '../../store/slices/authSlice';
import { PAGES } from '../../routes';

const PrivateRoute = () => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectors.selectIsLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to={PAGES.getLogin()} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
