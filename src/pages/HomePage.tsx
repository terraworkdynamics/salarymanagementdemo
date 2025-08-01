import React from 'react';
import { Typography, Space, Row, Col, Button, Card } from 'antd';
import {
  UserOutlined,
  DollarOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  LockOutlined,
  CheckOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import styles from './HomePage.module.css';

const { Title, Paragraph } = Typography;

// 3D Animated Hexagon Component
const AnimatedHexagon: React.FC<{ delay?: number; size?: number }> = ({ delay = 0, size = 60 }) => (
  <div
    style={{
      width: `${size}px`,
      height: `${size}px`,
      position: 'relative',
      animation: `float 6s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
    className={styles.hexagon}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
      }}
    >
      <defs>
        <linearGradient id={`hexGradient${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <polygon
        points="50,5 85,25 85,65 50,85 15,65 15,25"
        fill={`url(#hexGradient${delay})`}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
        style={{
          animation: `pulse 4s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    </svg>
    <style>
      {`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-5px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}
    </style>
  </div>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLoginClick = () => navigate('/login');
  const handleDashboardClick = () => navigate('/dashboard');

  const features = [
    {
      title: 'Employee Management',
      description: 'Comprehensive employee database with advanced search, filtering, and management capabilities.',
      icon: <UserOutlined />,
      color: '#1890ff',
      benefits: ['Employee profiles', 'Department management', 'Role assignments', 'Performance tracking']
    },
    {
      title: 'Salary Structure',
      description: 'Flexible salary components with automated calculations and tax compliance.',
      icon: <DollarOutlined />,
      color: '#52c41a',
      benefits: ['Custom pay scales', 'Allowances & deductions', 'Tax calculations', 'Compliance reports']
    },
    {
      title: 'Payroll Processing',
      description: 'Automated payroll with multi-currency support and bank integration.',
      icon: <CreditCardOutlined />,
      color: '#faad14',
      benefits: ['Automated processing', 'Bank integration', 'Multi-currency', 'Payslip generation']
    },
    {
      title: 'Reports & Analytics',
      description: 'Real-time insights with customizable dashboards and export capabilities.',
      icon: <FileTextOutlined />,
      color: '#13c2c2',
      benefits: ['Real-time analytics', 'Custom reports', 'Data visualization', 'Export options']
    },
  ];

  const stats = [
    { label: 'Companies Trust Us', value: '1', icon: <StarOutlined /> },
    { label: 'Employees Managed', value: '100+', icon: <UserOutlined /> },
    { label: 'Payrolls Processed', value: '10+', icon: <CreditCardOutlined /> },
    { label: 'Uptime Guarantee', value: '99.9%', icon: <CheckOutlined /> },
  ];

  return (
    <div className={styles.root}>
      {/* Animated Background Hexagons */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', opacity: 0.3 }}>
        <AnimatedHexagon delay={0} size={80} />
      </div>
      <div style={{ position: 'absolute', top: '20%', right: '10%', opacity: 0.4 }}>
        <AnimatedHexagon delay={1} size={60} />
      </div>
      <div style={{ position: 'absolute', bottom: '30%', left: '15%', opacity: 0.2 }}>
        <AnimatedHexagon delay={2} size={100} />
      </div>
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', opacity: 0.3 }}>
        <AnimatedHexagon delay={1.5} size={70} />
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '3%', opacity: 0.2 }}>
        <AnimatedHexagon delay={0.5} size={50} />
      </div>
      <div style={{ position: 'absolute', top: '70%', right: '20%', opacity: 0.3 }}>
        <AnimatedHexagon delay={2.5} size={90} />
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        {/* Logo as transparent background */}
        <img
          src="/logo.png"
          alt="TerraDigitalize Dynamics Logo background"
          className={styles.bgLogo}
          aria-hidden="true"
          draggable={false}
        />
        <div className={styles.heroBranding}>
          <Title level={1} className={styles.companyTitle}>
            TerraDigitalize Dynamics
          </Title>
          <Paragraph className={styles.companyTagline}>
            Innovative Digital Solutions for Modern Enterprises
          </Paragraph>
        </div>
        <Title level={1} className={styles.heroMainTitle}>
          Advanced Salary
          <br />
          <span style={{ color: 'black' }}>
            Management System
          </span>
        </Title>
        <Paragraph className={styles.heroSubtitle}>
          Streamline your HR operations with our comprehensive salary management platform. 
          Built for modern businesses with advanced analytics, automation, and compliance features.
        </Paragraph>
        <Space size="large" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          {isAuthenticated ? (
            <Button
              type="primary"
              size="large"
              onClick={handleDashboardClick}
              className={styles.ctaButton}
            >
              Access Dashboard
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              onClick={handleLoginClick}
              icon={<LockOutlined />}
              className={styles.ctaButton}
            >
              Get Started
            </Button>
          )}
        </Space>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <Row gutter={[32, 32]} justify="center">
            {stats.map((stat, index) => (
              <Col xs={12} sm={6} key={index}>
                <div style={{ textAlign: 'center' }}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <Title level={2} className={styles.featuresTitle}>
              Everything You Need to
              <span
                style={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {' '}Manage Payroll
              </span>
            </Title>
            <Paragraph className={styles.featuresSubtitle}>
              Our comprehensive platform provides all the tools you need to streamline 
              your salary management process from start to finish.
            </Paragraph>
          </div>
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} md={12} lg={6} key={index}>
                <Card
                  className={styles.featureCard}
                  bodyStyle={{ padding: '24px', textAlign: 'center' }}
                  hoverable
                >
                  <div
                    className={styles.featureIconBox}
                    style={{ background: feature.color + '15', color: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  <Title level={4} className={styles.featureCardTitle}>
                    {feature.title}
                  </Title>
                  <Paragraph className={styles.featureDescription}>
                    {feature.description}
                  </Paragraph>
                  <div style={{ textAlign: 'left' }}>
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className={styles.featureBenefitRow}>
                        <CheckOutlined />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <Title level={3} className={styles.footerTitle}>
            TerraDigitalize Dynamics
          </Title>
          <Paragraph className={styles.footerParagraph}>
            © {new Date().getFullYear()} TerraDigitalize Dynamics. All Rights Reserved.<br />
            Innovative digital solutions for modern enterprises.
          </Paragraph>
          <div className={styles.footerLinks}>
            <Button type="link">Privacy Policy</Button>
            <Button type="link">Terms of Service</Button>
            <Button type="link">Support</Button>
            <Button type="link">Contact</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
