import React, { useState, useEffect } from 'react';
import {
  Card,
  Avatar,
  Typography,
  Badge,
  Button,
  Tabs,
  Space,
  Tag,
  Empty,
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
  DownloadOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import './NotificationsPage.css';

const { Title, Text } = Typography;
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
    icon?: React.ReactNode;
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
        icon: <EyeOutlined />,
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
        icon: <EyeOutlined />,
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
        icon: <ReloadOutlined />,
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
        icon: <EyeOutlined />,
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
        icon: <DownloadOutlined />,
        onClick: () => message.success('Report downloaded successfully'),
      },
    },
  ]);

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
    <div key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
      <div className="notification-content">
        <Badge dot={!notification.read}>
          <Avatar
            icon={getNotificationIcon(notification.type)}
            className={`notification-avatar ${notification.type}`}
          />
        </Badge>
        <div className="notification-text-content">
          <p className="notification-paragraph">
            <span className="notification-title">{notification.title}</span>
            <span className="notification-tags">
              <Tag color={getPriorityColor(notification.priority)}>
                {notification.priority.toUpperCase()}
              </Tag>
              <Tag icon={getCategoryIcon(notification.category)}>
                {notification.category}
              </Tag>
            </span>
            <span className="notification-message">{notification.message}</span>
            <span className="notification-timestamp">
              <ClockCircleOutlined /> {formatTimestamp(notification.timestamp)}
            </span>
          </p>
        </div>
      </div>
      <div className="notification-actions">
        {!notification.read && (
          <Button
            type="text"
            size="small"
            icon={<CheckOutlined />}
            onClick={() => markAsRead(notification.id)}
          >
            Mark as Read
          </Button>
        )}
        {notification.action && (
          <Button
            type="primary"
            size="small"
            icon={notification.action.icon}
            onClick={notification.action.onClick}
          >
            {notification.action.label}
          </Button>
        )}
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
      </div>
    </div>
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
            <div>
              {notifications.length > 0 ? (
                notifications.map(renderNotificationItem)
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No notifications"
                />
              )}
            </div>
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
            <div>
              {payrollNotifications.length > 0 ? (
                payrollNotifications.map(renderNotificationItem)
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No payroll notifications"
                />
              )}
            </div>
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
            <div>
              {employeeNotifications.length > 0 ? (
                employeeNotifications.map(renderNotificationItem)
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No employee notifications"
                />
              )}
            </div>
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
            <div>
              {systemNotifications.length > 0 ? (
                systemNotifications.map(renderNotificationItem)
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No system notifications"
                />
              )}
            </div>
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
            <div>
              {generalNotifications.length > 0 ? (
                generalNotifications.map(renderNotificationItem)
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No general notifications"
                />
              )}
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default NotificationsPage;
