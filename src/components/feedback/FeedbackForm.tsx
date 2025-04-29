import React, { useState } from 'react';
import { Star, Send, ThumbsUp } from 'lucide-react';
import Button from '../ui/Button';
import { Question } from '../../types';

interface FeedbackFormProps {
  hotelName: string;
  zoneName: string;
  questions: Question[];
  onSubmit: (data: any) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  hotelName,
  zoneName,
  questions,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [responses, setResponses] = useState<Record<string, any>>({
    rating: 0,
    comment: '',
    questionResponses: {},
  });
  
  const handleRatingChange = (rating: number) => {
    setResponses({
      ...responses,
      rating,
    });
  };
  
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponses({
      ...responses,
      comment: e.target.value,
    });
  };
  
  const handleQuestionResponse = (questionId: string, answer: any) => {
    setResponses({
      ...responses,
      questionResponses: {
        ...responses.questionResponses,
        [questionId]: answer,
      },
    });
  };
  
  const handleNextStep = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleSubmit = () => {
    onSubmit(responses);
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <div className="text-center py-12 px-4 animate-fade-in">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-success-100 mb-6">
          <ThumbsUp className="h-12 w-12 text-success-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Your Feedback!</h2>
        <p className="text-gray-600 mb-8">
          Your feedback helps us improve our services at {hotelName}.
        </p>
        <p className="text-sm text-gray-500">
          You've earned 50 loyalty points for sharing your experience.
        </p>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto p-4 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">{hotelName}</h1>
        <p className="text-gray-600">{zoneName} Feedback</p>
      </div>
      
      {currentStep === 0 ? (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              How was your experience?
            </h2>
            
            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`p-2 rounded-full transition-all duration-200 ${
                    responses.rating >= star
                      ? 'text-warning-500 transform scale-110'
                      : 'text-gray-300 hover:text-warning-400'
                  }`}
                  onClick={() => handleRatingChange(star)}
                >
                  <Star
                    size={32}
                    className={responses.rating >= star ? 'fill-warning-500' : ''}
                  />
                </button>
              ))}
            </div>
            
            <p className="text-sm text-gray-500 mb-6">
              {responses.rating === 0
                ? 'Tap a star to rate'
                : responses.rating === 5
                ? 'Excellent!'
                : responses.rating === 4
                ? 'Very Good!'
                : responses.rating === 3
                ? 'Good'
                : responses.rating === 2
                ? 'Fair'
                : 'Poor'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments (Optional)
            </label>
            <textarea
              className="input min-h-[100px] w-full"
              placeholder="Tell us more about your experience..."
              value={responses.comment}
              onChange={handleCommentChange}
            />
          </div>
          
          <Button
            variant="primary"
            className="w-full"
            onClick={handleNextStep}
            disabled={responses.rating === 0}
            rightIcon={<Send size={16} />}
          >
            {questions.length > 0 ? 'Continue' : 'Submit Feedback'}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium text-gray-700">
              Question {currentStep} of {questions.length}
            </h2>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / questions.length) * 100)}% Complete
            </span>
          </div>
          
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${(currentStep / questions.length) * 100}%` }}
            />
          </div>
          
          <div className="py-4">
            {currentStep <= questions.length ? (
              <div className="space-y-4">
                <p className="font-medium">{questions[currentStep - 1].text}</p>
                
                {questions[currentStep - 1].type === 'rating' && (
                  <div className="flex justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`p-1 rounded-full transition-colors ${
                          (responses.questionResponses[questions[currentStep - 1].id] || 0) >= star
                            ? 'text-warning-500'
                            : 'text-gray-300 hover:text-warning-400'
                        }`}
                        onClick={() => handleQuestionResponse(questions[currentStep - 1].id, star)}
                      >
                        <Star
                          size={24}
                          className={
                            (responses.questionResponses[questions[currentStep - 1].id] || 0) >= star
                              ? 'fill-warning-500'
                              : ''
                          }
                        />
                      </button>
                    ))}
                  </div>
                )}
                
                {questions[currentStep - 1].type === 'multiple_choice' && (
                  <div className="space-y-2">
                    {questions[currentStep - 1].options?.map((option, index) => (
                      <div
                        key={index}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${
                          responses.questionResponses[questions[currentStep - 1].id] === option
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                        onClick={() => handleQuestionResponse(questions[currentStep - 1].id, option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
                
                {questions[currentStep - 1].type === 'text' && (
                  <textarea
                    className="input min-h-[100px] w-full"
                    placeholder="Your answer..."
                    value={responses.questionResponses[questions[currentStep - 1].id] || ''}
                    onChange={(e) =>
                      handleQuestionResponse(questions[currentStep - 1].id, e.target.value)
                    }
                  />
                )}
              </div>
            ) : null}
          </div>
          
          <Button
            variant="primary"
            className="w-full"
            onClick={handleNextStep}
            disabled={
              questions[currentStep - 1].required &&
              !responses.questionResponses[questions[currentStep - 1].id]
            }
            rightIcon={currentStep < questions.length ? undefined : <Send size={16} />}
          >
            {currentStep < questions.length ? 'Next Question' : 'Submit Feedback'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;