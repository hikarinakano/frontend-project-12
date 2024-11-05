import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <nav>
    <h1>Oops! Page was not found</h1>
        <div>But you can go to <Link to="/">main page</Link></div>
  </nav>
);

export default NotFoundPage;