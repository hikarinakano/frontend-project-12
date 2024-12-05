import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectors } from '../../store/slices/authSlice';

const LogOutButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectors.selectIsLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
  };

  return loggedIn ? (
    <Button variant="primary" onClick={handleLogout}>
      {t('logOutBtn')}
    </Button>
  ) : null;
};

export default LogOutButton;
