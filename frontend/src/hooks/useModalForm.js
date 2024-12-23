import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import getValidationSchema from '../Modal/validationSchema';
import { useGetChannelsQuery } from '../store/api/channelsApi';

const useModalForm = ({ onClose, t, initialValues, onSubmit }) => {
  const { data: channels = [] } = useGetChannelsQuery();
  const formik = useFormik({
    initialValues,
    validationSchema: getValidationSchema(t, channels),
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const trimmedName = values.name.trim();
        const cleanedName = filter.clean(trimmedName);
        await onSubmit(cleanedName);
        onClose();
      } catch (err) {
        toast.error(t('errors.networkError'));
        onClose();
      }
    },
  });

  return formik;
};

export default useModalForm;
