import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSignupMutation } from '../../store/api/authApi.js';
import { setSignupError, cleanError, uiSelectors } from '../../store/slices/uiSlice.js';
import { login } from '../../store/slices/authSlice.js';
import signupPic from '../../assets/pictures/sign-in-logo.jpg';

const SignupPage = () => {
  const dispatch = useDispatch();
  const [signup] = useSignupMutation();
  const { t } = useTranslation();
  const inputRef = useRef();
  const isSignupError = useSelector(uiSelectors.selectIsSignupError);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t('errors.length'))
      .max(20, t('errors.length'))
      .required(t('errors.required')),
    password: Yup.string()
      .min(6, t('errors.passwordLength'))
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
    validateOnChange: true,
    onSubmit: async (values, { setErrors }) => {
      try {
        setErrors({});
        dispatch(cleanError());
        const userData = await signup(values).unwrap();
        dispatch(login(userData));
        navigate('/');
      } catch (e) {
        if (e.code === 'ERR_NETWORK') {
          toast.error(t('notifications.connection'));
        }
        dispatch(setSignupError({ type: 'SignupError', code: 'usernameTaken' }));
        inputRef.current.select();
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
                <img src={signupPic} className="rounded-circle" alt={t('signup.signupHeader')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signup.signupHeader')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    placeholder={t('signup.username')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    required
                    ref={inputRef}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    isInvalid={(formik.touched.username && formik.errors.username) || isSignupError}
                  />
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  <div className="invalid-tooltip">
                    {formik.errors.username}
                  </div>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    placeholder={t('signup.password')}
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={(formik.touched.password && formik.errors.password) || isSignupError}
                  />
                  <div className="invalid-tooltip">
                    {formik.errors.password}
                  </div>
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    placeholder={t('signup.confirmPassword')}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="new-password"
                    required
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    isInvalid={isPasswordConfirmed || isSignupError}
                  />
                  <div className="invalid-tooltip">
                    {isSignupError ? t('errors.usernameTaken') : formik.errors.confirmPassword}
                  </div>
                  <Form.Label htmlFor="confirmPassword">{t('signup.confirmPassword')}</Form.Label>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  {t('signup.signup')}
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
