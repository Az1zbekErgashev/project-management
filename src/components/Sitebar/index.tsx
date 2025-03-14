import React from 'react';
import { StyledSitebar } from './style';
import { Button } from 'ui';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAVIGATE } from 'utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export function Sitebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('jwt');
    navigate('/login');
  };
  return (
    <StyledSitebar>
      <div className="title">CRM</div>
      <div className="navlinks">
        {ADMIN_NAVIGATE.map((item, index) => (
          <NavLink to={item.path} key={index}>
            {t(item.key)}
          </NavLink>
        ))}
      </div>
      <div className="logout-btn">
        <Button label={t('logout')} danger onClick={handleLogout} />
      </div>
    </StyledSitebar>
  );
}
