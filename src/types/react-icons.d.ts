declare module 'react-icons/fi' {
  import { ComponentType, SVGProps } from 'react';
  
  export interface IconBaseProps extends SVGProps<SVGSVGElement> {
    children?: React.ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
  }
  
  export type IconType = ComponentType<IconBaseProps>;
  
  export const FiActivity: IconType;
  export const FiArrowRight: IconType;
  export const FiBell: IconType;
  export const FiCalendar: IconType;
  export const FiCheck: IconType;
  export const FiCreditCard: IconType;
  export const FiDollarSign: IconType;
  export const FiEye: IconType;
  export const FiEyeOff: IconType;
  export const FiFileText: IconType;
  export const FiHome: IconType;
  export const FiLock: IconType;
  export const FiLogOut: IconType;
  export const FiMenu: IconType;
  export const FiPieChart: IconType;
  export const FiSearch: IconType;
  export const FiSettings: IconType;
  export const FiStar: IconType;
  export const FiTrendingDown: IconType;
  export const FiTrendingUp: IconType;
  export const FiUser: IconType;
  export const FiUsers: IconType;
  export const FiX: IconType;
}

declare module 'react-icons' {
  import { ComponentType, SVGProps } from 'react';
  
  export interface IconBaseProps extends SVGProps<SVGSVGElement> {
    children?: React.ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
  }
  
  export type IconType = ComponentType<IconBaseProps>;
}