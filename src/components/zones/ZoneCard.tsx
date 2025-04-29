import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import { Zone, FeedbackStats } from '../../types';
import { Activity, BarChart2 } from 'lucide-react';

interface ZoneCardProps {
  zone: Zone;
  stats?: FeedbackStats;
  onClick?: () => void;
}

const ZoneCard: React.FC<ZoneCardProps> = ({ zone, stats, onClick }) => {
  // Function to get icon based on zone type
  const getZoneIcon = (type: string) => {
    switch (type) {
      case 'restaurant':
        return <span className="text-lg">🍽️</span>;
      case 'room':
        return <span className="text-lg">🛏️</span>;
      case 'lobby':
        return <span className="text-lg">🏢</span>;
      case 'pool':
        return <span className="text-lg">🏊</span>;
      case 'spa':
        return <span className="text-lg">💆</span>;
      case 'gym':
        return <span className="text-lg">🏋️</span>;
      default:
        return <span className="text-lg">📍</span>;
    }
  };
  
  // Function to get badge variant based on rating
  const getRatingBadgeVariant = (rating: number) => {
    if (rating >= 4) return 'success';
    if (rating >= 3) return 'warning';
    return 'error';
  };
  
  return (
    <Card className="h-full" hoverable onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <div className="mr-2">{getZoneIcon(zone.type)}</div>
            {zone.name}
          </CardTitle>
          <Badge>{zone.type}</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        {zone.description && (
          <p className="text-sm text-gray-500 mb-4">{zone.description}</p>
        )}
        
        {stats && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <Activity size={16} className="mr-1" />
                <span>Average Rating</span>
              </div>
              <Badge variant={getRatingBadgeVariant(stats.averageRating)}>
                {stats.averageRating.toFixed(1)}/5
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <BarChart2 size={16} className="mr-1" />
                <span>Total Feedback</span>
              </div>
              <span className="font-medium">{stats.totalFeedback}</span>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 border-t border-gray-100">
        <div className="flex justify-between items-center w-full text-xs text-gray-500">
          <span>ID: {zone.id}</span>
          {stats && (
            <span>Last updated: Today</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ZoneCard;