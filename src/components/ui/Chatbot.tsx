import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Avatar, Typography, Spin } from 'antd';
import {
  MessageOutlined,
  CloseOutlined,
  SendOutlined,
  UserOutlined,
  RobotOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const { Text } = Typography;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'query' | 'complaint' | 'guidance';
}

interface ChatbotProps {
  className?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Salary Management Assistant. I can help you with:\n\n• Employee queries and guidance\n• Payroll information\n• System navigation\n• Report complaints\n\nHow can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Knowledge base for project-specific answers
  const knowledgeBase = {
    // Employee related queries
    employee: {
      keywords: ['employee', 'staff', 'worker', 'personnel', 'team member'],
      responses: [
        'You can manage employees in the Employees section. Here you can:\n• Add new employees\n• View employee details\n• Update employee information\n• Manage departments and designations',
        'To add a new employee, go to Employees → Add Employee and fill in the required details including personal info, job details, and salary structure.',
        'Employee records include personal information, job details, salary structure, and employment history.',
      ],
    },
    // Payroll related queries
    payroll: {
      keywords: ['payroll', 'salary', 'payment', 'wages', 'compensation'],
      responses: [
        'The Payroll section helps you:\n• Process monthly salaries\n• Generate payslips\n• Track payment history\n• Manage deductions and allowances',
        'To process payroll, go to Payroll → Process Payroll, select the period, and review employee salaries before finalizing.',
        'Payroll includes basic salary, allowances, deductions, and net pay calculations.',
      ],
    },
    // Reports related queries
    reports: {
      keywords: ['report', 'analytics', 'data', 'statistics', 'summary'],
      responses: [
        'Reports section provides:\n• Salary reports\n• Employee analytics\n• Department-wise summaries\n• Export functionality',
        'You can generate various reports including monthly payroll reports, employee summaries, and department analytics.',
        'All reports can be exported to PDF or Excel format for external use.',
      ],
    },
    // Navigation help
    navigation: {
      keywords: ['navigate', 'menu', 'page', 'section', 'where', 'how to'],
      responses: [
        'Main navigation includes:\n• Dashboard - Overview and statistics\n• Employees - Manage staff\n• Salary Structure - Define pay scales\n• Payroll - Process payments\n• Reports - Analytics and exports',
        'Use the sidebar menu to navigate between different sections. Each section has specific functionalities for salary management.',
        'The search bar in the header helps you quickly find employees or payroll records.',
      ],
    },
    // System help
    system: {
      keywords: ['help', 'support', 'how', 'tutorial', 'guide'],
      responses: [
        'I can guide you through:\n• Adding employees\n• Processing payroll\n• Generating reports\n• System navigation\n• Troubleshooting common issues',
        'For step-by-step guidance, tell me what specific task you want to perform.',
        'The system is designed to be intuitive. Each page has helpful tooltips and clear action buttons.',
      ],
    },
  };

  const getRandomResponse = (responses: string[]): string => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for complaints
    if (lowerMessage.includes('complaint') || lowerMessage.includes('issue') || 
        lowerMessage.includes('problem') || lowerMessage.includes('bug') ||
        lowerMessage.includes('error') || lowerMessage.includes('not working')) {
      return 'Thank you for reporting this issue. Your complaint has been noted and will be resolved soon. Our technical team will review this matter and provide a solution.\n\nComplaint ID: #' + Math.random().toString(36).substr(2, 9).toUpperCase() + '\n\nIs there anything else I can help you with?';
    }

    // Check knowledge base
    for (const [, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return getRandomResponse(data.responses);
      }
    }

    // Default responses for unmatched queries
    const defaultResponses = [
      'I understand you need help with the salary management system. Could you please be more specific about what you\'re looking for?',
      'I\'m here to help! You can ask me about employees, payroll, reports, or system navigation. What would you like to know?',
      'Let me assist you with that. Could you provide more details about what you need help with?',
      'I can help you with various aspects of the salary management system. Please let me know your specific question or concern.',
    ];

