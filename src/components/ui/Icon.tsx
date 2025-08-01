import React from 'react';
import { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  className?: string;
  size?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({
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

  return <IconComponent className={className} style={iconStyle} />;
};

export default Icon;