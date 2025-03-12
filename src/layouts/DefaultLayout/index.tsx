import React from 'react';
import { StyledDefaultLayout } from './style';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Sitebar } from 'components';

const { Content } = Layout;

const DefaultLayout = () => {
  return (
    <StyledDefaultLayout>
      <Layout className="layout">
        <Sitebar />
        <Content className="content container">
          <>
            <Outlet />
          </>
        </Content>
      </Layout>
    </StyledDefaultLayout>
  );
};

export default DefaultLayout;
