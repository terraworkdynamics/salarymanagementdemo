import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Layout, Space, Card } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/logo.png" 
            alt="School Logo" 
            style={{ height: '40px', marginRight: '16px' }} 
          />
          <Title level={3} style={{ margin: 0 }}>
            Salary Management System
          </Title>
        </div>
        <Button 
          type="primary" 
          icon={<LoginOutlined />} 
          size="large"
          onClick={() => navigate('/login')}
        >
          Admin Login
        </Button>
      </Header>
      
      <Content style={{ padding: '50px', background: '#f0f2f5' }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          textAlign: 'center' 
        }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title>Welcome to the Salary Management System</Title>
              <Paragraph style={{ fontSize: '18px' }}>
                A comprehensive solution for managing employee salaries, payroll processing, and financial reporting.
              </Paragraph>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '24px',
              margin: '48px 0'
            }}>
              <Card 
                style={{ width: 300 }} 
                cover={<img alt="Employee Management" src="/employee-management.png" />}
              >
                <Card.Meta 
                  title="Employee Management" 
                  description="Manage employee profiles, departments, and roles with ease." 
                />
              </Card>
              
              <Card 
                style={{ width: 300 }} 
                cover={<img alt="Payroll Processing" src="/payroll-processing.png" />}
              >
                <Card.Meta 
                  title="Payroll Processing" 
                  description="Automate salary calculations, deductions, and tax compliance." 
                />
              </Card>
              
              <Card 
                style={{ width: 300 }} 
                cover={<img alt="Reports & Analytics" src="/reports-analytics.png" />}
              >
                <Card.Meta 
                  title="Reports & Analytics" 
                  description="Generate comprehensive reports and gain valuable insights." 
                />
              </Card>
            </div>
            
            <Button 
              type="primary" 
              size="large" 
              icon={<LoginOutlined />}
              onClick={() => navigate('/login')}
              style={{ padding: '0 40px', height: '50px', fontSize: '16px' }}
            >
              Access Admin Dashboard
            </Button>
          </Space>
        </div>
      </Content>
      
      <Footer style={{ textAlign: 'center', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Paragraph>
            Salary Management System ©{new Date().getFullYear()} All Rights Reserved
          </Paragraph>
          <Paragraph type="secondary">
            A comprehensive solution for managing employee salaries and payroll processing.
          </Paragraph>
        </div>
      </Footer>
    </Layout>
  );
};

export default HomePage;