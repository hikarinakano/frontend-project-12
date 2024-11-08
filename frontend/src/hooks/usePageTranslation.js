import { useTranslation } from 'react-i18next';

export const usePageTranslation = (page) => {
  const { t } = useTranslation();
  return (key) => t(`${page}.${key}`);
}; 