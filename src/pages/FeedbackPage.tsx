import React, { useState } from 'react';
import { Filter, MessageSquare, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import FeedbackList from '../components/feedback/FeedbackList';
import AlertsList from '../components/alerts/AlertsList';
import { mockFeedback, mockZones, mockAlerts, mockUsers } from '../data/mockData';
import { Alert } from '../types';

const FeedbackPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feedback' | 'alerts'>('feedback');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  
  // Filter feedback based on selected filters
  const filteredFeedback = mockFeedback.filter(feedback => {
    if (zoneFilter !== 'all' && feedback.zoneId !== zoneFilter) return false;
    if (ratingFilter !== 'all' && feedback.rating !== parseInt(ratingFilter)) return false;
    return true;
  });
  
  // Function to mark an alert as resolved
  const handleResolveAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved', resolvedAt: new Date().toISOString() } 
        : alert
    ));
  };
  
  // Function to assign an alert to a staff member
  const handleAssignAlert = (alertId: string, userId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, assignedTo: userId, status: 'in_progress' } 
        : alert
    ));
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Guest Feedback</h1>
        <p className="text-gray-500">Review and analyze guest feedback and alerts</p>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-4 px-6 text-sm font-medium flex items-center ${
            activeTab === 'feedback'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('feedback')}
        >
          <MessageSquare size={16} className="mr-2" />
          All Feedback
          <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs">
            {mockFeedback.length}
          </span>
        </button>
        
        <button
          className={`py-4 px-6 text-sm font-medium flex items-center ${
            activeTab === 'alerts'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('alerts')}
        >
          <AlertTriangle size={16} className="mr-2" />
          Alerts
          <span className="ml-2 bg-error-100 text-error-600 rounded-full px-2 py-0.5 text-xs">
            {alerts.filter(a => a.status !== 'resolved').length}
          </span>
        </button>
      </div>
      
      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center">
              <Filter size={16} className="mr-2 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <Select
                options={[
                  { value: 'all', label: 'All Zones' },
                  ...mockZones.map(zone => ({
                    value: zone.id,
                    label: zone.name
                  }))
                ]}
                value={zoneFilter}
                onChange={e => setZoneFilter(e.target.value)}
              />
              
              {activeTab === 'feedback' && (
                <Select
                  options={[
                    { value: 'all', label: 'All Ratings' },
                    { value: '5', label: '5 Stars' },
                    { value: '4', label: '4 Stars' },
                    { value: '3', label: '3 Stars' },
                    { value: '2', label: '2 Stars' },
                    { value: '1', label: '1 Star' }
                  ]}
                  value={ratingFilter}
                  onChange={e => setRatingFilter(e.target.value)}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Feedback List or Alerts List */}
      {activeTab === 'feedback' ? (
        <FeedbackList feedbacks={filteredFeedback} zones={mockZones} />
      ) : (
        <AlertsList
          alerts={alerts}
          feedbacks={mockFeedback}
          zones={mockZones}
          users={mockUsers}
          onResolve={handleResolveAlert}
          onAssign={handleAssignAlert}
        />
      )}
    </div>
  );
};

export default FeedbackPage;