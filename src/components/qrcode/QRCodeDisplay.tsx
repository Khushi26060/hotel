import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Download, Share2 } from 'lucide-react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  title: string;
  description?: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 200,
  title,
  description,
}) => {
  // Function to download QR code as SVG
  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code')?.querySelector('svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}-qrcode.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  // Function to copy QR code URL to clipboard
  const shareQRCode = () => {
    navigator.clipboard.writeText(value)
      .then(() => alert('URL copied to clipboard!'))
      .catch((err) => console.error('Could not copy URL: ', err));
  };
  
  return (
    <Card className="max-w-xs mx-auto">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        {description && (
          <p className="text-sm text-gray-500 text-center">{description}</p>
        )}
      </CardHeader>
      
      <CardContent className="flex justify-center pb-0" id="qr-code">
        <div className="p-4 bg-white rounded-lg">
          <QRCodeSVG
            value={value}
            size={size}
            level="H" // High error correction
            includeMargin={true}
            bgColor="#FFFFFF"
            fgColor="#000000"
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-4">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download size={16} />}
          onClick={downloadQRCode}
        >
          Download
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Share2 size={16} />}
          onClick={shareQRCode}
        >
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QRCodeDisplay;