import React, { useState, ReactNode, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MenuOutlined,
  CloseOutlined,
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { Chatbot, SearchBar } from '../ui';
import '../../styles/MainLayout.css';
const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Define menu items for the user dropdown
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile Settings',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'notifications',
      icon: <BellOutlined />,
      label: 'Notifications',
      onClick: () => navigate('/notifications'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Account Settings',
      onClick: () => navigate('/settings'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign Out',
      onClick: handleSignOut,
      danger: true,
    },
  ];

  const menuItems = [
    {
      key: '/dashboard',
      icon: <HomeOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '/employees',
      icon: <UserOutlined />,
      label: <Link to="/employees">Employees</Link>,
    },
    {
      key: '/salary-structure',
      icon: <DollarOutlined />,
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
    <Layout className="main-layout">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className={`main-sidebar ${collapsed ? 'collapsed' : 'expanded'}`}
          width={280}
          collapsedWidth={80}
          breakpoint="lg"
          onBreakpoint={broken => setIsMobile(broken)}
        >
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Logo */}
            <div className="sidebar-logo">
              <div className="sidebar-logo-content">
                <img
                  src="/logo.png"
                  alt="TerraDigitalize Dynamics"
                  className="sidebar-logo-img"
                />
                <h1 className="sidebar-logo-text">
                  TerraDigitalize
                </h1>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="sidebar-nav">
              <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems.map(item => ({
                  key: item.key,
                  icon: <span style={{ fontSize: '18px' }}>{item.icon}</span>,
                  label: item.label,
                }))}
              />
            </div>

            {/* User Profile Section */}
            <div className="sidebar-user-profile">
              <div className="sidebar-user-content">
                <Avatar
                  className="sidebar-user-avatar"
                  icon={<UserOutlined />}
                />
                <div className="sidebar-user-info">
                  <p className="sidebar-user-name">
                    {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="sidebar-user-role">
                    Administrator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Sider>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          <div
            className={`mobile-sidebar-overlay ${mobileMenuOpen ? 'visible' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className={`mobile-sidebar ${mobileMenuOpen ? 'visible' : ''}`}>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Mobile Header */}
              <div className="mobile-sidebar-header">
                <div className="sidebar-logo-content">
                  <img
                    src="/logo.png"
                    alt="TerraDigitalize Dynamics"
                    className="sidebar-logo-img"
                  />
                  <h1 className="sidebar-logo-text">
                    TerraDigitalize
                  </h1>
                </div>
                <button
                  className="mobile-sidebar-close"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CloseOutlined />
                </button>
              </div>

              {/* Mobile Menu */}
              <div className="sidebar-nav">
                <Menu
                  mode="inline"
                  selectedKeys={[location.pathname]}
                  onClick={() => setMobileMenuOpen(false)}
                  items={menuItems.map(item => ({
                    key: item.key,
                    icon: <span style={{ fontSize: '18px' }}>{item.icon}</span>,
                    label: item.label,
                  }))}
                />
              </div>

              {/* Mobile User Profile */}
              <div className="sidebar-user-profile">
                <div className="sidebar-user-content" style={{ marginBottom: '16px' }}>
                  <Avatar
                    className="sidebar-user-avatar"
                    icon={<UserOutlined />}
                  />
                  <div className="sidebar-user-info">
                    <p className="sidebar-user-name">
                      {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="sidebar-user-role">
                      Administrator
                    </p>
                  </div>
                </div>
                <Button
                  type="primary"
                  danger
                  icon={<LogoutOutlined />}
                  onClick={handleSignOut}
                  style={{ width: '100%' }}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      <Layout className={`main-content-area ${isMobile ? 'mobile' : (collapsed ? 'sidebar-collapsed' : 'sidebar-expanded')}`}>
        {/* Header */}
        <Header className="main-header">
         <div className="header-left">
  {/* Mobile Menu Button */}
  {isMobile && (
    <button
      className="header-menu-btn mobile"
      onClick={() => setMobileMenuOpen(true)}
    >
      <MenuOutlined />
    </button>
  )}

  {/* Desktop Collapse Button */}
  {!isMobile && (
    <button
      className="header-menu-btn desktop"
      onClick={() => setCollapsed(!collapsed)}
    >
      {collapsed ? <MenuOutlined /> : <CloseOutlined />}
    </button>
  )}

            {/* Search Bar in Header */}
            <div className="header-search-bar">
              <SearchBar 
                placeholder="Search employees, payrolls..."
                className="header-search-component"
              />
            </div>
          </div>

          <div className="header-right">
            {/* Notifications */}
            <button className="header-notification-btn">
              <BellOutlined />
              <span className="notification-dot"></span>
            </button>

            {/* User Dropdown */}
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <div className="header-user-dropdown">
                <Avatar
                  className="header-user-avatar"
                  icon={<UserOutlined />}
                />
                <div className="header-user-info">
                  <p className="header-user-name">
                    {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="header-user-role">
                    Administrator
                  </p>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* Main Content */}
        <Content className="main-content">
          <div className="main-content-wrapper">
            {children}
          </div>
        </Content>
      </Layout>

      {/* Chatbot - Available on all pages */}
      <Chatbot />
    </Layout>
  );
};

export default MainLayout;
