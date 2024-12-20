import { Outlet, Navigate } from 'react-router-dom';
import { PAGES } from '../../routes';

const PrivateRoute = ({ isAuth }) => {
  return (
    isAuth ? <Outlet /> : <Navigate to={PAGES.getLogin()} />
  );
};

export default PrivateRoute;
