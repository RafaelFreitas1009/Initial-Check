
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Stethoscope, User } from 'lucide-react';

export interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, isUser, timestamp }) => {
  const formattedTime = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);

  return (
    <div className={cn(
      "flex w-full mb-4 gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 ease-out",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="flex items-center justify-center w-8 h-8 rounded-full bg-medical-light border border-medical-primary/20">
          <Stethoscope className="w-4 h-4 text-medical-primary" />
        </Avatar>
      )}
      <div className={cn(
        "max-w-[80%] rounded-xl px-4 py-2",
        isUser 
          ? "bg-medical-primary text-white rounded-tr-none" 
          : "bg-gray-100 text-gray-800 rounded-tl-none"
      )}>
        <div className="flex flex-col gap-1">
          <div className="text-sm">{content}</div>
          <div className={cn(
            "text-xs self-end",
            isUser ? "text-blue-100" : "text-gray-500"
          )}>
            {formattedTime}
          </div>
        </div>
      </div>
      {isUser && (
        <Avatar className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border border-gray-200">
          <User className="w-4 h-4 text-gray-600" />
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
