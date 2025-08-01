import React, { useState } from 'react';
import { Form, Input, Alert, Typography, Button, Card, Spin, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';

const { Title, Paragraph } = Typography;

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
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-bg">
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Card className="login-card-glass">
          <div className="login-card-inner">
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div className="login-lock-hero">
                <LockOutlined />
              </div>
              <Title level={2} className="login-title">
                Welcome Back
              </Title>
              <Paragraph className="login-sub">
                Sign in to your Salary Management account
              </Paragraph>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="login-error">
                <Alert
                  message="Login Error"
                  description={error}
                  type="error"
                  showIcon
                  style={{ borderRadius: '8px' }}
                />
              </div>
            )}

            {/* Login Form */}
            <Form
              className="login-form"
              name="login"
              onFinish={onFinish}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter your email address' },
                  { type: 'email', message: 'Please enter a valid email address' }
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: '#9ca3af' }} />}
                  placeholder="Enter your email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: '#9ca3af' }} />}
                  placeholder="Enter your password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <div className="login-extra-row">
                <Checkbox className="login-remember">Remember me</Checkbox>
                <a href="#" className="login-forgot">
                  Forgot password?
                </a>
              </div>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="login-submit-btn"
                  disabled={loading}
                >
                  {loading ? <Spin size="small" /> : 'Sign In'}
                </Button>
              </Form.Item>
            </Form>

            {/* Demo Credentials */}
            <div className="login-demo-credentials">
              <p>
                Demo Credentials:
              </p>
              <div style={{ marginBottom: '4px' }}>
                <strong>Email:</strong> admin@example.com
              </div>
              <div>
                <strong>Password:</strong> password123
              </div>
            </div>

            {/* Footer */}
            <div className="login-footer">
              <Paragraph className="login-footer-text">
                Don't have an account?{' '}
                <a href="#" className="login-footer-link">
                  Contact Administrator
                </a>
              </Paragraph>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
