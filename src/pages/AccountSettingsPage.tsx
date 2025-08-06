import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Select,
  Divider,
  Row,
  Col,
  Typography,
  message,
  Space,
  Alert,
  Modal,
  Tabs,
  Upload,
  Avatar,
  Tag,
  Progress,
  Statistic,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyOutlined,
  KeyOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  UploadOutlined,
  DeleteOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import './AccountSettingsPage.css';

const { Title, Text, Paragraph } = Typography;
const { Password } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface AccountData {
  email: string;
  username: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  loginHistory: Array<{
    id: string;
    timestamp: string;
    location: string;
    device: string;
    status: 'success' | 'failed';
  }>;
  securitySettings: {
    passwordExpiry: number;
    maxLoginAttempts: number;
    lockoutDuration: number;
    requirePasswordChange: boolean;
  };
  privacySettings: {
    profileVisibility: 'public' | 'private' | 'team';
    emailNotifications: boolean;
    pushNotifications: boolean;
    dataSharing: boolean;
  };
  storageUsage: {
    used: number;
    total: number;
    files: number;
  };
}

const AccountSettingsPage: React.FC = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Dummy account data
  const [accountData] = useState<AccountData>({
    email: 'john.smith@terradigitalize.com',
    username: 'johnsmith',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    sessionTimeout: 30,
    loginHistory: [
      {
        id: '1',
        timestamp: '2024-03-15T10:30:00Z',
        location: 'New York, NY, USA',
        device: 'Chrome on Windows 10',
        status: 'success',
      },
      {
        id: '2',
        timestamp: '2024-03-14T14:20:00Z',
        location: 'New York, NY, USA',
        device: 'Safari on iPhone',
        status: 'success',
      },
      {
        id: '3',
        timestamp: '2024-03-13T09:15:00Z',
        location: 'Unknown Location',
        device: 'Unknown Device',
        status: 'failed',
      },
      {
        id: '4',
        timestamp: '2024-03-12T16:45:00Z',
        location: 'New York, NY, USA',
        device: 'Chrome on Windows 10',
        status: 'success',
      },
      {
        id: '5',
        timestamp: '2024-03-11T11:30:00Z',
        location: 'New York, NY, USA',
        device: 'Firefox on Windows 10',
        status: 'success',
      },
    ],
    securitySettings: {
      passwordExpiry: 90,
      maxLoginAttempts: 5,
      lockoutDuration: 30,
      requirePasswordChange: false,
    },
    privacySettings: {
      profileVisibility: 'team',
      emailNotifications: true,
      pushNotifications: false,
      dataSharing: true,
    },
    storageUsage: {
      used: 2.5,
      total: 10,
      files: 156,
    },
  });

  const handleSaveProfile = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success('Profile updated successfully!');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('New passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success('Password changed successfully!');
      passwordForm.resetFields();
    } catch (error) {
      message.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTwoFactor = (checked: boolean) => {
    if (checked) {
      Modal.confirm({
        title: 'Enable Two-Factor Authentication',
        content: 'This will add an extra layer of security to your account. You will need to enter a code from your authenticator app when signing in.',
        onOk: () => {
          message.success('Two-factor authentication enabled');
        },
      });
    } else {
      Modal.confirm({
        title: 'Disable Two-Factor Authentication',
        content: 'Are you sure you want to disable two-factor authentication? This will make your account less secure.',
        onOk: () => {
          message.warning('Two-factor authentication disabled');
        },
      });
    }
  };

  const handleExportData = () => {
    message.success('Data export started. You will receive an email when it\'s ready.');
  };

  const handleDeleteAccount = () => {
    Modal.confirm({
      title: 'Delete Account',
      content: 'This action cannot be undone. All your data will be permanently deleted.',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => {
        message.error('Account deletion requested');
      },
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getStatusIcon = (status: string) => {
    return status === 'success' ? (
      <CheckCircleOutlined style={{ color: '#52c41a' }} />
    ) : (
      <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
    );
  };

  const storagePercentage = (accountData.storageUsage.used / accountData.storageUsage.total) * 100;

  return (
    <div className="account-settings-page">
      <div className="account-settings-header">
        <Title level={2}>Account Settings</Title>
        <Text type="secondary">Manage your account security, privacy, and preferences</Text>
      </div>

      <Tabs defaultActiveKey="profile" className="account-settings-tabs">
        <TabPane tab="Profile" key="profile">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card title="Profile Information" className="settings-card">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSaveProfile}
                  initialValues={accountData}
                >
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please enter your username' }]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Enter username" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                          { required: true, message: 'Please enter your email' },
                          { type: 'email', message: 'Please enter a valid email' }
                        ]}
                      >
                        <Input prefix={<MailOutlined />} placeholder="Enter email" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      icon={<UserOutlined />}
                    >
                      Save Changes
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="Account Statistics" className="settings-card">
                <div className="account-stats">
                  <Statistic
                    title="Storage Used"
                    value={accountData.storageUsage.used}
                    suffix={`/ ${accountData.storageUsage.total} GB`}
                    precision={1}
                  />
                  <Progress
                    percent={storagePercentage}
                    status={storagePercentage > 80 ? 'exception' : 'active'}
                    strokeColor={storagePercentage > 80 ? '#ff4d4f' : '#1976d2'}
                  />
                  <Text type="secondary">{accountData.storageUsage.files} files stored</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Security" key="security">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card title="Change Password" className="settings-card">
                <Form
                  form={passwordForm}
                  layout="vertical"
                  onFinish={handleChangePassword}
                >
                  <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[{ required: true, message: 'Please enter your current password' }]}
                  >
                    <Password
                      prefix={<LockOutlined />}
                      placeholder="Enter current password"
                      iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>

                  <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                      { required: true, message: 'Please enter your new password' },
                      { min: 8, message: 'Password must be at least 8 characters' }
                    ]}
                  >
                    <Password
                      prefix={<KeyOutlined />}
                      placeholder="Enter new password"
                      iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Confirm New Password"
                    rules={[
                      { required: true, message: 'Please confirm your new password' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Passwords do not match'));
                        },
                      }),
                    ]}
                  >
                    <Password
                      prefix={<KeyOutlined />}
                      placeholder="Confirm new password"
                      iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      icon={<LockOutlined />}
                    >
                      Change Password
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Security Settings" className="settings-card">
                <div className="security-settings">
                  <div className="setting-item">
                    <div>
                      <Text strong>Two-Factor Authentication</Text>
                      <br />
                      <Text type="secondary">Add an extra layer of security to your account</Text>
                    </div>
                    <Switch
                      checked={accountData.twoFactorEnabled}
                      onChange={handleToggleTwoFactor}
                    />
                  </div>

                  <Divider />

                  <div className="setting-item">
                    <div>
                      <Text strong>Session Timeout</Text>
                      <br />
                      <Text type="secondary">Automatically log out after inactivity</Text>
                    </div>
                    <Select
                      value={accountData.sessionTimeout}
                      style={{ width: 120 }}
                      options={[
                        { value: 15, label: '15 minutes' },
                        { value: 30, label: '30 minutes' },
                        { value: 60, label: '1 hour' },
                        { value: 120, label: '2 hours' },
                      ]}
                    />
                  </div>

                  <Divider />

                  <div className="setting-item">
                    <div>
                      <Text strong>Password Expiry</Text>
                      <br />
                      <Text type="secondary">Require password change every {accountData.securitySettings.passwordExpiry} days</Text>
                    </div>
                    <Tag color="blue">{accountData.securitySettings.passwordExpiry} days</Tag>
                  </div>

                  <Divider />

                  <div className="setting-item">
                    <div>
                      <Text strong>Max Login Attempts</Text>
                      <br />
                      <Text type="secondary">Lock account after {accountData.securitySettings.maxLoginAttempts} failed attempts</Text>
                    </div>
                    <Tag color="orange">{accountData.securitySettings.maxLoginAttempts} attempts</Tag>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          <Card title="Login History" className="settings-card" style={{ marginTop: 24 }}>
            <div className="login-history">
              {accountData.loginHistory.map((login) => (
                <div key={login.id} className="login-item">
                  <div className="login-info">
                    <div className="login-status">
                      {getStatusIcon(login.status)}
                      <Text strong={login.status === 'success'}>
                        {login.status === 'success' ? 'Successful Login' : 'Failed Login Attempt'}
                      </Text>
                    </div>
                    <Text type="secondary">{login.device}</Text>
                    <Text type="secondary">{login.location}</Text>
                  </div>
                  <div className="login-time">
                    <Text type="secondary">
                      <ClockCircleOutlined /> {formatTimestamp(login.timestamp)}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Privacy" key="privacy">
          <Card title="Privacy Settings" className="settings-card">
            <div className="privacy-settings">
              <div className="setting-item">
                <div>
                  <Text strong>Profile Visibility</Text>
                  <br />
                  <Text type="secondary">Control who can see your profile information</Text>
                </div>
                <Select
                  value={accountData.privacySettings.profileVisibility}
                  style={{ width: 150 }}
                  options={[
                    { value: 'public', label: 'Public' },
                    { value: 'team', label: 'Team Only' },
                    { value: 'private', label: 'Private' },
                  ]}
                />
              </div>

              <Divider />

              <div className="setting-item">
                <div>
                  <Text strong>Email Notifications</Text>
                  <br />
                  <Text type="secondary">Receive notifications via email</Text>
                </div>
                <Switch checked={accountData.privacySettings.emailNotifications} />
              </div>

              <Divider />

              <div className="setting-item">
                <div>
                  <Text strong>Push Notifications</Text>
                  <br />
                  <Text type="secondary">Receive push notifications in browser</Text>
                </div>
                <Switch checked={accountData.privacySettings.pushNotifications} />
              </div>

              <Divider />

              <div className="setting-item">
                <div>
                  <Text strong>Data Sharing</Text>
                  <br />
                  <Text type="secondary">Allow data to be used for analytics and improvements</Text>
                </div>
                <Switch checked={accountData.privacySettings.dataSharing} />
              </div>
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Data & Export" key="data">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card title="Data Export" className="settings-card">
                <Alert
                  message="Data Export"
                  description="Download a copy of all your data including profile information, activity logs, and settings."
                  type="info"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={handleExportData}
                  block
                >
                  Export My Data
                </Button>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Delete Account" className="settings-card danger-zone">
                <Alert
                  message="Danger Zone"
                  description="Once you delete your account, there is no going back. Please be certain."
                  type="error"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteAccount}
                  block
                >
                  Delete Account
                </Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AccountSettingsPage; 