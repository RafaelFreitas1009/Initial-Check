
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuickReplyProps {
  options: string[];
  onSelect: (option: string) => void;
}

const QuickReply: React.FC<QuickReplyProps> = ({ options, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 my-3 animate-in fade-in slide-in-from-bottom-5 duration-300 ease-out">
      {options.map((option, index) => (
        <Button
          key={index}
          variant="outline"
          className={cn(
            "border-medical-primary/50 text-medical-primary hover:bg-medical-light hover:text-medical-primary",
            "transition-all duration-300"
          )}
          onClick={() => onSelect(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default QuickReply;
