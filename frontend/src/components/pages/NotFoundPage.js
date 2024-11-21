import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundImage from '../../assets/Not_found.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <div className="text-center bg-light">
          <img
            alt={t('notFound.header')}
            className="img-fluid h-25"
            src={notFoundImage}
          />
          <h1 className="h4 text-muted">
            {t('notFound.header')}
          </h1>
          <p className="text-muted">
            {t('notFound.goto')}
            <Link to="/">
              {t('notFound.mainPage')}
            </Link>
          </p>
        </div>
        <div className="Toastify"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
