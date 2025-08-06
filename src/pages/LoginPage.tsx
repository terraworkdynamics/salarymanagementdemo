import React, { useState, useEffect } from 'react';
import { Form, Input, Alert, Typography, Button, Card, Spin, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, ArrowLeftOutlined } from '@ant-design/icons';
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

  const from = (location.state as LocationState)?.from?.pathname || '/dashboard';
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
    <div className="login-container">
      <div className="login-wrapper">
        <Card className="login-card">
          {/* Back Button */}
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/')}
            className="back-button"
          >
            Back
          </Button>

          <div className="login-content">
            {/* Header */}
            <div className="login-header">
              <div className="logo-container">
                <LockOutlined className="logo-icon" />
              </div>
              <Title level={2} className="login-title">
                Welcome Back
              </Title>
              <Paragraph className="login-subtitle">
                Please sign in to your account
              </Paragraph>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                className="error-alert"
                closable
                onClose={() => setError(null)}
              />
            )}

            {/* Login Form */}
            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              className="login-form"
              size="large"
              initialValues={{
                email: 'admin@example.com',
                password: 'password123'
              }}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your email"
                  className="form-input"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                  className="form-input"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <div className="form-options">
                <Checkbox className="remember-checkbox">
                  Remember me
                </Checkbox>
                <a href="#" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="login-button"
                  block
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            {/* Optional: Demo Notice */}
            <div className="demo-notice">
              <Paragraph className="demo-notice-text">
                Demo credentials are pre-filled for testing
              </Paragraph>
            </div>

            {/* Footer */}
            <div className="login-footer">
              <Paragraph className="footer-text">
                Don't have an account?{' '}
                <a href="#" className="signup-link">
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
