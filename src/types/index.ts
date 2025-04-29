export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  avatarUrl?: string;
}

export interface Hotel {
  id: string;
  name: string;
  logoUrl?: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
}

export interface Zone {
  id: string;
  hotelId: string;
  name: string;
  description?: string;
  type: 'restaurant' | 'room' | 'lobby' | 'pool' | 'spa' | 'gym' | 'other';
}

export interface QRCode {
  id: string;
  zoneId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  customQuestions?: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: 'rating' | 'multiple_choice' | 'text';
  options?: string[];
  required: boolean;
}

export interface Feedback {
  id: string;
  qrCodeId: string;
  zoneId: string;
  hotelId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  responses?: {
    questionId: string;
    answer: string | number;
  }[];
}

export interface Alert {
  id: string;
  feedbackId: string;
  hotelId: string;
  zoneId: string;
  status: 'new' | 'in_progress' | 'resolved';
  assignedTo?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface FeedbackStats {
  hotelId: string;
  zoneId?: string;
  averageRating: number;
  totalFeedback: number;
  feedbackByRating: {
    rating: number;
    count: number;
  }[];
  feedbackOverTime: {
    date: string;
    averageRating: number;
    count: number;
  }[];
}