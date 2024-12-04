import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../../store/slices/authSlice';

const LogOutButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    loginSuccess
      ? <Button variant="primary" onClick={handleLogout}>{t('logOutBtn')}</Button>
      : ''
  );
};

export default LogOutButton;
