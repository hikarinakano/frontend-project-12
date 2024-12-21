import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../../store/api/authApi';
import { login } from '../../store/slices/authSlice';
import { PAGES } from '../../routes';
import FormField from './FormField';

const LoginForm = ({ inputRef }) => {
  const dispatch = useDispatch();
  const [loginUser] = useLoginMutation();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setErrors }) => {
      try {
        setErrors({});
        const userData = await loginUser(values).unwrap();
        dispatch(login(userData));
        const { from } = location.state || { from: { pathname: PAGES.getChat() } };
        navigate(from);
      } catch (err) {
        if (err.status === 'NETWORK_ERROR' || err.status === 'FETCH_ERROR') {
          toast.error(t('notifications.connection'));
        } else if (err.status === 401) {
          setErrors({
            username: t('errors.login'),
            password: t('errors.login'),
          });
        }
        inputRef.current.select();
      }
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6">
      <h1 className="text-center mb-4">{t('login.header')}</h1>
      <FormField
        name="username"
        label={t('login.username')}
        value={formik.values.username}
        onChange={formik.handleChange}
        isInvalid={formik.errors.username}
        error={formik.errors.username}
        inputRef={inputRef}
        autoComplete="username"
      />
      <FormField
        name="password"
        type="password"
        label={t('login.password')}
        value={formik.values.password}
        onChange={formik.handleChange}
        isInvalid={formik.errors.password}
        error={formik.errors.password}
        autoComplete="current-password"
      />
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
        disabled={formik.isSubmitting}
      >
        {t('login.submit')}
      </Button>
    </Form>
  );
};

export default LoginForm; 