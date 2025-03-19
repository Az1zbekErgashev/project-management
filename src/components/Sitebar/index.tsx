import React, { useEffect, useState } from 'react';
import { StyledSitebar } from './style';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAVIGATE } from 'utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SvgSelector from 'assets/icons/SvgSelector';
import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useUser } from 'hooks/useUserState';
import { routes } from 'config/config';
import { useLanguage } from 'contexts/LanguageContext';

interface props {
  isCollapsed: boolean;
  handleChangeCollapse: () => void;
}
export function Sitebar({ isCollapsed, handleChangeCollapse }: props) {
  const { user } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { changeLanguage, language } = useLanguage();
  const handleLogout = () => {
    Cookies.remove('jwt');
    navigate('/login');
  };

  const menu = (
    <Menu style={{ marginTop: '5px' }}>
      <Menu.Item key="0" onClick={() => handleLanguageChange('0')}>
        <SvgSelector id="korea" />
      </Menu.Item>
      <Menu.Item key="1" onClick={() => handleLanguageChange('1')}>
        <SvgSelector id="english" />
      </Menu.Item>
    </Menu>
  );

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
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
                </li>
              </NavLink>
            ))}
            <li className="nav-item translation">
              <div className="nav-link profile-link">
                <span className="material-symbols-rounded">
                  <SvgSelector id="translate" />
                </span>
                <span className="nav-label">
                  <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                    <div>{language === '0' ? <SvgSelector id="korea" /> : <SvgSelector id="english" />}</div>
                  </Dropdown>
                </span>
              </div>
            </li>
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
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link">
                <span className="nav-icon material-symbols-rounded">
                  <SvgSelector className="nav-icon" id="logout" />
                </span>
                <span className="nav-label">{t('logout')}</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </StyledSitebar>
  );
}
