import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, BarChart2, QrCode, Settings, Users, Hotel, CheckCircle } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { mockUsers, mockAlerts, mockFeedback, mockZones } from '../../data/mockData';
import { format } from 'date-fns';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const currentUser = mockUsers[0]; // For demo, use the first user
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleNotifications = () => setShowNotifications(!showNotifications);
  
  // Get recent notifications (combine alerts and recent feedback)
  const recentNotifications = [
    ...mockAlerts
      .filter(alert => alert.status === 'new')
      .map(alert => ({
        id: `alert-${alert.id}`,
        type: 'alert',
        title: 'New Low Rating Alert',
        message: `A guest gave a low rating in ${mockZones.find(z => z.id === alert.zoneId)?.name}`,
        time: new Date(alert.createdAt),
        read: false
      })),
    ...mockFeedback
      .slice(0, 3)
      .map(feedback => ({
        id: `feedback-${feedback.id}`,
        type: 'feedback',
        title: 'New Feedback Received',
        message: `${feedback.rating}/5 stars for ${mockZones.find(z => z.id === feedback.zoneId)?.name}`,
        time: new Date(feedback.createdAt),
        read: true
      }))
  ].sort((a, b) => b.time.getTime() - a.time.getTime());
  
  const unreadCount = recentNotifications.filter(n => !n.read).length;
  
  const navigation = [
    { name: 'Dashboard', path: '/', icon: BarChart2 },
    { name: 'QR Codes', path: '/qr-codes', icon: QrCode },
    { name: 'Feedback', path: '/feedback', icon: Bell },
    { name: 'Zones', path: '/zones', icon: Hotel },
    { name: 'Team', path: '/team', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-primary-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold">HP</span>
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">HotelPulse</span>
              </div>
            </Link>
            
            <nav className="hidden md:ml-8 md:flex md:space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                      location.pathname === item.path
                        ? 'border-primary-500 text-primary-700'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } transition-colors`}
                  >
                    <Icon className="mr-1" size={16} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* User profile, notifications */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <button 
                className="p-1 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
                onClick={toggleNotifications}
              >
                <span className="sr-only">View notifications</span>
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white"></span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    <div className="mt-2 divide-y divide-gray-100">
                      {recentNotifications.length === 0 ? (
                        <p className="py-4 text-sm text-gray-500 text-center">
                          No new notifications
                        </p>
                      ) : (
                        recentNotifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`py-3 ${notification.read ? '' : 'bg-primary-50'}`}
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 pt-0.5">
                                {notification.type === 'alert' ? (
                                  <span className="text-error-500">
                                    <Bell size={16} />
                                  </span>
                                ) : (
                                  <span className="text-success-500">
                                    <CheckCircle size={16} />
                                  </span>
                                )}
                              </div>
                              <div className="ml-3 w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  {notification.message}
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                  {format(notification.time, 'MMM d, h:mm a')}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {recentNotifications.length > 0 && (
                      <div className="mt-4">
                        <Link
                          to="/feedback"
                          className="text-sm font-medium text-primary-600 hover:text-primary-500"
                          onClick={() => setShowNotifications(false)}
                        >
                          View all notifications
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="ml-4 flex items-center">
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-900">{currentUser.name}</div>
                    <div className="text-xs text-gray-500 flex items-center space-x-1">
                      <Badge variant="secondary">{currentUser.role}</Badge>
                    </div>
                  </div>
                  <Avatar
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    initials={currentUser.name.split(' ').map(n => n[0]).join('')}
                    size="md"
                    status="online"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 border-t border-gray-200">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-base font-medium ${
                    location.pathname === item.path
                      ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700'
                      : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="mr-4" size={20} />
                  {item.name}
                </Link>
              );
            })}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Avatar
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  initials={currentUser.name.split(' ').map(n => n[0]).join('')}
                  size="md"
                  status="online"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{currentUser.name}</div>
                <div className="text-sm font-medium text-gray-500">{currentUser.email}</div>
              </div>
              <div className="ml-auto">
                <button 
                  className="p-1 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none"
                  onClick={toggleNotifications}
                >
                  <span className="sr-only">View notifications</span>
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white"></span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;