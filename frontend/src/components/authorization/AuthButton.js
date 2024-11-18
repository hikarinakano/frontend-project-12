import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks';

const LogOutButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    auth.loggedIn
      ? <Button variant="primary" onClick={auth.logOut}>{t('logOutBtn')}</Button>
      : ''
  );
};

export default LogOutButton;
