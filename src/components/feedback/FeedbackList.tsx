import React from 'react';
import { format } from 'date-fns';
import { Star, MessageCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import { Feedback, Zone } from '../../types';

interface FeedbackListProps {
  feedbacks: Feedback[];
  zones: Zone[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks, zones }) => {
  // Sort feedbacks by date (newest first)
  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Function to get zone name by ID
  const getZoneName = (zoneId: string): string => {
    const zone = zones.find((z) => z.id === zoneId);
    return zone ? zone.name : 'Unknown Zone';
  };

  // Function to render rating stars
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating ? 'text-warning-500 fill-warning-500' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}/5</span>
      </div>
    );
  };

  // Function to determine the badge variant based on rating
  const getRatingBadgeVariant = (rating: number) => {
    if (rating >= 4) return 'success';
    if (rating >= 3) return 'warning';
    return 'error';
  };

  return (
    <div className="space-y-4">
      {sortedFeedbacks.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-500">No feedback available.</p>
          </CardContent>
        </Card>
      ) : (
        sortedFeedbacks.map((feedback) => (
          <Card key={feedback.id} className="animate-fade-in">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <Badge variant={getRatingBadgeVariant(feedback.rating)} className="mr-2">
                      Rating: {feedback.rating}
                    </Badge>
                    {getZoneName(feedback.zoneId)}
                  </CardTitle>
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(feedback.createdAt), 'MMM d, yyyy • h:mm a')}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {feedback.comment ? (
                <div className="flex items-start mt-2">
                  <MessageCircle size={18} className="text-gray-400 mt-1 mr-2" />
                  <p className="text-gray-700">{feedback.comment}</p>
                </div>
              ) : (
                <p className="text-gray-500 italic">No comment provided</p>
              )}
            </CardContent>
            
            <CardFooter className="pt-0 border-t border-gray-100">
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  QR Code #{feedback.qrCodeId}
                </div>
                
                <div>
                  {renderRating(feedback.rating)}
                </div>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default FeedbackList;