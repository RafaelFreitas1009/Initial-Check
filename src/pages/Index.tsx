
import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import TypingIndicator from '@/components/TypingIndicator';
import QuickReply from '@/components/QuickReply';
import { Card } from '@/components/ui/card';
import { 
  welcomeMessages, 
  commonQuestions,
  getSymptomByName,
  getSpecialtyForSymptom,
  symptoms
} from '@/data/medicalData';
import { useToast } from '@/hooks/use-toast';

export interface ChatMessageType {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentSymptom, setCurrentSymptom] = useState<string | null>(null);
  const [followUpIndex, setFollowUpIndex] = useState(0);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [conversationEnded, setConversationEnded] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initial welcome message
  useEffect(() => {
    setTimeout(() => {
      sendBotMessage(welcomeMessages[0]);
      
      setTimeout(() => {
        sendBotMessage(welcomeMessages[1]);
      }, 1500);
    }, 1000);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendBotMessage = (content: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now().toString(), 
          content, 
          isUser: false, 
          timestamp: new Date() 
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage = { 
      id: Date.now().toString(), 
      content, 
      isUser: true, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setShowQuickReplies(false);
    
    // Process the message
    setTimeout(() => {
      processUserMessage(content);
    }, 500);
  };

  const handleQuickReplySelect = (option: string) => {
    handleSendMessage(option);
  };

  const processUserMessage = (content: string) => {
    // Check if this is the first symptom message
    if (!currentSymptom) {
      const detectedSymptom = getSymptomByName(content);
      
      if (detectedSymptom) {
        setCurrentSymptom(detectedSymptom.id);
        sendBotMessage(`Entendi que você está com ${detectedSymptom.name.toLowerCase()}.`);
        
        // Ask first follow-up question
        setTimeout(() => {
          sendBotMessage(detectedSymptom.followUpQuestions[0]);
          setFollowUpIndex(1);
        }, 1500);
      } else {
        // Couldn't identify the symptom
        sendBotMessage("Não consegui identificar exatamente qual é o seu sintoma. Poderia descrever melhor o que está sentindo?");
      }
    } 
    // If we're in follow-up questions phase
    else if (followUpIndex > 0) {
      const symptom = symptoms.find(s => s.id === currentSymptom);
      if (symptom) {
        // If there are more follow-up questions
        if (followUpIndex < symptom.followUpQuestions.length) {
          sendBotMessage(symptom.followUpQuestions[followUpIndex]);
          setFollowUpIndex(followUpIndex + 1);
        } 
        // End of follow-up questions
        else {
          // Get recommendation
          const specialty = getSpecialtyForSymptom(currentSymptom);
          
          if (specialty) {
            const urgencyText = specialty.urgencyLevel === 'emergency' 
              ? "com urgência" 
              : specialty.urgencyLevel === 'priority' 
                ? "o mais breve possível" 
                : "quando for conveniente";
            
            sendBotMessage(`Com base nas suas respostas, recomendamos que você procure um médico de ${specialty.name} ${urgencyText}.`);
            
            setTimeout(() => {
              sendBotMessage(`${specialty.description} Este profissional é o mais indicado para tratar dos sintomas que você descreveu.`);
              
              setConversationEnded(true);
              
              // Show restart option
              setTimeout(() => {
                sendBotMessage("Deseja iniciar uma nova consulta ou tem outras dúvidas?");
                setCurrentSymptom(null);
                setFollowUpIndex(0);
                setShowQuickReplies(true);
              }, 2000);
            }, 2000);
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 container max-w-3xl mx-auto p-4 overflow-hidden flex flex-col">
        <Card className="flex-1 overflow-hidden flex flex-col shadow-md">
          <div className="bg-gradient-to-r from-medical-primary to-medical-accent p-4 text-white">
            <h2 className="text-lg font-medium">Atendimento Inicial</h2>
            <p className="text-sm opacity-90">
              Conte-me seus sintomas para que eu possa te orientar melhor
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  content={msg.content}
                  isUser={msg.isUser}
                  timestamp={msg.timestamp}
                />
              ))}
              
              {isTyping && <TypingIndicator />}
              
              {showQuickReplies && messages.length >= 2 && !isTyping && (
                <QuickReply 
                  options={commonQuestions} 
                  onSelect={handleQuickReplySelect} 
                />
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isWaiting={isTyping} 
          />
        </Card>
        
        {conversationEnded && (
          <div className="mt-4 text-sm text-center text-gray-500">
            <p>
              Essa é uma simulação. Em caso de emergência real, ligue para 192 (SAMU) ou dirija-se a uma unidade de emergência.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
