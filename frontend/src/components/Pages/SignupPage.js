import { useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SignupForm from '../Signup/SignupForm';
import signupPic from '../../assets/pictures/sign-in-logo.jpg';

const SignupPage = () => {
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
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
        </div>
      </div>
    </div>
  );
};

export default SignupPage;