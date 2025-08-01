import React from 'react';
import { Typography, Card, Space, Button } from 'antd';
import { MessageOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';
import MainLayout from '../components/layout/MainLayout';
import './ChatbotTestPage.css';

const { Title, Paragraph } = Typography;

const ChatbotTestPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="chatbot-demo-root">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card className="chatbot-card">
            <Title level={2} className="chatbot-title">
              <MessageOutlined style={{ color: '#1890ff', marginRight: '12px' }} />
              Chatbot Demo Page
            </Title>

            <Paragraph className="chatbot-desc">
              This page demonstrates the integrated chatbot functionality. Look for the floating chat button 
              in the bottom-right corner of the screen.
            </Paragraph>

            <div className="chatbot-feature-panel">
              <Title level={4} style={{ marginBottom: '16px' }}>
                <RobotOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                Chatbot Features:
              </Title>
              <ul>
                <li>
                  <strong>Employee Management:</strong> Ask about adding employees, managing staff, or employee information
                </li>
                <li>
                  <strong>Payroll Processing:</strong> Get help with salary processing, payroll generation, and payment workflows
                </li>
                <li>
                  <strong>Reports & Analytics:</strong> Learn about generating reports, viewing analytics, and exporting data
                </li>
                <li>
                  <strong>System Navigation:</strong> Get guidance on using different sections of the application
                </li>
                <li>
                  <strong>Complaint Handling:</strong> Report issues or problems - they'll be logged with a tracking ID
                </li>
              </ul>
              {/* Optional animated bot GIF. Download a waving chatbot GIF and place it at /public/chatbot-wave.gif */}
              <img
                alt="Chatbot waving"
                className="chatbot-feature-gif"
                src="/chatbot-wave.gif"
              />
            </div>

            <div className="chatbot-sample-panel">
              <Title level={4} className="chatbot-sample-title">
                <UserOutlined style={{ marginRight: '8px' }} />
                Try These Sample Queries:
              </Title>
              <div className="chatbot-sample-grid">
                <Button type="default" size="small" className="chatbot-sample-btn">
                  "How to add a new employee?"
                </Button>
                <Button type="default" size="small" className="chatbot-sample-btn">
                  "Process monthly payroll"
                </Button>
                <Button type="default" size="small" className="chatbot-sample-btn">
                  "Generate salary reports"
                </Button>
                <Button type="default" size="small" className="chatbot-sample-btn">
                  "I have a complaint about the system"
                </Button>
                <Button type="default" size="small" className="chatbot-sample-btn">
                  "Help me navigate the dashboard"
                </Button>
                <Button type="default" size="small" className="chatbot-sample-btn">
                  "What can you help me with?"
                </Button>
              </div>
            </div>

            <div className="chatbot-tip-box">
              <Title level={5}>💡 Pro Tip</Title>
              <Paragraph>
                The chatbot is available on all pages within the application. 
                Click the floating chat button to start a conversation!
              </Paragraph>
            </div>
          </Card>
        </Space>
      </div>
    </MainLayout>
  );
};

export default ChatbotTestPage;
