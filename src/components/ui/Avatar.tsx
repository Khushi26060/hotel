import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  status?: 'online' | 'away' | 'offline';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  className,
  status,
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const statusClasses = {
    online: 'bg-success-500',
    away: 'bg-warning-500',
    offline: 'bg-gray-400',
  };

  return (
    <div className="relative">
      <div 
        className={cn(
          'relative flex items-center justify-center rounded-full bg-gray-200 overflow-hidden',
          sizeClasses[size],
          className
        )}
      >
        {src ? (
          <img 
            src={src} 
            alt={alt} 
            className="h-full w-full object-cover"
            onError={(e) => {
              // If image fails to load, show initials instead
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <span className="font-medium text-gray-600">
            {initials || alt.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      
      {status && (
        <span 
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-white',
            statusClasses[status],
            size === 'sm' ? 'h-2 w-2' : 'h-3 w-3'
          )}
        />
      )}
    </div>
  );
};

export default Avatar;