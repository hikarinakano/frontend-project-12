import * as Yup from 'yup';

const createValidationSchema = (t) => Yup.object({
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

export default createValidationSchema;
