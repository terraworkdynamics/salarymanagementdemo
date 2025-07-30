import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Title } = Typography;

interface LocationState {
  from?: {
    pathname: string;
  };
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to dashboard
  const from = (location.state as LocationState)?.from?.pathname || '/dashboard';

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await signIn(values.email, values.password);
      
      if (error) {
        setError(error.message || 'Failed to sign in');
      } else {
        // Redirect to the page they were trying to access or dashboard
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card 
        style={{ 
          width: 400, 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2} style={{ marginBottom: '8px' }}>Salary Management</Title>
          <Title level={4} style={{ fontWeight: 'normal', marginTop: 0 }}>Admin Login</Title>
        </div>
        
        {error && (
          <Alert
            message="Login Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: '24px' }}
          />
        )}
        
        <Spin spinning={loading}>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Email" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large" 
                block
                loading={loading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Spin>
        
        <div style={{ textAlign: 'center' }}>
          <Typography.Text type="secondary">
            For demo purposes, use: admin@example.com / password123
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;