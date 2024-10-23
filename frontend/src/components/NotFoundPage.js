import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <nav>
    <h1>404 Error.Page was not found</h1>
    <ul>
      <li>
        <Link to="/">Go back to Main page</Link>
      </li>
      <li>
        <Link to="/login">Go back to LogIn page</Link>
      </li>
    </ul>
  </nav>
);

export default NotFoundPage;