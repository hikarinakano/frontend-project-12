import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import usePageTranslation from '../../hooks/usePageTranslation';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice.js';
import routes from '../../routes.js';
import signupPic from '../../assets/pictures/sign-in-logo.jpg';

const SignupPage = () => {
  const dispatch = useDispatch();
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

        dispatch(loginSuccess(authData));
        navigate('/');
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError) {
          if (error.response?.status === 409) {
            setSignupError(err('usernameTaken'));
            inputRef.current.select();
          } else if (!error.response) {
            toast.error(t('notifications.connection'));
            setSignupError(err('networkError'));
          }
          return;
        }
        throw error;
      }
    },
  });
  const isPasswordConfirmed = formik.touched.confirmPassword && formik.errors.confirmPassword;
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={signupPic} className="rounded-circle" alt={translation('signupHeader')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{translation('signupHeader')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    placeholder={translation('username')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    required
                    ref={inputRef}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.username && formik.errors.username) || signupError}
                  />
                  <Form.Label htmlFor="username">{translation('username')}</Form.Label>
                  <div className="invalid-tooltip">
                    {formik.errors.username}
                  </div>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    placeholder={translation('password')}
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.password && formik.errors.password) || signupError}
                  />
                  <div className="invalid-tooltip">
                    {formik.errors.password}
                  </div>
                  <Form.Label htmlFor="password">{translation('password')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    placeholder={translation('confirmPassword')}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="new-password"
                    required
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={isPasswordConfirmed || signupError}
                  />
                  <div className="invalid-tooltip">
                    {signupError || formik.errors.confirmPassword}
                  </div>
                  <Form.Label htmlFor="confirmPassword">{translation('confirmPassword')}</Form.Label>
                </Form.Group>

                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  {translation('signup')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
