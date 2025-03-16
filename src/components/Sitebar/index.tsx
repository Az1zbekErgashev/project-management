import React, { useEffect, useState } from 'react';
import { StyledSitebar } from './style';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAVIGATE } from 'utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SvgSelector from 'assets/icons/SvgSelector';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useUser } from 'hooks/useUserState';
import { routes } from 'config/config';

interface props {
  isCollapsed: boolean;
  handleChangeCollapse: () => void;
}
export function Sitebar({ isCollapsed, handleChangeCollapse }: props) {
  const { user } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('jwt');
    navigate('/login');
  };

  return (
    <StyledSitebar>
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <header className="sidebar-header">
          <NavLink className="title" to="/">
            CRM
          </NavLink>
          <button className="toggler sidebar-toggler" onClick={handleChangeCollapse}>
            <SvgSelector id="list-nested" />
          </button>
        </header>
        <nav className="sidebar-nav">
          <ul className="nav-list primary-nav">
            {ADMIN_NAVIGATE.map((item, index) => (
              <NavLink to={item.path} key={index}>
                <li className="nav-item" key={index}>
                  <p className="nav-link">
                    <span className="nav-icon material-symbols-rounded">
                      <SvgSelector className={`nav-icon nav-icon-${item.icon}`} id={item.icon} />
                    </span>
                    <span className="nav-label">{t(item.key)}</span>
                  </p>
                  <span className="nav-tooltip"> {t(item.key)}</span>
                </li>
              </NavLink>
            ))}
          </ul>

          <ul className="nav-list secondary-nav">
            <li className="nav-item">
              <NavLink to="/profile" className="nav-link profile-link">
                <span className="material-symbols-rounded">
                  <Avatar size={32} src={routes.api.baseUrl + '/' + user?.image?.path} icon={<UserOutlined />} />
                </span>
                <span className="nav-label">
                  {user?.name}&nbsp;{user?.surname}
                </span>
              </NavLink>
              <span className="nav-tooltip">
                {user?.name}&nbsp;{user?.surname}
              </span>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link">
                <span className="nav-icon material-symbols-rounded">
                  <SvgSelector className="nav-icon" id="logout" />
                </span>
                <span className="nav-label">{t('logout')}</span>
              </button>
              <span className="nav-tooltip">{t('logout')}</span>
            </li>
          </ul>
        </nav>
      </aside>
    </StyledSitebar>
  );
}
