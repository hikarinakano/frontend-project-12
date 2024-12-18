import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectors } from '../../store/slices/authSlice';
import { PAGES } from '../../routes';

const PrivateRoute = () => {
  const isAuth = useSelector(selectors.selectIsLoggedIn);
  return (
    isAuth ? <Outlet /> : <Navigate to={PAGES.getLogin()} />
  );
};

export default PrivateRoute;
