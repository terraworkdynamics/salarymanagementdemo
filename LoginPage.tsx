import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Button, Form, Input, Card, Typography, Alert, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginPage.css';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get redirect path from location state or default to dashboard
  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await signIn(values.email, values.password);
      if (error) throw error;
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg-root">
      <Card>
        <div className="text-center mb-6">
          <img
            src="/logo.png"
            alt="School Logo"
            className="login-logo"
          />
          <Title level={3} className="login-header-title">
            Salary Management System
          </Title>
          <Text type="secondary" className="login-header-desc">
            Admin Login
          </Text>
        </div>

        {error && (
          <Alert
            message="Login Failed"
            description={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
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
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" className="w-full" style={{ width: '100%' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="login-btn w-full"
              >
                Log in
              </Button>
              <Button
                type="link"
                onClick={() => navigate('/forgot-password')}
                className="forgot-btn w-full"
              >
                Forgot password?
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <div className="text-center login-footer">
          <Text type="secondary">
            &copy; {new Date().getFullYear()} Salary Management System
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
