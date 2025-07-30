import React, { useState, ReactNode } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, theme } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  BankOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // Define menu items for the user dropdown
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleSignOut,
    },
  ];

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '/employees',
      icon: <TeamOutlined />,
      label: <Link to="/employees">Employees</Link>,
    },
    {
      key: '/salary-structure',
      icon: <BankOutlined />,
      label: <Link to="/salary-structure">Salary Structure</Link>,
    },
    {
      key: '/payroll',
      icon: <CreditCardOutlined />,
      label: <Link to="/payroll">Payroll</Link>,
    },
    {
      key: '/reports',
      icon: <FileTextOutlined />,
      label: <Link to="/reports">Reports</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="light"
        style={{
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          zIndex: 10,
        }}
      >
        <div className="logo" style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '0 24px',
          color: token.colorPrimary,
          fontWeight: 'bold',
          fontSize: '18px',
        }}>
          {collapsed ? 'SM' : 'Salary Management'}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: 0, 
          background: token.colorBgContainer,
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ marginRight: '24px', display: 'flex', alignItems: 'center' }}>
            <Dropdown
              menu={{
                items: userMenuItems
              }}
              placement="bottomRight"
            >
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px' }}>
                  {user?.user_metadata?.name || user?.email}
                </span>
                <Avatar icon={<UserOutlined />} />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: token.colorBgContainer,
            borderRadius: token.borderRadius,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;