import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice.js';
import { useLoginMutation } from '../../store/api/authApi.js';
import { setAuthError, cleanError, uiSelectors } from '../../store/slices/uiSlice.js';
import { PAGES } from '../../routes.js';
import loginPic from '../../assets/pictures/avatar-login.jpg';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loginUser] = useLoginMutation();
  const { t } = useTranslation();
  const inputRef = useRef();
  const location = useLocation();
  const isAuthFailed = useSelector(uiSelectors.selectIsAuthError);
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (data, { setErrors }) => {
      try {
        setErrors({});
        dispatch(cleanError());
        const userData = await loginUser(data).unwrap();
        dispatch(login(userData));
        const { from } = location.state || { from: { pathname: PAGES.getChat() } };
        navigate(from);
      } catch (e) {
        if (e.code === 'ERR_NETWORK') {
          toast.error(t('notifications.connection'));
        }
        dispatch(setAuthError({ type: 'AuthError', code: e.code }));
        inputRef.current.select();
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginPic} className="rounded-circle" alt={t('login.header')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6">
                <h1 className="text-center mb-4">{t('login.header')}</h1>
                <fieldset>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder={t('login.username')}
                      name="username"
                      id="username"
                      autoComplete="username"
                      isInvalid={isAuthFailed}
                      required
                      ref={inputRef}
                    />
                    <label htmlFor="username">{t('login.username')}</label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder={t('login.password')}
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      isInvalid={isAuthFailed}
                      required
                    />
                    <label htmlFor="password">{t('login.password')}</label>
                    <Form.Control.Feedback type="invalid">
                      {t('errors.login')}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100 mb-3"
                    disabled={formik.isSubmitting}
                  >
                    {t('login.submit')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {`${t('login.noAccount')} `}
                </span>
                <Link to={PAGES.getSignup()}>
                  {t('login.signup')}
                </Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
