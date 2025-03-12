import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import React from 'react';
import { StyledPage } from './style';
import PageContent from './PageContent';
import PageLayout from './PageLayout';

const { Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();
  const isOrgPage = location.pathname.includes('admin/organization-users');

  return (
    <StyledPage className={isOrgPage ? 'w-full' : ''}>
      <Layout className="admin-layout">
        <Content>
          <>
            <Outlet />
          </>
        </Content>
      </Layout>
    </StyledPage>
  );
};

AdminLayout.PageLayout = PageLayout;
AdminLayout.PageContent = PageContent;

export default AdminLayout;
