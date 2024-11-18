import { useTranslation } from 'react-i18next';

export default usePageTranslation = (page) => {
  const { t } = useTranslation();
  return (key) => t(`${page}.${key}`);
};
