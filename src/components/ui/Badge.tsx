import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  variant = 'primary', 
  children, 
  className 
}) => {
  const variantClasses = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
  };

  return (
    <span
      className={cn(
        'badge',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;