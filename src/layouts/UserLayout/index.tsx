import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { StyledPage } from './style';
import PageContent from './PageContent';
import PageLayout from './PageLayout';

const { Content } = Layout;

const UserLayout = () => {
  return (
    <StyledPage>
      <Layout className="layout">
        <>Dsadasd</>
        <Content>
          <>
            <Outlet />
          </>
        </Content>
        <>Dsadasd</>
      </Layout>
    </StyledPage>
  );
};

UserLayout.PageLayout = PageLayout;
UserLayout.PageContent = PageContent;

export default UserLayout;
