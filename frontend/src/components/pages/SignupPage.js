import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/index.js';
import routes from '../../routes.js';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const SignupPage = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const [signupError, setSignupError] = useState('');
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .max(20, 'Must be 20 characters or less')
      .required(t('errors.required')),
    password: Yup.string()
      .min(6, 'Must be at least 6 characters')
      .required(t('errors.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('errors.passwordMatch'))
      .required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setSignupError('');
        // Send only username and password to the server
        const signupData = {
          username: values.username,
          password: values.password,
        };
        
        const res = await axios.post(routes.signupPath(), signupData);
        const authData = {
          username: res.data.username,
          token: res.data.token,
        };
        
        auth.logIn(authData);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError) {
          if (err.response?.status === 409) {
            setSignupError('Username already taken');
          } else {
            setSignupError('Network error');
          }
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Form onSubmit={formik.handleSubmit} className="p-3">
                <h1 className="text-center mb-4">{t('signup.signupHeader')}</h1>
                <fieldset>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder="Username"
                      name="username"
                      id="username"
                      autoComplete="username"
                      isInvalid={
                        (formik.touched.username && formik.errors.username) ||
                        signupError
                      }
                      required
                      ref={inputRef}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.touched.username && formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="Password"
                      name="password"
                      id="password"
                      autoComplete="new-password"
                      isInvalid={formik.touched.password && formik.errors.password}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.touched.password && formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="confirmPassword">{t('signup.confirmPassword')}</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      placeholder="Confirm password"
                      name="confirmPassword"
                      id="confirmPassword"
                      autoComplete="new-password"
                      isInvalid={
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                      }
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.touched.confirmPassword && formik.errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {signupError && (
                    <div className="text-danger mb-3">{signupError}</div>
                  )}

                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100"
                    disabled={formik.isSubmitting}
                  >
                    {t('signup.signup')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;