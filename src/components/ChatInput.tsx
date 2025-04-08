
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isWaiting: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isWaiting }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isWaiting) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
      <div className="flex gap-2">
        <Input
          placeholder="Digite sua mensagem aqui..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1"
          disabled={isWaiting}
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={!message.trim() || isWaiting}
          className="bg-medical-primary hover:bg-medical-dark text-white"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
