import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PAGES } from '../../routes';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Card.Footer className="p-4">
      <div className="text-center">
        <span>
          {`${('login.noAccount')} `}
        </span>
        <Link to={PAGES.getSignup()}>
          {t('login.signup')}
        </Link>
      </div>
    </Card.Footer>
  );
};

export default Footer;
