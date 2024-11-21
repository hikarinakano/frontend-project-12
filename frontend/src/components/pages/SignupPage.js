import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import usePageTranslation from '../../hooks/usePageTranslation';
import useAuth from '../../hooks/index.js';
import routes from '../../routes.js';

const SignupPage = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const translation = usePageTranslation('signup');
  const err = usePageTranslation('errors');
  const [signupError, setSignupError] = useState('');
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, err('length'))
      .max(20, err('length'))
      .required(err('required')),
    password: Yup.string()
      .min(6, err('passwordLength'))
      .required(err('required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], err('passwordMatch'))
      .required(err('required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        setSignupError('');
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
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError) {
          if (error.response?.status === 409) {
            setSignupError(err('usernameTaken'));
          } else if (!error.response) {
            toast.error(t('notifications.connection'));
            setSignupError(err('networkError'));
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
                <h1 className="text-center mb-4">{translation('signupHeader')}</h1>
                <fieldset>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      placeholder={translation('username')}
                      name="username"
                      id="username"
                      autoComplete="username"
                      isInvalid={
                        (
                          formik.touched.username && formik.errors.username
                        ) || signupError
                      }
                      required
                      ref={inputRef}
                    />
                    <label htmlFor="username">{translation('username')}</label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      type="password"
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      placeholder={translation('password')}
                      name="password"
                      id="password"
                      autoComplete="new-password"
                      isInvalid={formik.touched.password && formik.errors.password}
                      required
                    />
                    <label htmlFor="password">{translation('password')}</label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      type="password"
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      placeholder={translation('confirmPassword')}
                      name="confirmPassword"
                      id="confirmPassword"
                      autoComplete="new-password"
                      isInvalid={
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                      }
                      required
                    />
                    <label htmlFor="confirmPassword">{translation('confirmPassword')}</label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmPassword}
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
                    {translation('signup')}
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
