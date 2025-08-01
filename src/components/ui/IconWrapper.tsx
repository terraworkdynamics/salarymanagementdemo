import React from 'react';
import { IconType } from 'react-icons';

interface IconWrapperProps {
  icon: IconType;
  className?: string;
  size?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

const IconWrapper: React.FC<IconWrapperProps> = ({
  icon: IconComponent,
  className = '',
  size,
  color,
  style = {}
}) => {
  const iconStyle = {
    ...style,
    ...(size && { fontSize: size }),
    ...(color && { color }),
  };

  // Use React.createElement to properly render the icon
  return React.createElement(IconComponent as any, {
    className,
    style: iconStyle,
  });
};

export default IconWrapper;