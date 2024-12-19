import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectors } from '../store/slices/authSlice';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectors.selectIsLoggedIn);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {loggedIn ? (
          <Button variant="primary" onClick={handleLogout}>
            {t('logOutBtn')}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header;
