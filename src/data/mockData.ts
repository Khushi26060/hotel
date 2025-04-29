import { User, Hotel, Zone, QRCode, Feedback, Alert, FeedbackStats } from '../types';
import { subDays, format } from 'date-fns';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane.smith@grandhotel.com',
    role: 'admin',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'John Davis',
    email: 'john.davis@grandhotel.com',
    role: 'manager',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'Emily Wilson',
    email: 'emily.wilson@grandhotel.com',
    role: 'staff',
    avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
];

// Mock Hotels
export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Hotel & Spa',
    logoUrl: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=150',
    address: '123 Luxury Lane',
    city: 'San Francisco',
    country: 'USA',
    phone: '+1 (415) 555-1234',
    email: 'info@grandhotel.com',
    website: 'https://www.grandhotel.com'
  },
  {
    id: '2',
    name: 'Oceanview Resort',
    logoUrl: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=150',
    address: '456 Seaside Blvd',
    city: 'Miami',
    country: 'USA',
    phone: '+1 (305) 555-5678',
    email: 'info@oceanviewresort.com',
    website: 'https://www.oceanviewresort.com'
  }
];

// Mock Zones
export const mockZones: Zone[] = [
  { id: '1', hotelId: '1', name: 'Main Restaurant', description: 'Fine dining experience', type: 'restaurant' },
  { id: '2', hotelId: '1', name: 'Lobby', description: 'Main entrance and reception', type: 'lobby' },
  { id: '3', hotelId: '1', name: 'Swimming Pool', description: 'Outdoor infinity pool', type: 'pool' },
  { id: '4', hotelId: '1', name: 'Deluxe Rooms', description: 'Floors 3-5', type: 'room' },
  { id: '5', hotelId: '1', name: 'Wellness Spa', description: 'Relaxation and treatments', type: 'spa' },
  { id: '6', hotelId: '2', name: 'Beachfront Restaurant', description: 'Casual dining with ocean view', type: 'restaurant' },
  { id: '7', hotelId: '2', name: 'Lobby', description: 'Main entrance and reception', type: 'lobby' },
  { id: '8', hotelId: '2', name: 'Beach Pool', description: 'Beachside infinity pool', type: 'pool' }
];

// Mock QR Codes
export const mockQRCodes: QRCode[] = [
  {
    id: '1',
    zoneId: '1',
    name: 'Restaurant Table Cards',
    createdAt: '2025-03-10T10:00:00Z',
    updatedAt: '2025-03-10T10:00:00Z',
    customQuestions: [
      { id: '1', text: 'How would you rate your dining experience?', type: 'rating', required: true },
      { id: '2', text: 'How was the service?', type: 'rating', required: true },
      { id: '3', text: 'Would you recommend our restaurant to others?', type: 'multiple_choice', options: ['Yes', 'Maybe', 'No'], required: false },
      { id: '4', text: 'Any suggestions for improvement?', type: 'text', required: false }
    ]
  },
  {
    id: '2',
    zoneId: '2',
    name: 'Lobby Welcome Desk',
    createdAt: '2025-03-11T14:30:00Z',
    updatedAt: '2025-03-11T14:30:00Z',
    customQuestions: [
      { id: '5', text: 'How was your check-in experience?', type: 'rating', required: true },
      { id: '6', text: 'Were our staff helpful?', type: 'rating', required: true },
      { id: '7', text: 'Any comments about our lobby facilities?', type: 'text', required: false }
    ]
  },
  {
    id: '3',
    zoneId: '3',
    name: 'Pool Area',
    createdAt: '2025-03-12T09:15:00Z',
    updatedAt: '2025-03-12T09:15:00Z',
    customQuestions: [
      { id: '8', text: 'How would you rate the cleanliness of our pool?', type: 'rating', required: true },
      { id: '9', text: 'How was the service from our pool staff?', type: 'rating', required: true },
      { id: '10', text: 'Any suggestions for our pool area?', type: 'text', required: false }
    ]
  }
];

