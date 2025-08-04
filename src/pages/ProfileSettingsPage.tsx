import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  Card,
  Avatar,
  Form,
  Input,
  Button,
  Upload,
  Divider,
  Row,
  Col,
  Typography,
  message,
  Switch,
  Select,
  DatePicker,
  Space,
  Tag,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CameraOutlined,
  SaveOutlined,
  EditOutlined,
  GlobalOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import './ProfileSettingsPage.css';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  location: string;
  bio: string;
  dateOfBirth: string;
  hireDate: string;
  employeeId: string;
  manager: string;
  skills: string[];
  languages: string[];
  socialLinks: {
    linkedin: string;
    twitter: string;
    website: string;
  };
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    twoFactorAuth: boolean;
    darkMode: boolean;
  };
}

const ProfileSettingsPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  // Dummy profile data
  const [profileData] = useState<ProfileData>({
    fullName: 'John Smith',
    email: 'john.smith@terradigitalize.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior HR Manager',
    department: 'Human Resources',
    location: 'New York, NY',
    bio: 'Experienced HR professional with over 8 years of experience in talent management, employee relations, and organizational development. Passionate about creating inclusive workplace cultures and driving employee engagement.',
    dateOfBirth: '1985-03-15',
    hireDate: '2019-06-01',
    employeeId: 'EMP-2024-001',
    manager: 'Sarah Johnson',
    skills: ['Talent Management', 'Employee Relations', 'HR Analytics', 'Performance Management', 'Recruitment'],
    languages: ['English', 'Spanish', 'French'],
    socialLinks: {
      linkedin: 'linkedin.com/in/johnsmith',
      twitter: '@johnsmith_hr',
      website: 'johnsmith.dev',
    },
    preferences: {
      emailNotifications: true,
      pushNotifications: false,
      twoFactorAuth: true,
      darkMode: false,
    },
  });

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      // Convert dayjs object back to string format for API
      const saveData = {
        ...values,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : null,
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    // Convert string date to dayjs object for DatePicker
    const formData = {
      ...profileData,
      dateOfBirth: profileData.dateOfBirth ? dayjs(profileData.dateOfBirth) : null,
    };
    form.setFieldsValue(formData);
  };

  const handleCancel = () => {
    setEditing(false);
    form.resetFields();
  };

  return (
    <div className="profile-settings-page">
      <div className="profile-settings-header">
        <Title level={2}>Profile Settings</Title>
        <Text type="secondary">Manage your personal information and preferences</Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* Profile Overview Card */}
        <Col xs={24} lg={8}>
          <Card className="profile-overview-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar-wrapper">
                <Avatar
                  size={120}
                  icon={<UserOutlined />}
                  className="profile-avatar"
                />
                <Upload
                  name="avatar"
                  showUploadList={false}
                  disabled={!editing}
                >
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CameraOutlined />}
                    className="avatar-upload-btn"
                    disabled={!editing}
                  />
                </Upload>
              </div>
              <Title level={3} className="profile-name">{profileData.fullName}</Title>
              <Text type="secondary" className="profile-position">{profileData.position}</Text>
              <Text type="secondary" className="profile-department">{profileData.department}</Text>
            </div>

            <Divider />

            <div className="profile-stats">
              <div className="profile-stat">
                <Text strong>Employee ID</Text>
                <Text>{profileData.employeeId}</Text>
              </div>
              <div className="profile-stat">
                <Text strong>Manager</Text>
                <Text>{profileData.manager}</Text>
              </div>
              <div className="profile-stat">
                <Text strong>Location</Text>
                <Text>{profileData.location}</Text>
              </div>
              <div className="profile-stat">
                <Text strong>Hire Date</Text>
                <Text>{profileData.hireDate}</Text>
              </div>
            </div>

            <Divider />

            <div className="profile-skills">
              <Text strong>Skills</Text>
              <div className="skills-tags">
                {profileData.skills.map((skill, index) => (
                  <Tag key={index} color="blue">{skill}</Tag>
                ))}
              </div>
            </div>

            <div className="profile-languages">
              <Text strong>Languages</Text>
              <div className="languages-tags">
                {profileData.languages.map((language, index) => (
                  <Tag key={index} color="green">{language}</Tag>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        {/* Profile Form */}
        <Col xs={24} lg={16}>
          <Card className="profile-form-card">
            <div className="profile-form-header">
              <Title level={4}>Personal Information</Title>
              {!editing ? (
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                >
                  Edit Profile
                </Button>
              ) : (
                <Space>
                  <Button onClick={handleCancel}>Cancel</Button>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    loading={loading}
                    onClick={() => form.submit()}
                  >
                    Save Changes
                  </Button>
                </Space>
              )}
            </div>

                         <Form
               form={form}
               layout="vertical"
               onFinish={handleSave}
               initialValues={{
                 ...profileData,
                 dateOfBirth: profileData.dateOfBirth ? dayjs(profileData.dateOfBirth) : null,
               }}
               disabled={!editing}
             >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please enter your full name' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
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
                    <Input prefix={<MailOutlined />} placeholder="Enter your email" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="location"
                    label="Location"
                    rules={[{ required: true, message: 'Please enter your location' }]}
                  >
                    <Input prefix={<EnvironmentOutlined />} placeholder="Enter your location" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="dateOfBirth"
                    label="Date of Birth"
                    rules={[{ required: true, message: 'Please select your date of birth' }]}
                  >
                    <DatePicker style={{ width: '100%' }} placeholder="Select date of birth" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="department"
                    label="Department"
                    rules={[{ required: true, message: 'Please select your department' }]}
                  >
                    <Select placeholder="Select department">
                      <Option value="Human Resources">Human Resources</Option>
                      <Option value="Engineering">Engineering</Option>
                      <Option value="Marketing">Marketing</Option>
                      <Option value="Sales">Sales</Option>
                      <Option value="Finance">Finance</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="bio"
                label="Bio"
                rules={[{ required: true, message: 'Please enter your bio' }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Tell us about yourself..."
                  maxLength={500}
                  showCount
                />
              </Form.Item>

              <Divider />

              <Title level={4}>Social Links</Title>
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item
                    name={['socialLinks', 'linkedin']}
                    label="LinkedIn"
                  >
                    <Input prefix={<LinkedinOutlined />} placeholder="LinkedIn profile URL" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    name={['socialLinks', 'twitter']}
                    label="Twitter"
                  >
                    <Input prefix={<TwitterOutlined />} placeholder="Twitter handle" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    name={['socialLinks', 'website']}
                    label="Website"
                  >
                    <Input prefix={<GlobalOutlined />} placeholder="Personal website" />
                  </Form.Item>
                </Col>
              </Row>

              <Divider />

              <Title level={4}>Preferences</Title>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name={['preferences', 'emailNotifications']}
                    label="Email Notifications"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name={['preferences', 'pushNotifications']}
                    label="Push Notifications"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name={['preferences', 'twoFactorAuth']}
                    label="Two-Factor Authentication"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name={['preferences', 'darkMode']}
                    label="Dark Mode"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileSettingsPage; 