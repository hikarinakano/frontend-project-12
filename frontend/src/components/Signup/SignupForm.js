import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import createValidationSchema from './validationSchema';
import FormField from './FormField';
import { useSignupMutation } from '../../store/api/authApi';
import { login } from '../../store/slices/authSlice';
import { PAGES } from '../../routes';

const SignupForm = ({ inputRef }) => {
  const dispatch = useDispatch();
  const [signup] = useSignupMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: createValidationSchema(t),
    validateOnChange: true,
    onSubmit: async (values, { setErrors }) => {
      try {
        setErrors({});
        const userData = await signup(values).unwrap();
        dispatch(login(userData));
        navigate(PAGES.getChat());
      } catch (err) {
        if (err.status === 'NETWORK_ERROR' || err.status === 'FETCH_ERROR') {
          toast.error(t('notifications.connection'));
        } else if (err.status === 409) {
          setErrors({
            username: t('errors.usernameTaken'),
          });
        }
        inputRef.current.select();
      }
    },
  });

  const isPasswordConfirmed = formik.touched.confirmPassword && formik.errors.confirmPassword;

  return (
    <Form onSubmit={formik.handleSubmit} className="w-50">
      <h1 className="text-center mb-4">{t('signup.signupHeader')}</h1>
      <FormField
        name="username"
        label={t('signup.username')}
        value={formik.values.username}
        onChange={formik.handleChange}
        isInvalid={formik.touched.username && (formik.errors.username)}
        error={formik.errors.username}
        inputRef={inputRef}
        autoComplete="username"
      />
      <FormField
        name="password"
        type="password"
        label={t('signup.password')}
        value={formik.values.password}
        onChange={formik.handleChange}
        isInvalid={formik.touched.password && formik.errors.password}
        error={formik.errors.password}
        autoComplete="new-password"
      />
      <FormField
        name="confirmPassword"
        type="password"
        label={t('signup.confirmPassword')}
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        isInvalid={isPasswordConfirmed}
        error={formik.errors.confirmPassword}
        autoComplete="new-password"
      />
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100"
        disabled={formik.isSubmitting}
      >
        {t('signup.signup')}
      </Button>
    </Form>
  );
};

export default SignupForm;
