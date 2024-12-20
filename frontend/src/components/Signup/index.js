import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SignupForm from './SignupForm';
import signupPic from '../../assets/pictures/sign-in-logo.jpg';

const Signup = ({ inputRef }) => {
  const { t } = useTranslation();

  return (
    <Card className="shadow-sm">
      <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div>
          <img
            src={signupPic}
            className="rounded-circle"
            alt={t('signup.signupHeader')}
          />
        </div>
        <SignupForm inputRef={inputRef} />
      </Card.Body>
    </Card>
  );
};

export default Signup; 