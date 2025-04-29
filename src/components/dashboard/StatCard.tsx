import React from 'react';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
}) => {
  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {trend && (
              <p 
                className={cn(
                  'ml-2 text-sm font-medium',
                  trend.isPositive ? 'text-success-600' : 'text-error-600'
                )}
              >
                <span className="inline-flex items-center">
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
              </p>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-primary-50 rounded-lg">
            {icon}
          </div>
        )}
      </div>
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-100">
        <div 
          className={cn(
            "h-full",
            trend && trend.isPositive ? 'bg-success-500' : 'bg-error-500'
          )} 
          style={{ width: trend ? `${Math.min(Math.abs(trend.value) * 3, 100)}%` : '0%' }}
        />
      </div>
    </Card>
  );
};

export default StatCard;