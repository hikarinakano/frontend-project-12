import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import getValidationSchema from '../Modal/validationSchema';

const useModalForm = ({ onClose, t, initialValues, onSubmit }) => {
  const channels = useSelector((state) => state.channels.entities) || [];

  const formik = useFormik({
    initialValues,
    validationSchema: getValidationSchema(t, channels),
    validateOnChange: false,
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