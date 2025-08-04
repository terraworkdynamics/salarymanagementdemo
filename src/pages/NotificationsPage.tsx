import React, { useState } from 'react';
import {
  Card,
  List,
  Avatar,
  Typography,
  Badge,
  Button,
  Tabs,
  Space,
  Tag,
  Divider,
  Empty,
  Switch,
  Row,
  Col,
  message,
  Popconfirm,
} from 'antd';
import {
  BellOutlined,
  UserOutlined,
  DollarOutlined,
  FileTextOutlined,
  SettingOutlined,
  CheckOutlined,
  DeleteOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import './NotificationsPage.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'payroll' | 'employee' | 'system' | 'general';
  priority: 'low' | 'medium' | 'high';
  action?: {
    label: string;
    onClick: () => void;
  };
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Payroll Processed Successfully',
      message: 'The monthly payroll for March 2024 has been processed successfully. All employees have been paid.',
      timestamp: '2024-03-15T10:30:00Z',
      read: false,
      category: 'payroll',
      priority: 'high',
      action: {
        label: 'View Details',
        onClick: () => message.info('Viewing payroll details...'),
      },
    },
    {
      id: '2',
      type: 'info',
      title: 'New Employee Onboarded',
      message: 'Sarah Johnson has been successfully onboarded to the Engineering department.',
      timestamp: '2024-03-14T14:20:00Z',
      read: false,
      category: 'employee',
      priority: 'medium',
      action: {
        label: 'View Profile',
        onClick: () => message.info('Viewing employee profile...'),
      },
    },
    {
      id: '3',
      type: 'warning',
      title: 'System Maintenance Scheduled',
      message: 'Scheduled maintenance will occur on March 20th from 2:00 AM to 4:00 AM EST.',
      timestamp: '2024-03-13T09:15:00Z',
      read: true,
      category: 'system',
      priority: 'medium',
    },
    {
      id: '4',
      type: 'error',
      title: 'Payroll Processing Failed',
      message: 'There was an error processing payroll for employee ID EMP-2024-045. Please review and retry.',
      timestamp: '2024-03-12T16:45:00Z',
      read: false,
      category: 'payroll',
      priority: 'high',
      action: {
        label: 'Retry',
        onClick: () => message.success('Payroll processing retried successfully'),
      },
    },
    {
      id: '5',
      type: 'success',
      title: 'Salary Structure Updated',
      message: 'The salary structure for the Marketing department has been updated with new compensation bands.',
      timestamp: '2024-03-11T11:30:00Z',
      read: true,
      category: 'general',
      priority: 'low',
    },
    {
      id: '6',
      type: 'info',
      title: 'Performance Review Due',
      message: 'Performance reviews for Q1 2024 are due by March 31st. Please complete all pending reviews.',
      timestamp: '2024-03-10T13:00:00Z',
      read: false,
      category: 'employee',
      priority: 'high',
      action: {
        label: 'Start Review',
        onClick: () => message.info('Opening performance review...'),
      },
    },
    {
      id: '7',
      type: 'warning',
      title: 'Database Backup Required',
      message: 'The system database backup is overdue. Please schedule a backup within the next 24 hours.',
      timestamp: '2024-03-09T08:30:00Z',
      read: true,
      category: 'system',
      priority: 'medium',
    },
    {
      id: '8',
      type: 'success',
      title: 'Report Generated',
      message: 'The monthly HR report for February 2024 has been generated and is ready for download.',
      timestamp: '2024-03-08T15:20:00Z',
      read: true,
      category: 'general',
      priority: 'low',
      action: {
        label: 'Download',
        onClick: () => message.success('Report downloaded successfully'),
      },
    },
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    payrollNotifications: true,
    employeeNotifications: true,
    systemNotifications: false,
    generalNotifications: true,
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'warning':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      case 'error':
        return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'payroll':
        return <DollarOutlined />;
      case 'employee':
        return <UserOutlined />;
      case 'system':
        return <SettingOutlined />;
      default:
        return <FileTextOutlined />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      default:
        return 'green';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    message.success('Marked as read');
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    message.success('All notifications marked as read');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    message.success('Notification deleted');
  };

  const clearAllRead = () => {
    setNotifications(prev => prev.filter(notification => !notification.read));
    message.success('All read notifications cleared');
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const payrollNotifications = notifications.filter(n => n.category === 'payroll');
  const employeeNotifications = notifications.filter(n => n.category === 'employee');
  const systemNotifications = notifications.filter(n => n.category === 'system');
  const generalNotifications = notifications.filter(n => n.category === 'general');

  const renderNotificationItem = (notification: Notification) => (
    <List.Item
      className={`notification-item ${notification.read ? 'read' : 'unread'}`}
      actions={[
        !notification.read && (
          <Button
            type="text"
            size="small"
            icon={<CheckOutlined />}
            onClick={() => markAsRead(notification.id)}
          >
            Mark as Read
          </Button>
        ),
        notification.action && (
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={notification.action.onClick}
          >
            {notification.action.label}
          </Button>
        ),
        <Popconfirm
          title="Delete this notification?"
          onConfirm={() => deleteNotification(notification.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>
      ].filter(Boolean)}
    >
      <List.Item.Meta
        avatar={
          <Badge dot={!notification.read}>
            <Avatar
              icon={getNotificationIcon(notification.type)}
              className={`notification-avatar ${notification.type}`}
            />
          </Badge>
        }
        title={
          <Space>
            <Text strong={!notification.read}>{notification.title}</Text>
            <Tag color={getPriorityColor(notification.priority)}>
              {notification.priority.toUpperCase()}
            </Tag>
            <Tag icon={getCategoryIcon(notification.category)}>
              {notification.category}
            </Tag>
          </Space>
        }
        description={
          <div>
            <Paragraph className="notification-message">
              {notification.message}
            </Paragraph>
            <Text type="secondary" className="notification-timestamp">
              <ClockCircleOutlined /> {formatTimestamp(notification.timestamp)}
            </Text>
          </div>
        }
      />
    </List.Item>
  );

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div className="notifications-title">
          <Title level={2}>
            <BellOutlined /> Notifications
          </Title>
          <Badge count={unreadCount} showZero={false}>
            <Text type="secondary">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </Text>
          </Badge>
        </div>
        <Space>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead}>
              Mark All as Read
            </Button>
          )}
          <Button onClick={clearAllRead}>
            Clear Read
          </Button>
        </Space>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={18}>
          <Card className="notifications-card">
            <Tabs defaultActiveKey="all" className="notifications-tabs">
              <TabPane
                tab={
                  <span>
                    All Notifications
                    <Badge count={notifications.length} style={{ marginLeft: 8 }} />
                  </span>
                }
                key="all"
              >
                <List
                  dataSource={notifications}
                  renderItem={renderNotificationItem}
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No notifications"
                      />
                    ),
                  }}
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    Payroll
                    <Badge count={payrollNotifications.filter(n => !n.read).length} style={{ marginLeft: 8 }} />
                  </span>
                }
                key="payroll"
              >
                <List
                  dataSource={payrollNotifications}
                  renderItem={renderNotificationItem}
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No payroll notifications"
                      />
                    ),
                  }}
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    Employees
                    <Badge count={employeeNotifications.filter(n => !n.read).length} style={{ marginLeft: 8 }} />
                  </span>
                }
                key="employees"
              >
                <List
                  dataSource={employeeNotifications}
                  renderItem={renderNotificationItem}
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No employee notifications"
                      />
                    ),
                  }}
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    System
                    <Badge count={systemNotifications.filter(n => !n.read).length} style={{ marginLeft: 8 }} />
                  </span>
                }
                key="system"
              >
                <List
                  dataSource={systemNotifications}
                  renderItem={renderNotificationItem}
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No system notifications"
                      />
                    ),
                  }}
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    General
                    <Badge count={generalNotifications.filter(n => !n.read).length} style={{ marginLeft: 8 }} />
                  </span>
                }
                key="general"
              >
                <List
                  dataSource={generalNotifications}
                  renderItem={renderNotificationItem}
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No general notifications"
                      />
                    ),
                  }}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>

        <Col xs={24} lg={6}>
          <Card title="Notification Settings" className="settings-card">
            <div className="settings-section">
              <Title level={5}>General Settings</Title>
              <div className="setting-item">
                <Text>Email Notifications</Text>
                <Switch
                  checked={settings.emailNotifications}
                  onChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                />
              </div>
              <div className="setting-item">
                <Text>Push Notifications</Text>
                <Switch
                  checked={settings.pushNotifications}
                  onChange={(checked) => setSettings(prev => ({ ...prev, pushNotifications: checked }))}
                />
              </div>
            </div>

            <Divider />

            <div className="settings-section">
              <Title level={5}>Category Settings</Title>
              <div className="setting-item">
                <Text>Payroll Notifications</Text>
                <Switch
                  checked={settings.payrollNotifications}
                  onChange={(checked) => setSettings(prev => ({ ...prev, payrollNotifications: checked }))}
                />
              </div>
              <div className="setting-item">
                <Text>Employee Notifications</Text>
                <Switch
                  checked={settings.employeeNotifications}
                  onChange={(checked) => setSettings(prev => ({ ...prev, employeeNotifications: checked }))}
                />
              </div>
              <div className="setting-item">
                <Text>System Notifications</Text>
                <Switch
                  checked={settings.systemNotifications}
                  onChange={(checked) => setSettings(prev => ({ ...prev, systemNotifications: checked }))}
                />
              </div>
              <div className="setting-item">
                <Text>General Notifications</Text>
                <Switch
                  checked={settings.generalNotifications}
                  onChange={(checked) => setSettings(prev => ({ ...prev, generalNotifications: checked }))}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NotificationsPage; 