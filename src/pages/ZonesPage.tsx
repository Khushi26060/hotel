import React, { useState } from 'react';
import { Plus, MapPin, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import ZoneCard from '../components/zones/ZoneCard';
import { mockZones, mockZoneStats } from '../data/mockData';
import { Zone } from '../types';

const ZonesPage: React.FC = () => {
  const [zones, setZones] = useState<Zone[]>(mockZones.filter(zone => zone.hotelId === '1'));
  const [showAddZone, setShowAddZone] = useState(false);
  const [newZone, setNewZone] = useState<Partial<Zone>>({
    name: '',
    description: '',
    type: 'restaurant',
    hotelId: '1'
  });
  
  // Function to handle adding a new zone
  const handleAddZone = () => {
    if (!newZone.name) return;
    
    const zone: Zone = {
      id: (zones.length + 1).toString(),
      hotelId: '1',
      name: newZone.name,
      description: newZone.description,
      type: newZone.type as Zone['type']
    };
    
    setZones([...zones, zone]);
    setShowAddZone(false);
    setNewZone({
      name: '',
      description: '',
      type: 'restaurant',
      hotelId: '1'
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hotel Zones</h1>
          <p className="text-gray-500">Manage and monitor different areas of your hotel</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button
            variant={showAddZone ? 'secondary' : 'primary'}
            leftIcon={showAddZone ? null : <Plus size={16} />}
            onClick={() => setShowAddZone(!showAddZone)}
          >
            {showAddZone ? 'Cancel' : 'Add New Zone'}
          </Button>
        </div>
      </div>
      
      {/* Add Zone Form */}
      {showAddZone && (
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle>Add New Zone</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Input
              label="Zone Name"
              placeholder="e.g., Main Restaurant"
              value={newZone.name}
              onChange={e => setNewZone({ ...newZone, name: e.target.value })}
            />
            
            <Input
              label="Description (Optional)"
              placeholder="e.g., Fine dining restaurant on the first floor"
              value={newZone.description}
              onChange={e => setNewZone({ ...newZone, description: e.target.value })}
            />
            
            <Select
              label="Zone Type"
              options={[
                { value: 'restaurant', label: 'Restaurant' },
                { value: 'room', label: 'Room' },
                { value: 'lobby', label: 'Lobby' },
                { value: 'pool', label: 'Swimming Pool' },
                { value: 'spa', label: 'Spa' },
                { value: 'gym', label: 'Gym' },
                { value: 'other', label: 'Other' }
              ]}
              value={newZone.type}
              onChange={e => setNewZone({ ...newZone, type: e.target.value })}
            />
          </CardContent>
          
          <CardFooter>
            <Button
              variant="primary"
              className="w-full"
              leftIcon={<Check size={16} />}
              onClick={handleAddZone}
              disabled={!newZone.name}
            >
              Save Zone
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map(zone => (
          <ZoneCard
            key={zone.id}
            zone={zone}
            stats={mockZoneStats.find(stats => stats.zoneId === zone.id)}
            onClick={() => {
              /* Handle zone click, e.g., navigate to zone details */
            }}
          />
        ))}
      </div>
      
      {/* Zone Management Tips */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin size={20} className="mr-2 text-primary-600" />
            Zone Management Tips
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              Properly defined zones help you collect more targeted feedback and improve specific areas of your hotel.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Strategic Zone Placement</h3>
                <p className="text-sm text-gray-600">
                  Define zones based on guest journey touchpoints to capture feedback at key moments of the experience.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Regular Analysis</h3>
                <p className="text-sm text-gray-600">
                  Review zone performance weekly to identify trends and implement timely improvements.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZonesPage;