import { useTranslation } from 'react-i18next';

const usePageTranslation = (page) => {
  const { t } = useTranslation();
  return (key) => t(`${page}.${key}`);
};

export default usePageTranslation;
