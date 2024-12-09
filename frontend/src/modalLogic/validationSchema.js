import * as yup from 'yup';

export const getValidationSchema = (t, channels) => yup.object().shape({
  name: yup
    .string()
    .required(t('errors.required'))
    .min(3, t('errors.length'))
    .max(20, t('errors.length'))
    .test(
      'unique',
      t('errors.unique'),
      (value) => {
        if (!value) return true;
        const trimmedValue = value.trim().toLowerCase();
        return !channels.some(
          (channel) => channel.name.trim().toLowerCase() === trimmedValue
        );
      },
    ),
}); 
