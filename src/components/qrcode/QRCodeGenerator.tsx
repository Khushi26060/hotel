import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import QRCodeDisplay from './QRCodeDisplay';
import { Zone } from '../../types';

interface QRCodeGeneratorProps {
  zones: Zone[];
  onSave: (data: { name: string; zoneId: string; }) => void;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ zones, onSave }) => {
  const [name, setName] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [questions, setQuestions] = useState<{ text: string; type: string }[]>([
    { text: '', type: 'rating' }
  ]);
  
  const baseUrl = 'https://hotelpulse.example.com/feedback';
  const qrValue = `${baseUrl}?z=${zoneId}&n=${encodeURIComponent(name)}`;
  
  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', type: 'rating' }]);
  };
  
  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };
  
  const handleQuestionChange = (index: number, field: 'text' | 'type', value: string) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };
  
  const handleSave = () => {
    if (!name || !zoneId) return;
    onSave({ name, zoneId });
  };
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Create QR Code</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Input
            label="QR Code Name"
            placeholder="e.g., Restaurant Feedback"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <Select
            label="Location Zone"
            options={zones.map(zone => ({ value: zone.id, label: zone.name }))}
            value={zoneId}
            onChange={(e) => setZoneId(e.target.value)}
          />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Feedback Questions</h3>
              <Button 
                variant="ghost" 
                size="sm"
                leftIcon={<Plus size={16} />}
                onClick={handleAddQuestion}
              >
                Add Question
              </Button>
            </div>
            
            {questions.map((question, index) => (
              <div key={index} className="space-y-2 p-3 border border-gray-200 rounded-md">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-medium text-gray-500">Question {index + 1}</h4>
                  {questions.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto text-gray-500 hover:text-error-500"
                      onClick={() => handleRemoveQuestion(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
                
                <Input
                  placeholder="Enter your question"
                  value={question.text}
                  onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                />
                
                <Select
                  label="Question Type"
                  options={[
                    { value: 'rating', label: 'Rating (1-5 stars)' },
                    { value: 'multiple_choice', label: 'Multiple Choice' },
                    { value: 'text', label: 'Text Response' }
                  ]}
                  value={question.type}
                  onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                />
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            variant="primary" 
            className="w-full"
            leftIcon={<Save size={16} />}
            onClick={handleSave}
            disabled={!name || !zoneId}
          >
            Save QR Code
          </Button>
        </CardFooter>
      </Card>
      
      <div className="flex items-center justify-center">
        <QRCodeDisplay
          value={qrValue}
          title={name || "Preview QR Code"}
          description={`Scan to provide feedback ${zoneId ? `for ${zones.find(z => z.id === zoneId)?.name || ''}` : ''}`}
        />
      </div>
    </div>
  );
};

export default QRCodeGenerator;