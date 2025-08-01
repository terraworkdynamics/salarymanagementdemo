import React from 'react';
import { Button, ButtonProps } from 'antd';
import { motion } from 'framer-motion';

interface ModernButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  animate?: boolean;
  glow?: boolean;
}

const ModernButton: React.FC<ModernButtonProps> = ({
  variant = 'primary',
  animate = true,
  glow = false,
  className = '',
  children,
  ...props
}) => {
  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: '12px',
      fontWeight: 500,
      transition: 'all 0.3s ease',
      border: 'none',
      height: 'auto',
      padding: '12px 24px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
          color: 'white',
          boxShadow: glow ? '0 0 20px var(--primary-300)' : 'var(--shadow-sm)',
        };
      case 'secondary':
        return {
          ...baseStyles,
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-sm)',
        };
      case 'outline':
        return {
          ...baseStyles,
          background: 'transparent',
          color: 'var(--primary-600)',
          border: '2px solid var(--primary-600)',
        };
      case 'ghost':
        return {
          ...baseStyles,
          background: 'transparent',
          color: 'var(--text-secondary)',
          border: 'none',
        };
      case 'gradient':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--secondary-500) 100%)',
          color: 'white',
          boxShadow: glow ? '0 0 30px var(--primary-300)' : 'var(--shadow-md)',
        };
      default:
        return baseStyles;
    }
  };

  const buttonContent = (
    <Button
      className={`modern-btn ${className}`}
      style={getVariantStyles()}
      {...props}
    >
      {children}
    </Button>
  );

  if (animate) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {buttonContent}
      </motion.div>
    );
  }

  return buttonContent;
};

export default ModernButton;