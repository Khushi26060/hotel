import React, { useState } from 'react';
import { Save, Hotel, Bell, Mail, ShieldCheck, Palette } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { mockHotels } from '../data/mockData';

const SettingsPage: React.FC = () => {
  const [hotel, setHotel] = useState(mockHotels[0]);
  const [notificationSettings, setNotificationSettings] = useState({
    lowRatingThreshold: '3',
    notifyViaEmail: true,
    notifyViaApp: true,
    dailyDigest: true
  });
  
  const [apiSettings, setApiSettings] = useState({
    apiKey: 'sk_test_4eC39HqLyjWDarjtT1zdp7dc',
    webhookUrl: 'https://example.com/webhook'
  });
  
  // Handle hotel information update
  const handleHotelUpdate = () => {
    // In a real app, this would save to the server
    alert('Hotel information updated successfully!');
  };
  
  // Handle notification settings update
  const handleNotificationUpdate = () => {
    alert('Notification settings updated successfully!');
  };
  
  // Handle API settings update
  const handleApiUpdate = () => {
    alert('API settings updated successfully!');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Configure your HotelPulse account and preferences</p>
      </div>
      
      {/* Hotel Information */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Hotel size={20} className="mr-2 text-primary-600" />
            Hotel Information
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Input
            label="Hotel Name"
            value={hotel.name}
            onChange={e => setHotel({ ...hotel, name: e.target.value })}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Address"
              value={hotel.address}
              onChange={e => setHotel({ ...hotel, address: e.target.value })}
            />
            
            <Input
              label="City"
              value={hotel.city}
              onChange={e => setHotel({ ...hotel, city: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Country"
              value={hotel.country}
              onChange={e => setHotel({ ...hotel, country: e.target.value })}
            />
            
            <Input
              label="Phone"
              value={hotel.phone}
              onChange={e => setHotel({ ...hotel, phone: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              value={hotel.email}
              onChange={e => setHotel({ ...hotel, email: e.target.value })}
            />
            
            <Input
              label="Website"
              value={hotel.website || ''}
              onChange={e => setHotel({ ...hotel, website: e.target.value })}
            />
          </div>
          
          <Input
            label="Logo URL"
            value={hotel.logoUrl || ''}
            onChange={e => setHotel({ ...hotel, logoUrl: e.target.value })}
          />
        </CardContent>
        
        <CardFooter>
          <Button
            variant="primary"
            leftIcon={<Save size={16} />}
            onClick={handleHotelUpdate}
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
      
      {/* Notification Settings */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell size={20} className="mr-2 text-primary-600" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Select
            label="Low Rating Threshold"
            options={[
              { value: '1', label: '1 Star or below' },
              { value: '2', label: '2 Stars or below' },
              { value: '3', label: '3 Stars or below' }
            ]}
            value={notificationSettings.lowRatingThreshold}
            onChange={e => setNotificationSettings({ ...notificationSettings, lowRatingThreshold: e.target.value })}
          />
          
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                checked={notificationSettings.notifyViaEmail}
                onChange={e => setNotificationSettings({ ...notificationSettings, notifyViaEmail: e.target.checked })}
              />
              <span className="text-sm font-medium text-gray-700">
                Notify me via email for new feedback alerts
              </span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                checked={notificationSettings.notifyViaApp}
                onChange={e => setNotificationSettings({ ...notificationSettings, notifyViaApp: e.target.checked })}
              />
              <span className="text-sm font-medium text-gray-700">
                Notify me in-app for new feedback alerts
              </span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                checked={notificationSettings.dailyDigest}
                onChange={e => setNotificationSettings({ ...notificationSettings, dailyDigest: e.target.checked })}
              />
              <span className="text-sm font-medium text-gray-700">
                Send me a daily digest of all feedback
              </span>
            </label>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button
            variant="primary"
            leftIcon={<Save size={16} />}
            onClick={handleNotificationUpdate}
          >
            Save Notification Settings
          </Button>
        </CardFooter>
      </Card>
      
      {/* API Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail size={20} className="mr-2 text-primary-600" />
              Integration Settings
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Input
              label="API Key"
              type="password"
              value={apiSettings.apiKey}
              onChange={e => setApiSettings({ ...apiSettings, apiKey: e.target.value })}
            />
            
            <Input
              label="Webhook URL"
              value={apiSettings.webhookUrl}
              onChange={e => setApiSettings({ ...apiSettings, webhookUrl: e.target.value })}
            />
            
            <p className="text-sm text-gray-500">
              Use these credentials to integrate HotelPulse with your existing systems.
            </p>
          </CardContent>
          
          <CardFooter>
            <Button
              variant="primary"
              leftIcon={<Save size={16} />}
              onClick={handleApiUpdate}
            >
              Save API Settings
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldCheck size={20} className="mr-2 text-primary-600" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={true}
                />
                <span className="text-sm font-medium text-gray-700">
                  Enable two-factor authentication
                </span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={true}
                />
                <span className="text-sm font-medium text-gray-700">
                  Encrypt all feedback data
                </span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={false}
                />
                <span className="text-sm font-medium text-gray-700">
                  Allow anonymous feedback
                </span>
              </label>
            </div>
            
            <Button
              variant="outline"
              size="sm"
            >
              View Privacy Policy
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;