// Generate mock feedback data
const generateMockFeedback = (): Feedback[] => {
  const feedback: Feedback[] = [];
  const zones = ['1', '2', '3'];
  const qrCodes = ['1', '2', '3'];
  
  for (let i = 1; i <= 100; i++) {
    const zoneIndex = Math.floor(Math.random() * zones.length);
    const zoneId = zones[zoneIndex];
    const qrCodeId = qrCodes[zoneIndex];
    const rating = Math.floor(Math.random() * 5) + 1;
    const daysAgo = Math.floor(Math.random() * 30);
    const date = subDays(new Date(), daysAgo);
    
    feedback.push({
      id: i.toString(),
      qrCodeId,
      zoneId,
      hotelId: '1',
      rating,
      comment: rating < 4 ? 'Could use some improvement' : 'Excellent service!',
      createdAt: date.toISOString(),
      responses: [
        { questionId: (zoneIndex * 3 + 1).toString(), answer: rating },
        { questionId: (zoneIndex * 3 + 2).toString(), answer: Math.floor(Math.random() * 5) + 1 }
      ]
    });
  }
  
  return feedback;
};

export const mockFeedback: Feedback[] = generateMockFeedback();

// Generate mock alerts based on low ratings
export const mockAlerts: Alert[] = mockFeedback
  .filter(feedback => feedback.rating <= 2)
  .map((feedback, index) => ({
    id: (index + 1).toString(),
    feedbackId: feedback.id,
    hotelId: feedback.hotelId,
    zoneId: feedback.zoneId,
    status: Math.random() > 0.6 ? 'resolved' : Math.random() > 0.5 ? 'in_progress' : 'new',
    assignedTo: Math.random() > 0.5 ? '3' : undefined,
    createdAt: feedback.createdAt,
    resolvedAt: Math.random() > 0.6 ? new Date().toISOString() : undefined
  }));

// Generate mock statistics
export const mockFeedbackStats: FeedbackStats = {
  hotelId: '1',
  averageRating: 4.2,
  totalFeedback: mockFeedback.length,
  feedbackByRating: [
    { rating: 5, count: mockFeedback.filter(f => f.rating === 5).length },
    { rating: 4, count: mockFeedback.filter(f => f.rating === 4).length },
    { rating: 3, count: mockFeedback.filter(f => f.rating === 3).length },
    { rating: 2, count: mockFeedback.filter(f => f.rating === 2).length },
    { rating: 1, count: mockFeedback.filter(f => f.rating === 1).length }
  ],
  feedbackOverTime: Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayFeedback = mockFeedback.filter(
      f => format(new Date(f.createdAt), 'yyyy-MM-dd') === dateStr
    );
    
    return {
      date: dateStr,
      averageRating: dayFeedback.length ? 
        dayFeedback.reduce((sum, f) => sum + f.rating, 0) / dayFeedback.length : 
        0,
      count: dayFeedback.length
    };
  }).reverse()
};

// Generate mock stats by zone
export const mockZoneStats: FeedbackStats[] = mockZones
  .filter(zone => zone.hotelId === '1')
  .map(zone => {
    const zoneFeedback = mockFeedback.filter(f => f.zoneId === zone.id);
    
    return {
      hotelId: '1',
      zoneId: zone.id,
      averageRating: zoneFeedback.length ? 
        zoneFeedback.reduce((sum, f) => sum + f.rating, 0) / zoneFeedback.length : 
        0,
      totalFeedback: zoneFeedback.length,
      feedbackByRating: [
        { rating: 5, count: zoneFeedback.filter(f => f.rating === 5).length },
        { rating: 4, count: zoneFeedback.filter(f => f.rating === 4).length },
        { rating: 3, count: zoneFeedback.filter(f => f.rating === 3).length },
        { rating: 2, count: zoneFeedback.filter(f => f.rating === 2).length },
        { rating: 1, count: zoneFeedback.filter(f => f.rating === 1).length }
      ],
      feedbackOverTime: Array.from({ length: 7 }, (_, i) => {
        const date = subDays(new Date(), i);
        const dateStr = format(date, 'yyyy-MM-dd');
        const dayFeedback = zoneFeedback.filter(
          f => format(new Date(f.createdAt), 'yyyy-MM-dd') === dateStr
        );
        
        return {
          date: dateStr,
          averageRating: dayFeedback.length ? 
            dayFeedback.reduce((sum, f) => sum + f.rating, 0) / dayFeedback.length : 
            0,
          count: dayFeedback.length
        };
      }).reverse()
    };
  });