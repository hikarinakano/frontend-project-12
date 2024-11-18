import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <nav>
      <h1>{t('notFound.header')}</h1>
      <div>
        {t('notFound.goto')}
        <Link to="/">
          {t('notFound.mainPage')}
        </Link>
      </div>
    </nav>
  );
};

export default NotFoundPage;