import React from 'react';
import { AlertTriangle, BarChart2, Star, MessageCircle, Users, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import StatCard from '../components/dashboard/StatCard';
import BarChart from '../components/dashboard/BarChart';
import LineChart from '../components/dashboard/LineChart';
import Badge from '../components/ui/Badge';
import { mockFeedback, mockAlerts, mockFeedbackStats, mockZoneStats } from '../data/mockData';

const Dashboard: React.FC = () => {
  const totalFeedback = mockFeedback.length;
  const avgRating = parseFloat(mockFeedbackStats.averageRating.toFixed(1));
  const pendingAlerts = mockAlerts.filter(a => a.status !== 'resolved').length;
  
  // Prepare chart data
  const feedbackByRatingData = mockFeedbackStats.feedbackByRating
    .map(item => ({
      name: `${item.rating} Stars`,
      value: item.count,
    }))
    .sort((a, b) => parseInt(a.name) - parseInt(b.name));
  
  const feedbackOverTimeData = mockFeedbackStats.feedbackOverTime.map(item => ({
    name: item.date.split('-').slice(1).join('/'), // Format as MM/DD
    rating: parseFloat(item.averageRating.toFixed(1)),
    count: item.count,
  }));
  
  // Top performing zones
  const topZones = [...mockZoneStats]
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 3);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back to HotelPulse analytics</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Feedback"
          value={totalFeedback}
          icon={<MessageCircle size={20} className="text-primary-600" />}
          trend={{ value: 12, isPositive: true }}
          description="Last 30 days"
        />
        
        <StatCard
          title="Average Rating"
          value={`${avgRating}/5`}
          icon={<Star size={20} className="text-warning-500" />}
          trend={{ value: 4, isPositive: true }}
          description="Last 30 days"
        />
        
        <StatCard
          title="Pending Alerts"
          value={pendingAlerts}
          icon={<AlertTriangle size={20} className="text-error-500" />}
          trend={{ value: 3, isPositive: false }}
          description="Requires attention"
        />
        
        <StatCard
          title="Response Time"
          value="1.4 hrs"
          icon={<Clock size={20} className="text-secondary-600" />}
          trend={{ value: 15, isPositive: true }}
          description="Average time to resolve"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Feedback Ratings Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={feedbackByRatingData}
              dataKey="value"
              barColor="#0D9488"
              height={300}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Feedback Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={feedbackOverTimeData}
              dataKeys={[
                { key: 'rating', color: '#0D9488', name: 'Avg. Rating' },
                { key: 'count', color: '#1E40AF', name: 'Feedback Count' }
              ]}
              xAxisDataKey="name"
              height={300}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Top Performing Zones */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Zones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topZones.map((zone, index) => {
            // Get the badge variant based on ranking
            const badgeVariant = index === 0 ? 'success' : index === 1 ? 'secondary' : 'primary';
            
            return (
              <Card key={zone.zoneId}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium">
                      {mockZoneStats.find(z => z.zoneId === zone.zoneId)?.zoneId ? 
                        mockZoneStats.find(z => z.zoneId === zone.zoneId)?.zoneId : 'Unknown Zone'}
                    </h3>
                    <Badge variant={badgeVariant}>#{index + 1}</Badge>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <Star size={20} className="text-warning-500 fill-warning-500 mr-1" />
                    <span className="text-lg font-semibold">{zone.averageRating.toFixed(1)}/5</span>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Based on {zone.totalFeedback} feedback submissions
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="divide-y divide-gray-200">
            {mockFeedback.slice(0, 5).map((feedback, index) => (
              <div key={index} className="py-4 flex items-start justify-between">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-gray-100 mr-4">
                    <MessageCircle size={16} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      New feedback received for Zone #{feedback.zoneId}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(feedback.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <Badge
                    variant={
                      feedback.rating >= 4
                        ? 'success'
                        : feedback.rating >= 3
                        ? 'warning'
                        : 'error'
                    }
                  >
                    {feedback.rating}/5
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;