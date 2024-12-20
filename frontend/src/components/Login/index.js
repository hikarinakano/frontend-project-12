import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import Footer from './Footer';
import loginPic from '../../assets/pictures/avatar-login.jpg';

const Login = ({ inputRef }) => {
  const { t } = useTranslation();

  return (
    <Card className="shadow-sm">
      <Card.Body className="row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src={loginPic} className="rounded-circle" alt={t('login.header')} />
        </div>
        <LoginForm inputRef={inputRef} />
      </Card.Body>
      <Footer />
    </Card>
  );
};

export default Login;
