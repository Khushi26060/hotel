import React from 'react';
import { useSearchParams } from 'react-router-dom';
import FeedbackForm from '../components/feedback/FeedbackForm';
import { mockZones, mockQRCodes, mockHotels } from '../data/mockData';

const FeedbackFormPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const qrId = searchParams.get('qr');
  const zoneId = searchParams.get('z');
  
  // Find the QR code and zone information
  const qrCode = qrId ? mockQRCodes.find(qr => qr.id === qrId) : undefined;
  const zone = zoneId ? mockZones.find(zone => zone.id === zoneId) : undefined;
  
  // Get hotel information
  const hotel = zone ? mockHotels.find(hotel => hotel.id === zone.hotelId) : mockHotels[0];
  
  // Handle feedback submission
  const handleSubmitFeedback = (data: any) => {
    console.log('Feedback submitted:', data);
    // In a real app, this would send the data to an API
  };
  
  // Get custom questions or use default questions
  const questions = qrCode?.customQuestions || [
    { id: 'default1', text: 'How would you rate your overall experience?', type: 'rating', required: true },
    { id: 'default2', text: 'Would you recommend us to others?', type: 'multiple_choice', options: ['Yes', 'Maybe', 'No'], required: false },
    { id: 'default3', text: 'Any suggestions for improvement?', type: 'text', required: false }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-8 px-4">
      <div className="max-w-lg mx-auto">
        <FeedbackForm
          hotelName={hotel?.name || 'Hotel Pulse'}
          zoneName={zone?.name || 'Our Hotel'}
          questions={questions}
          onSubmit={handleSubmitFeedback}
        />
      </div>
    </div>
  );
};

export default FeedbackFormPage;