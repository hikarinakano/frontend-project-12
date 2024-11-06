import useAuth from "../../hooks";
import { Button } from "react-bootstrap";
const LogOutButton = () => {
  const auth = useAuth();
  return (
    auth.loggedIn
      ? <Button variant="primary" onClick={auth.logOut}>Log out</Button>
      : ''
  );
};

export default LogOutButton;