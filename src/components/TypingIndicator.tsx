
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Stethoscope } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 mb-4">
      <Avatar className="flex items-center justify-center w-8 h-8 rounded-full bg-medical-light border border-medical-primary/20">
        <Stethoscope className="w-4 h-4 text-medical-primary" />
      </Avatar>
      <div className="max-w-[80%] bg-gray-100 rounded-xl rounded-tl-none px-4 py-3 text-gray-800">
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
