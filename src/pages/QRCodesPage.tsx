import React, { useState } from 'react';
import { PlusCircle, QrCode, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import QRCodeGenerator from '../components/qrcode/QRCodeGenerator';
import QRCodeDisplay from '../components/qrcode/QRCodeDisplay';
import { mockZones, mockQRCodes } from '../data/mockData';
import { QRCode } from '../types';

const QRCodesPage: React.FC = () => {
  const [showGenerator, setShowGenerator] = useState(false);
  const [qrCodes, setQRCodes] = useState<QRCode[]>(mockQRCodes);
  const [selectedZone, setSelectedZone] = useState<string>('all');
  
  // Filter QR codes by zone
  const filteredQRCodes = selectedZone === 'all'
    ? qrCodes
    : qrCodes.filter(code => code.zoneId === selectedZone);
  
  // Function to get the base URL for feedback
  const getQRCodeUrl = (qrCode: QRCode): string => {
    const baseUrl = 'https://hotelpulse.example.com/feedback';
    return `${baseUrl}?qr=${qrCode.id}&z=${qrCode.zoneId}`;
  };
  
  // Function to get zone name by ID
  const getZoneName = (zoneId: string): string => {
    const zone = mockZones.find(z => z.id === zoneId);
    return zone ? zone.name : 'Unknown Zone';
  };
  
  // Function to handle saving a new QR code
  const handleSaveQRCode = (data: { name: string; zoneId: string }) => {
    const newQRCode: QRCode = {
      id: (qrCodes.length + 1).toString(),
      name: data.name,
      zoneId: data.zoneId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setQRCodes([...qrCodes, newQRCode]);
    setShowGenerator(false);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">QR Code Management</h1>
          <p className="text-gray-500">Generate and manage QR codes for guest feedback</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button
            variant={showGenerator ? 'secondary' : 'primary'}
            leftIcon={showGenerator ? null : <PlusCircle size={16} />}
            onClick={() => setShowGenerator(!showGenerator)}
          >
            {showGenerator ? 'Cancel' : 'Create New QR Code'}
          </Button>
        </div>
      </div>
      
      {/* QR Code Generator */}
      {showGenerator && (
        <div className="mb-8 animate-fade-in">
          <QRCodeGenerator zones={mockZones} onSave={handleSaveQRCode} />
        </div>
      )}
      
      {/* Filter Controls */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center">
              <Filter size={16} className="mr-2 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter QR Codes</span>
            </div>
            
            <div className="w-full md:w-64">
              <Select
                options={[
                  { value: 'all', label: 'All Zones' },
                  ...mockZones.map(zone => ({
                    value: zone.id,
                    label: zone.name
                  }))
                ]}
                value={selectedZone}
                onChange={e => setSelectedZone(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* QR Codes List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <QrCode size={20} className="mr-2 text-primary-600" />
          Your QR Codes
        </h2>
        
        {filteredQRCodes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No QR codes found. Create your first QR code to get started.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQRCodes.map(qrCode => (
              <Card key={qrCode.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-center">{qrCode.name}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex flex-col items-center">
                  <p className="text-sm text-gray-500 mb-4 text-center">
                    {getZoneName(qrCode.zoneId)}
                  </p>
                  
                  <QRCodeDisplay
                    value={getQRCodeUrl(qrCode)}
                    title={qrCode.name}
                    size={150}
                    description={`Created on ${new Date(qrCode.createdAt).toLocaleDateString()}`}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* QR Code Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use Your QR Codes</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              Place your generated QR codes in strategic locations throughout your hotel to collect valuable guest feedback.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-primary-50 rounded-lg">
                <h3 className="font-medium text-primary-800 mb-2">1. Print</h3>
                <p className="text-sm text-gray-600">
                  Download and print your QR codes in high quality.
                </p>
              </div>
              
              <div className="p-4 bg-primary-50 rounded-lg">
                <h3 className="font-medium text-primary-800 mb-2">2. Place</h3>
                <p className="text-sm text-gray-600">
                  Position them in key areas of your hotel.
                </p>
              </div>
              
              <div className="p-4 bg-primary-50 rounded-lg">
                <h3 className="font-medium text-primary-800 mb-2">3. Collect</h3>
                <p className="text-sm text-gray-600">
                  Receive real-time feedback from your guests.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodesPage;