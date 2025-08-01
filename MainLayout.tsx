import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Breadcrumb,
  Typography,
  theme
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  BankOutlined,
  FileTextOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useAuth } from './AuthContext';
import './MainLayout.css';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

interface BreadcrumbItem {
  title: string;
  path: string;
}

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // Generate breadcrumb items based on current path
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const breadcrumbItems: BreadcrumbItem[] = [];

    let url = '';
    pathSnippets.forEach(snippet => {
      url += `/${snippet}`;
      if (snippet === 'admin') return;
      // Format the breadcrumb title
      const title = snippet.charAt(0).toUpperCase() + snippet.slice(1).replace(/-/g, ' ');
      breadcrumbItems.push({
        title,
        path: url,
      });
    });

    return breadcrumbItems;
  };

  // User dropdown menu
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/admin/profile')}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />} onClick={() => navigate('/admin/settings')}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleSignOut}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="main-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          zIndex: 10
        }}
      >
        <div className="logo" style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '0 16px',
          overflow: 'hidden'
        }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: '32px', marginRight: collapsed ? '0' : '8px' }}
          />
          {!collapsed && (
            <Title level={5} style={{ margin: 0, whiteSpace: 'nowrap' }}>
              Salary Management
            </Title>
          )}
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={['/admin/dashboard']}
          selectedKeys={[location.pathname]}
          style={{ borderRight: 0 }}
          onClick={({ key }) => navigate(key as string)}
        >
          <Menu.Item key="/admin/dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="/admin/employees" icon={<TeamOutlined />}>
            Employees
          </Menu.Item>
          <Menu.Item key="/admin/salary-structure" icon={<BankOutlined />}>
            Salary Structure
          </Menu.Item>
          <Menu.Item key="/admin/payroll" icon={<CalculatorOutlined />}>
            Payroll
          </Menu.Item>
          <Menu.Item key="/admin/payslips" icon={<FileTextOutlined />}>
            Payslips
          </Menu.Item>
          <Menu.Item key="/admin/attendance" icon={<CalendarOutlined />}>
            Attendance & Leave
          </Menu.Item>
          <Menu.Item key="/admin/reports" icon={<BarChartOutlined />}>
            Reports
          </Menu.Item>
          <Menu.Item key="/admin/settings" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header className="ant-layout-header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="header-trigger-btn"
            style={{ width: 64, height: 64 }}
          />

          <div className="header-user-dropdown">
            <Dropdown overlay={userMenu} trigger={['click']}>
              <div style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Avatar
                  icon={<UserOutlined />}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ marginRight: 8 }}>
                  {userProfile?.full_name || user?.email}
                </Text>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="ant-layout-content">
          <Breadcrumb style={{ marginBottom: '16px' }}>
            <Breadcrumb.Item key="home" onClick={() => navigate('/admin/dashboard')}>
              <DashboardOutlined /> Dashboard
            </Breadcrumb.Item>
            {getBreadcrumbItems().map((item) => (
              <Breadcrumb.Item key={item.path} onClick={() => navigate(item.path)}>
                {item.title}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
