import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary-600 rounded flex items-center justify-center">
                <span className="text-white font-bold">HP</span>
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">HotelPulse</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-center text-sm text-gray-500 md:text-right">
              &copy; {new Date().getFullYear()} HotelPulse. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center md:justify-start space-x-6">
          <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-700">
            Terms of Service
          </Link>
          <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-700">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;