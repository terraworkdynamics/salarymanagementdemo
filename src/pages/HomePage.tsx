import React from 'react';
import { Button, Typography, Space, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  TeamOutlined, 
  BankOutlined, 
  CreditCardOutlined, 
  FileTextOutlined,
  LockOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const features = [
    {
      title: 'Employee Management',
      description: 'Manage employee information, departments, and designations with ease.',
      icon: <TeamOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
    },
    {
      title: 'Salary Structure',
      description: 'Create and manage flexible salary structures with multiple components.',
      icon: <BankOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
    },
    {
      title: 'Payroll Processing',
      description: 'Process payroll with automatic calculations and deductions.',
      icon: <CreditCardOutlined style={{ fontSize: '32px', color: '#faad14' }} />,
    },
    {
      title: 'Reports & Analytics',
      description: 'Generate comprehensive reports and analytics for better decision making.',
      icon: <FileTextOutlined style={{ fontSize: '32px', color: '#eb2f96' }} />,
    },
  ];

  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 20px',
        background: 'linear-gradient(135deg, #1890ff 0%, #52c41a 100%)',
        color: 'white',
        marginBottom: '40px'
      }}>
        <Title style={{ color: 'white', marginBottom: '16px' }}>
          Salary Management System
        </Title>
        <Paragraph style={{ 
          fontSize: '18px', 
          maxWidth: '800px', 
          margin: '0 auto 24px',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          A comprehensive solution for managing employee salaries, payroll processing, 
          and generating reports with ease.
        </Paragraph>
        <Space size="large">
          {isAuthenticated ? (
            <Button 
              type="primary" 
              size="large" 
              onClick={handleDashboardClick}
              style={{ 
                background: 'white', 
                borderColor: 'white',
                color: '#1890ff'
              }}
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button 
              type="primary" 
              size="large" 
              icon={<LockOutlined />}
              onClick={handleLoginClick}
              style={{ 
                background: 'white', 
                borderColor: 'white',
                color: '#1890ff'
              }}
            >
              Admin Login
            </Button>
          )}
        </Space>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
          Key Features
        </Title>
        
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card 
                hoverable 
                style={{ height: '100%', textAlign: 'center' }}
                bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ marginBottom: '16px' }}>
                  {feature.icon}
                </div>
                <Title level={4}>{feature.title}</Title>
                <Paragraph type="secondary">
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: 'center', margin: '60px 0 40px' }}>
          <Title level={3}>Ready to get started?</Title>
          <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
            Log in to the admin panel to start managing your organization's salary system.
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            icon={<LockOutlined />}
            onClick={handleLoginClick}
          >
            Admin Login
          </Button>
        </div>
      </div>

      <div style={{ 
        background: '#f0f2f5', 
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title level={4} style={{ marginBottom: '8px' }}>
            Salary Management System
          </Title>
          <Paragraph type="secondary">
            © {new Date().getFullYear()} All Rights Reserved
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default HomePage;