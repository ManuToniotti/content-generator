import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <div style={{ float: 'left', color: 'white', marginLeft: '24px' }}>
        AI Content Creator
      </div>
    </Header>
  );
};

export default AppHeader;