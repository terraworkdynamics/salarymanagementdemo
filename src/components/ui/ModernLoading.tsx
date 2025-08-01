import React from 'react';
import { motion } from 'framer-motion';

interface ModernLoadingProps {
  size?: 'small' | 'default' | 'large';
  text?: string;
  overlay?: boolean;
  variant?: 'spinner' | 'dots' | 'pulse' | 'wave';
}

const ModernLoading: React.FC<ModernLoadingProps> = ({
  size = 'default',
  text,
  overlay = false,
  variant = 'spinner'
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: '16px', height: '16px' };
      case 'large':
        return { width: '32px', height: '32px' };
      default:
        return { width: '24px', height: '24px' };
    }
  };

  const SpinnerComponent = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex items-center justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary-600 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        );
      
      case 'pulse':
        return (
          <motion.div
            className="w-6 h-6 bg-primary-600 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        );
      
      case 'wave':
        return (
          <div className="flex items-center justify-center space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-primary-600 rounded-full"
                style={{ height: '20px' }}
                animate={{
                  scaleY: [1, 2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        );
      
      default:
        return (
          <div
            className="border-2 border-gray-200 border-t-primary-600 rounded-full animate-spin"
            style={getSizeStyles()}
          />
        );
    }
  };

  const loadingContent = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <SpinnerComponent />
      {text && (
        <motion.p
          className="text-sm text-gray-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {loadingContent}
        </motion.div>
      </motion.div>
    );
  }

  return loadingContent;
};

export default ModernLoading;