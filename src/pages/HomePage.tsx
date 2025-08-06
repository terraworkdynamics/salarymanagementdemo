import React, { useEffect, useState } from 'react';
import { Typography, Space, Row, Col, Button, Card, Badge } from 'antd';
import {
  UserOutlined,
  DollarOutlined,
  CreditCardOutlined,
  LockOutlined,
  CheckOutlined,
  StarOutlined,
  RocketOutlined,
  SafetyOutlined,
  BarChartOutlined,
  TeamOutlined,
  GlobalOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './HomePage.module.css';

const { Title, Paragraph } = Typography;

// Floating Particles Component
const FloatingParticle: React.FC<{ delay?: number; duration?: number; size?: number }> = ({ 
  delay = 0, 
  duration = 8, 
  size = 4 
}) => (
  <div
    className={styles.particle}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
);

// Feature Icon Component
const FeatureIcon: React.FC<{ icon: React.ReactNode; gradient: string }> = ({ icon, gradient }) => (
  <div className={styles.featureIcon} style={{ background: gradient }}>
    {icon}
  </div>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isStylesLoaded, setIsStylesLoaded] = useState(false);

  const handleLoginClick = () => navigate('/login');
  const handleDashboardClick = () => navigate('/login', { state: { from: { pathname: '/dashboard' } } });

  useEffect(() => {
    // Inject critical CSS immediately to prevent white flash
    const style = document.createElement('style');
    style.id = 'critical-dark-theme';
    style.textContent = `
      /* IMMEDIATE DARK THEME OVERRIDE - PREVENTS WHITE FLASH */
      /* Use EXACT desktop colors for each card type */
      div[class*="statCard"],
      div[class*="testimonialCard"] {
        background: rgba(15, 15, 35, 0.8) !important;
        color: white !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        transition: none !important;
      }
      
      div[class*="featureCard"] {
        background: rgba(255, 255, 255, 0.05) !important;
        color: white !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        transition: none !important;
      }
      
      .ant-card {
        background: rgba(15, 15, 35, 0.8) !important;
        color: white !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        transition: none !important;
      }
      
      .ant-card-body {
        background: transparent !important;
        color: white !important;
      }
      
      /* AGGRESSIVE TEXT COLOR OVERRIDE FOR MOBILE */
      .ant-card *,
      .ant-card .ant-typography,
      .ant-card .ant-typography *,
      .ant-card h1, .ant-card h2, .ant-card h3, .ant-card h4, .ant-card h5, .ant-card h6,
      .ant-card p, .ant-card span, .ant-card div,
      div[class*="Card"] *,
      div[class*="Card"] .ant-typography,
      div[class*="Card"] .ant-typography *,
      div[class*="Card"] h1, div[class*="Card"] h2, div[class*="Card"] h3, 
      div[class*="Card"] h4, div[class*="Card"] h5, div[class*="Card"] h6,
      div[class*="Card"] p, div[class*="Card"] span, div[class*="Card"] div {
        color: white !important;
      }
      
      /* Hover effects with exact desktop colors */
      div[class*="statCard"]:hover,
      div[class*="testimonialCard"]:hover {
        background: rgba(15, 15, 35, 0.9) !important;
        border-color: rgba(102, 126, 234, 0.3) !important;
      }
      
      div[class*="featureCard"]:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        border-color: rgba(102, 126, 234, 0.4) !important;
      }
      
      /* Maintain specific icon colors */
      .anticon[style*="color: #4ade80"],
      span[style*="color: #4ade80"],
      [class*="benefitItem"] .anticon {
        color: #4ade80 !important;
      }
      
      .anticon[style*="color: #fbbf24"],
      span[style*="color: #fbbf24"],
      [class*="quoteIcon"] {
        color: #fbbf24 !important;
      }
      
      /* Ensure body background is dark immediately */
      body {
        background: #0f0f23 !important;
      }
      
      /* Disable transitions during initial load */
      * {
        transition-duration: 0s !important;
      }
      
      /* Mobile-specific text color fixes */
      @media (max-width: 768px) {
        /* Force white text on all mobile cards */
        .ant-card,
        .ant-card *,
        div[class*="Card"],
        div[class*="Card"] *,
        .ant-typography,
        .ant-typography * {
          color: white !important;
        }
        
        /* Maintain card backgrounds */
        div[class*="statCard"],
        div[class*="testimonialCard"] {
          background: rgba(15, 15, 35, 0.8) !important;
        }
        
        div[class*="featureCard"] {
          background: rgba(255, 255, 255, 0.05) !important;
        }
        
        /* Keep icon colors */
        [class*="benefitItem"] .anticon {
          color: #4ade80 !important;
        }
        
        [class*="quoteIcon"],
        [class*="quoteIcon"] * {
          color: #fbbf24 !important;
        }
      }
    `;
    
    if (!document.head.querySelector('#critical-dark-theme')) {
      document.head.appendChild(style);
    }
    
    // Set loaded state and re-enable transitions after a brief delay
    const timer = setTimeout(() => {
      setIsStylesLoaded(true);
      document.body.classList.add('styles-loaded');
      
      // Re-enable transitions
      const reEnableTransitions = document.createElement('style');
      reEnableTransitions.textContent = `
        body.styles-loaded * {
          transition-duration: inherit !important;
        }
      `;
      document.head.appendChild(reEnableTransitions);
    }, 100);
    
    window.scrollTo(0, 0);
    
    return () => {
      clearTimeout(timer);
      const criticalStyle = document.head.querySelector('#critical-dark-theme');
      if (criticalStyle) {
        document.head.removeChild(criticalStyle);
      }
    };
  }, []);
  
  
  const features = [
    {
      title: 'Smart Employee Management',
      description: 'AI-powered employee database with intelligent insights and automated workflows.',
      icon: <TeamOutlined />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      benefits: ['Smart profiles', 'AI insights', 'Automated workflows', 'Performance analytics']
    },
    {
      title: 'Dynamic Salary Structure',
      description: 'Flexible compensation management with real-time calculations and compliance.',
      icon: <DollarOutlined />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      benefits: ['Custom structures', 'Real-time calculations', 'Tax compliance', 'Bonus management']
    },
    {
      title: 'Automated Payroll',
      description: 'Seamless payroll processing with bank integration and multi-currency support.',
      icon: <CreditCardOutlined />,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      benefits: ['One-click processing', 'Bank integration', 'Multi-currency', 'Instant payslips']
    },
    {
      title: 'Advanced Analytics',
      description: 'Real-time dashboards with predictive analytics and custom reporting.',
      icon: <BarChartOutlined />,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      benefits: ['Predictive analytics', 'Custom dashboards', 'Export options', 'Trend analysis']
    },
  ];

  const stats = [
    { label: 'Enterprise Clients', value: '1+', icon: <GlobalOutlined />, color: '#667eea' },
    { label: 'Employees Managed', value: '5+', icon: <UserOutlined />, color: '#f5576c' },
    { label: 'Payrolls Processed', value: '10+', icon: <CreditCardOutlined />, color: '#00f2fe' },
    { label: 'Uptime SLA', value: '99.99%', icon: <SafetyOutlined />, color: '#38f9d7' },
  ];

  const testimonials = [
    {
      quote: "TerraDigitalize has revolutionized our HR operations. The automation features save us 20+ hours weekly.",
      author: " ",
      role: " ",
      company: " "
    },
    {
      quote: "The analytics dashboard provides insights we never had before. Game-changing for our payroll strategy.",
      author: " ",
      role: " ",
      company: " "
    },
    {
      quote: "Implementation was seamless and the support team is exceptional. Highly recommended!",
      author: "  ",
      role: " ",
      company: " "
    }
  ];

  // Default card styles to ensure dark theme from initial render
  const defaultCardStyle = {
    background: 'rgba(15, 15, 35, 0.9)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const defaultStatCardStyle = {
    ...defaultCardStyle,
    textAlign: 'center' as const,
    padding: '24px',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)'
  };

  return (
    <div className={styles.root} style={{ background: '#0f0f23', color: 'white' }}>
      {/* Floating Particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <FloatingParticle 
          key={i} 
          delay={i * 0.5} 
          duration={8 + (i % 4)} 
          size={3 + (i % 3)}
        />
      ))}

      {/* Header/Navigation */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.nav}>
            <div className={styles.logo}>
              <img src="/logo.png" alt="TerraDigitalize Logo" className={styles.logoImage} />
              <div>
                <div className={styles.companyName}>TerraDigitalize Dynamics</div>
              </div>
            </div>
            <Button 
              type="primary" 
              icon={<LockOutlined />}
              onClick={handleLoginClick}
              className={styles.loginButton}
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
     {/* Hero Section */}
<section className={styles.heroSection}>
  <div className={styles.container}>
    {/* Move Badge outside of heroContent for mobile positioning */}
    <div className={styles.heroContent}>
      <Badge.Ribbon text="Enterprise Ready" color="#667eea" className={styles.ribbon}>
        <div className={styles.badgeContainer}></div>
      </Badge.Ribbon>
      <Title level={1} className={styles.heroTitle}>
  Next-Generation
  <br />
  <span className={styles.gradientText}>Salary Management</span>
  <br />
  for Modern Enterprises
</Title>

      <Paragraph className={styles.heroSubtitle}>
        Transform your HR operations with AI-powered payroll automation, 
        real-time analytics, and seamless integrations. Built for scale, 
        designed for simplicity.
      </Paragraph>
      <Space size="large" className={styles.heroButtons}>
        <Button
          type="primary"
          size="large"
          onClick={handleDashboardClick}
          icon={<RocketOutlined />}
          className={styles.primaryButton}
        >
          Get Demo
        </Button>
      
      </Space>
    </div>
  </div>
</section>


      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <Row gutter={[32, 32]} justify="center">
            {stats.map((stat, index) => (
              <Col xs={12} sm={6} key={index}>
                <div className={styles.statCard} style={defaultStatCardStyle}>
                  <div className={styles.statIcon} style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
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
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <Title level={2} className={styles.sectionTitle}>
              Powerful Features for
              <span className={styles.gradientText}> Complete Control</span>
            </Title>
            <Paragraph className={styles.sectionSubtitle}>
              Everything you need to manage payroll efficiently, from employee onboarding 
              to advanced analytics and compliance reporting.
            </Paragraph>
          </div>
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} lg={12} xl={6} key={index}>
                <Card 
                  className={styles.featureCard} 
                  style={defaultCardStyle}
                  hoverable
                >
                  <FeatureIcon icon={feature.icon} gradient={feature.gradient} />
                  <Title level={4} className={styles.featureTitle}>
                    {feature.title}
                  </Title>
                  <Paragraph className={styles.featureDescription}>
                    {feature.description}
                  </Paragraph>
                  <div className={styles.benefitsList}>
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className={styles.benefitItem}>
                        <CheckOutlined style={{ color: '#4ade80' }} />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <Title level={2} className={styles.sectionTitle}>
            Why Clients Choose Us
          </Title>
          <Row gutter={[24, 24]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <Card 
                  className={styles.testimonialCard}
                  style={defaultCardStyle}
                >
                  <div className={styles.quoteIcon}>
                    <StarOutlined style={{ color: '#fbbf24' }} />
                  </div>
                  <Paragraph className={styles.quote}>
                    "{testimonial.quote}"
                  </Paragraph>
                  <div className={styles.author}>
                    <div className={styles.authorName}>{testimonial.author}</div>
                    <div className={styles.authorRole}>
                      {testimonial.role}  {testimonial.company}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Title level={2} className={styles.ctaTitle}>
              Ready to Transform Your Payroll?
            </Title>
            <Paragraph className={styles.ctaSubtitle}>
            Empower your business with TerraDigitalize Dynamics to streamline and simplify your HR operations.
            </Paragraph>
            <Space size="large">
              <Button
                type="primary"
                size="large"
                onClick={handleDashboardClick}
                icon={<RocketOutlined />}
                className={styles.primaryButton}
              >
                Get Started Now
              </Button>
            
            </Space>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <img src="/logo.png" alt="TerraDigitalize Logo" />
                <div>
                  <div className={styles.footerCompanyName}>TerraDigitalize Dynamics</div>
                  <div className={styles.footerCompanySubname}></div>
                </div>
              </div>
              <Paragraph className={styles.footerDescription}>
                At TerraDigitalize Dynamics, integrity forms the cornerstone of everything we do. 
                We're committed to building enduring relationships rooted in trust, transparency, and excellence.
              </Paragraph>
              <div className={styles.socialLinks}>
                <Button 
                  type="link" 
                  icon={<GlobalOutlined />} 
                  href="https://terradigitalizedynamics.com/" 
                  target="_blank"
                  className={styles.socialButton}
                >
                  Visit Website
                </Button>
              </div>
            </div>
            
            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <Title level={5} className={styles.columnTitle}>Product</Title>
                <div className={styles.linksList}>
                  <Button type="link" className={styles.footerLink}>Features</Button>
                  <Button type="link" className={styles.footerLink}>Pricing</Button>
                  <Button type="link" className={styles.footerLink}>Integrations</Button>
                  <Button type="link" className={styles.footerLink}>API Documentation</Button>
                  <Button type="link" className={styles.footerLink}>Release Notes</Button>
                </div>
              </div>
              
              <div className={styles.footerColumn}>
                <Title level={5} className={styles.columnTitle}>Company</Title>
                <div className={styles.linksList}>
                  <Button type="link" className={styles.footerLink}>About Us</Button>
                  <Button type="link" className={styles.footerLink}>Careers</Button>
                  <Button type="link" className={styles.footerLink}>Blog</Button>
                  <Button type="link" className={styles.footerLink}>Press Kit</Button>
                  <Button type="link" className={styles.footerLink}>Partners</Button>
                </div>
              </div>
              
              <div className={styles.footerColumn}>
                <Title level={5} className={styles.columnTitle}>Support</Title>
                <div className={styles.linksList}>
                  <Button type="link" className={styles.footerLink}>Help Center</Button>
                  <Button type="link" className={styles.footerLink}>Contact Support</Button>
                  <Button type="link" className={styles.footerLink}>System Status</Button>
                  <Button type="link" className={styles.footerLink}>Community</Button>
                  <Button type="link" className={styles.footerLink}>Training</Button>
                </div>
              </div>
              
              <div className={styles.footerColumn}>
                <Title level={5} className={styles.columnTitle}>Legal</Title>
                <div className={styles.linksList}>
                  <Button type="link" className={styles.footerLink}>Privacy Policy</Button>
                  <Button type="link" className={styles.footerLink}>Terms of Service</Button>
                  <Button type="link" className={styles.footerLink}>Cookie Policy</Button>
                  <Button type="link" className={styles.footerLink}>GDPR</Button>
                  <Button type="link" className={styles.footerLink}>Security</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.footerDivider}></div>
          
          <div className={styles.footerBottom}>
            <div className={styles.footerBottomLeft}>
              <Paragraph className={styles.copyright}>
                © {new Date().getFullYear()} TerraDigitalize Dynamics. All rights reserved.
              </Paragraph>
              <Paragraph className={styles.tagline}>
                Transforming HR operations worldwide through innovative digital solutions.
              </Paragraph>
            </div>
            
            <div className={styles.footerBottomRight}>
              <div className={styles.quickLinks}>
                <Button type="link" size="small" className={styles.quickLink}>Privacy</Button>
                <span className={styles.separator}>•</span>
                <Button type="link" size="small" className={styles.quickLink}>Terms</Button>
                <span className={styles.separator}>•</span>
                <Button type="link" size="small" className={styles.quickLink}>Cookies</Button>
                <span className={styles.separator}>•</span>
                <Button type="link" size="small" className={styles.quickLink}>Sitemap</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
