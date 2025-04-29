import React from 'react';
import { format } from 'date-fns';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { Alert, Feedback, Zone, User } from '../../types';

interface AlertsListProps {
  alerts: Alert[];
  feedbacks: Feedback[];
  zones: Zone[];
  users: User[];
  onResolve: (alertId: string) => void;
  onAssign: (alertId: string, userId: string) => void;
}

const AlertsList: React.FC<AlertsListProps> = ({
  alerts,
  feedbacks,
  zones,
  users,
  onResolve,
  onAssign,
}) => {
  // Sort alerts by date (newest first) and status (new first, then in_progress, then resolved)
  const sortedAlerts = [...alerts].sort((a, b) => {
    if (a.status !== b.status) {
      if (a.status === 'new') return -1;
      if (b.status === 'new') return 1;
      if (a.status === 'in_progress') return -1;
      if (b.status === 'in_progress') return 1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  // Function to get feedback by ID
  const getFeedback = (feedbackId: string): Feedback | undefined => {
    return feedbacks.find((f) => f.id === feedbackId);
  };
  
  // Function to get zone name by ID
  const getZoneName = (zoneId: string): string => {
    const zone = zones.find((z) => z.id === zoneId);
    return zone ? zone.name : 'Unknown Zone';
  };
  
  // Function to get user by ID
  const getUser = (userId: string | undefined): User | undefined => {
    if (!userId) return undefined;
    return users.find((u) => u.id === userId);
  };
  
  // Function to render alert status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <Badge variant="error" className="flex items-center">
            <AlertTriangle size={12} className="mr-1" />
            New
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="warning" className="flex items-center">
            <Clock size={12} className="mr-1" />
            In Progress
          </Badge>
        );
      case 'resolved':
        return (
          <Badge variant="success" className="flex items-center">
            <CheckCircle size={12} className="mr-1" />
            Resolved
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-4">
      {sortedAlerts.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-500">No alerts available.</p>
          </CardContent>
        </Card>
      ) : (
        sortedAlerts.map((alert) => {
          const feedback = getFeedback(alert.feedbackId);
          const assignedUser = getUser(alert.assignedTo);
          
          return (
            <Card key={alert.id} className="animate-fade-in">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      {renderStatusBadge(alert.status)}
                      <span className="ml-2">
                        {feedback ? `Rating: ${feedback.rating}/5` : 'Low Rating Alert'}
                      </span>
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {getZoneName(alert.zoneId)}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(alert.createdAt), 'MMM d, yyyy • h:mm a')}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {feedback && feedback.comment && (
                  <div className="p-3 bg-gray-50 rounded-md mt-2">
                    <p className="text-gray-700 italic">"{feedback.comment}"</p>
                  </div>
                )}
                
                <div className="mt-4">
                  <h4 className="text-xs font-medium text-gray-500 mb-2">ASSIGNMENT</h4>
                  {assignedUser ? (
                    <div className="flex items-center">
                      <Avatar
                        src={assignedUser.avatarUrl}
                        alt={assignedUser.name}
                        initials={assignedUser.name.split(' ').map(n => n[0]).join('')}
                        size="sm"
                      />
                      <div className="ml-2">
                        <p className="text-sm font-medium">{assignedUser.name}</p>
                        <p className="text-xs text-gray-500">{assignedUser.role}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <select
                        className="input text-sm py-1"
                        onChange={(e) => onAssign(alert.id, e.target.value)}
                        disabled={alert.status === 'resolved'}
                      >
                        <option value="">Assign to staff...</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name} ({user.role})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs text-gray-500">
                    Alert ID: {alert.id}
                  </span>
                  
                  {alert.status !== 'resolved' && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => onResolve(alert.id)}
                    >
                      Mark as Resolved
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default AlertsList;