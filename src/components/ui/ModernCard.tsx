import React from 'react';
import { Card, CardProps } from 'antd';
import { motion } from 'framer-motion';

interface ModernCardProps extends CardProps {
  children: React.ReactNode;
  hover?: boolean;
  gradient?: boolean;
  glass?: boolean;
  animate?: boolean;
}

const ModernCard: React.FC<ModernCardProps> = ({
  children,
  hover = true,
  gradient = false,
  glass = false,
  animate = true,
  className = '',
  ...props
}) => {
  const cardClasses = [
    'modern-card',
    hover ? 'hover:shadow-lg hover:-translate-y-1' : '',
    gradient ? 'bg-gradient-to-br from-primary-50 to-secondary-50' : '',
    glass ? 'backdrop-blur-sm bg-white/80' : '',
    className
  ].filter(Boolean).join(' ');

  const cardContent = (
    <Card
      className={cardClasses}
      style={{
        borderRadius: '16px',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.3s ease',
        ...props.style
      }}
      {...props}
    >
      {children}
    </Card>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hover ? { y: -4, boxShadow: 'var(--shadow-lg)' } : {}}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default ModernCard;