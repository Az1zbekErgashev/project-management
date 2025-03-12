import React from 'react';
import { StyledSitebar } from './style';
import { Button } from 'ui';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAVIGATE } from 'utils/consts';
import { NavLink } from 'react-router-dom';

export function Sitebar() {
  const { t } = useTranslation();
  return (
    <StyledSitebar>
      <div className="title">Project Management</div>
      <div className="navlinks">
        {ADMIN_NAVIGATE.map((item, index) => (
          <NavLink to={item.path} key={index}>
            {t(item.key)}
          </NavLink>
        ))}
      </div>
      <div className="logout-btn">
        <Button label={t('logout')} danger />
      </div>
    </StyledSitebar>
  );
}
