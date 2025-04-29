import React, { useState } from 'react';
import { UserPlus, Mail, Phone, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { mockUsers } from '../data/mockData';
import { User } from '../types';

const TeamPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'staff'
  });
  
  // Function to handle adding a new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    
    const user: User = {
      id: (users.length + 1).toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as User['role']
    };
    
    setUsers([...users, user]);
    setShowAddUser(false);
    setNewUser({
      name: '',
      email: '',
      role: 'staff'
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-500">Manage staff access and permissions</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button
            variant={showAddUser ? 'secondary' : 'primary'}
            leftIcon={showAddUser ? null : <UserPlus size={16} />}
            onClick={() => setShowAddUser(!showAddUser)}
          >
            {showAddUser ? 'Cancel' : 'Add New User'}
          </Button>
        </div>
      </div>
      
      {/* Add User Form */}
      {showAddUser && (
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle>Add New Team Member</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g., John Smith"
              value={newUser.name}
              onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            />
            
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g., john.smith@example.com"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            />
            
            <Select
              label="Role"
              options={[
                { value: 'admin', label: 'Administrator' },
                { value: 'manager', label: 'Manager' },
                { value: 'staff', label: 'Staff Member' }
              ]}
              value={newUser.role}
              onChange={e => setNewUser({ ...newUser, role: e.target.value as User['role'] })}
            />
          </CardContent>
          
          <CardFooter>
            <Button
              variant="primary"
              className="w-full"
              onClick={handleAddUser}
              disabled={!newUser.name || !newUser.email}
            >
              Add Team Member
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-0">
              <div className="flex flex-col items-center">
                <Avatar
                  src={user.avatarUrl}
                  alt={user.name}
                  initials={user.name.split(' ').map(n => n[0]).join('')}
                  size="xl"
                  status="online"
                />
                <CardTitle className="mt-4 text-center">{user.name}</CardTitle>
                <Badge
                  variant={
                    user.role === 'admin'
                      ? 'secondary'
                      : user.role === 'manager'
                      ? 'primary'
                      : 'success'
                  }
                  className="mt-2"
                >
                  {user.role === 'admin'
                    ? 'Administrator'
                    : user.role === 'manager'
                    ? 'Manager'
                    : 'Staff Member'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="text-center pt-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Mail size={14} className="mr-2" />
                  {user.email}
                </div>
                
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Phone size={14} className="mr-2" />
                  {user.phone || '+1 (555) 123-4567'}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center pt-0">
              <Button
                variant="outline"
                size="sm"
              >
                Edit Permissions
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Role Permissions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users size={20} className="mr-2 text-primary-600" />
            Role Permissions
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Permission</th>
                  <th className="px-6 py-3 text-center">Administrator</th>
                  <th className="px-6 py-3 text-center">Manager</th>
                  <th className="px-6 py-3 text-center">Staff Member</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">View Dashboard</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">✓</td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">Manage QR Codes</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">View Feedback</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">✓</td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">Manage Zones</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">Manage Team</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">System Settings</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">Handle Alerts</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">✓</td>
                  <td className="px-6 py-4 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamPage;