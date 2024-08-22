import React from 'react';
   import { Layout, Menu } from 'antd';
   import { Link, useLocation } from 'react-router-dom';
   import {
     DashboardOutlined,
     PictureOutlined,
     VideoCameraOutlined,
     FileOutlined,
     FileTextOutlined  // Replace TemplateOutlined with FileTextOutlined
   } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  return (
    <Sider collapsible>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" selectedKeys={[location.pathname]}>
        <Menu.Item key="/" icon={<DashboardOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="/image-generation" icon={<PictureOutlined />}>
          <Link to="/image-generation">Image Generation</Link>
        </Menu.Item>
        <Menu.Item key="/video-creation" icon={<VideoCameraOutlined />}>
          <Link to="/video-creation">Video Creation</Link>
        </Menu.Item>
        <Menu.Item key="/content-management" icon={<FileOutlined />}>
          <Link to="/content-management">Content Management</Link>
        </Menu.Item>
        <Menu.Item key="/template-library" icon={<FileTextOutlined />}>
     <Link to="/template-library">Template Library</Link>
   </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;