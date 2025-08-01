import React from 'react';
import { Card, Statistic } from 'antd';
import { motion } from 'framer-motion';

interface ModernStatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  loading?: boolean;
  onClick?: () => void;
  gradient?: boolean;
}

const ModernStatsCard: React.FC<ModernStatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = 'primary',
  loading = false,
  onClick,
  gradient = false
}) => {
  const getColorStyles = () => {
    const colors = {
      primary: {
        bg: gradient ? 'linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%)' : 'var(--primary-50)',
        iconBg: 'var(--primary-100)',
        iconColor: 'var(--primary-600)',
        border: 'var(--primary-200)',
      },
      success: {
        bg: gradient ? 'linear-gradient(135deg, var(--success-50) 0%, var(--success-100) 100%)' : 'var(--success-50)',
        iconBg: 'var(--success-100)',
        iconColor: 'var(--success-600)',
        border: 'var(--success-200)',
      },
      warning: {
        bg: gradient ? 'linear-gradient(135deg, var(--warning-50) 0%, var(--warning-100) 100%)' : 'var(--warning-50)',
        iconBg: 'var(--warning-100)',
        iconColor: 'var(--warning-600)',
        border: 'var(--warning-200)',
      },
      error: {
        bg: gradient ? 'linear-gradient(135deg, var(--error-50) 0%, var(--error-100) 100%)' : 'var(--error-50)',
        iconBg: 'var(--error-100)',
        iconColor: 'var(--error-600)',
        border: 'var(--error-200)',
      },
      info: {
        bg: gradient ? 'linear-gradient(135deg, var(--neutral-50) 0%, var(--neutral-100) 100%)' : 'var(--neutral-50)',
        iconBg: 'var(--neutral-100)',
        iconColor: 'var(--neutral-600)',
        border: 'var(--neutral-200)',
      },
    };
    return colors[color];
  };

  const colorStyles = getColorStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <Card
        style={{
          background: colorStyles.bg,
          border: `1px solid ${colorStyles.border}`,
          borderRadius: '16px',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all 0.3s ease',
        }}
        bodyStyle={{ padding: '24px' }}
        loading={loading}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              {icon && (
                <div
                  style={{
                    background: colorStyles.iconBg,
                    color: colorStyles.iconColor,
                    padding: '12px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                  }}
                >
                  {icon}
                </div>
              )}
              <div>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    fontWeight: 500,
                    margin: 0,
                    marginBottom: '4px',
                  }}
                >
                  {title}
                </p>
                <Statistic
                  value={value}
                  valueStyle={{
                    color: 'var(--text-primary)',
                    fontSize: '28px',
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                />
              </div>
            </div>
            
            {trend && (
              <div className="flex items-center space-x-2">
                <span
                  style={{
                    color: trend.isPositive ? 'var(--success-600)' : 'var(--error-600)',
                    fontSize: '12px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
                </span>
                <span
                  style={{
                    color: 'var(--text-tertiary)',
                    fontSize: '12px',
                  }}
                >
                  vs last month
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ModernStatsCard;