    return getRandomResponse(defaultResponses);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: 'How to add employee?', icon: <UserOutlined /> },
    { text: 'Process payroll', icon: <MessageOutlined /> },
    { text: 'Generate reports', icon: <InfoCircleOutlined /> },
    { text: 'Report an issue', icon: <ExclamationCircleOutlined /> },
  ];

  const handleQuickAction = (text: string) => {
    setInputValue(text);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 1000,
            }}
          >
            <Button
              type="primary"
              shape="circle"
              size="large"
              icon={<MessageOutlined />}
              onClick={() => setIsOpen(true)}
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                border: 'none',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                fontSize: '24px',
              }}
              className="pulse-animation"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 100 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: '400px',
              height: isMinimized ? '60px' : '600px',
              background: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              border: '1px solid #e5e7eb',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
            className={className}
          >
            {/* Chat Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                color: 'white',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '16px 16px 0 0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Avatar
                  size={32}
                  icon={<RobotOutlined />}
                  style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                />
                <div>
                  <Text strong style={{ color: 'white', fontSize: '16px' }}>
                    Salary Assistant
                  </Text>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>
                    Online • Ready to help
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  type="text"
                  size="small"
                  icon={<MinusOutlined />}
                  onClick={() => setIsMinimized(!isMinimized)}
                  style={{ color: 'white' }}
                />
                <Button
                  type="text"
                  size="small"
                  icon={<CloseOutlined />}
                  onClick={() => setIsOpen(false)}
                  style={{ color: 'white' }}
                />
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div
                  style={{
                    flex: 1,
                    padding: '16px',
                    overflowY: 'auto',
                    background: '#f8fafc',
                  }}
                >
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        display: 'flex',
                        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                        marginBottom: '16px',
                      }}
                    >
                      <div
                        style={{
                          maxWidth: '80%',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                        }}
                      >
                        <Avatar
                          size={28}
                          icon={message.sender === 'user' ? <UserOutlined /> : <RobotOutlined />}
                          style={{
                            background: message.sender === 'user' 
                              ? 'linear-gradient(135deg, #10b981, #059669)' 
                              : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                            flexShrink: 0,
                          }}
                        />
                        <div
                          style={{
                            background: message.sender === 'user' ? '#3b82f6' : '#ffffff',
                            color: message.sender === 'user' ? 'white' : '#374151',
                            padding: '12px 16px',
                            borderRadius: '16px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            whiteSpace: 'pre-wrap',
                            fontSize: '14px',
                            lineHeight: '1.5',
                          }}
                        >
                          {message.text}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginBottom: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Avatar
                          size={28}
                          icon={<RobotOutlined />}
                          style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
                        />
                        <div
                          style={{
                            background: '#ffffff',
                            padding: '12px 16px',
                            borderRadius: '16px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <Spin size="small" />
                          <Text style={{ marginLeft: '8px', color: '#6b7280' }}>
                            Typing...
                          </Text>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {messages.length === 1 && (
                  <div style={{ padding: '0 16px 16px' }}>
                    <Text style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>
                      Quick actions:
                    </Text>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          size="small"
                          type="default"
                          icon={action.icon}
                          onClick={() => handleQuickAction(action.text)}
                          style={{
                            fontSize: '12px',
                            height: '32px',
                            borderRadius: '16px',
                            border: '1px solid #e5e7eb',
                          }}
                        >
                          {action.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div
                  style={{
                    padding: '16px',
                    borderTop: '1px solid #e5e7eb',
                    background: '#ffffff',
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                    <Input.TextArea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      autoSize={{ minRows: 1, maxRows: 3 }}
                      style={{
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb',
                        resize: 'none',
                      }}
                    />
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      style={{
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        border: 'none',
                        height: '40px',
                        width: '40px',
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse Animation Styles */}
      <style>
        {`
          .pulse-animation {
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
            }
          }
        `}
      </style>
    </>
  );
};

export default Chatbot;