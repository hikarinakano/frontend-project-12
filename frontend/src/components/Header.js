import { Navbar, Container } from 'react-bootstrap';
import LogOutButton from './authorization/AuthButton';

const Header = () => (
  <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <Container>
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      <LogOutButton />
    </Container>
  </Navbar>
);

export default Header;
