
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'مرحبًا! أنا مساعدك الافتراضي. كيف يمكنني مساعدتك اليوم؟',
    isUser: false,
    timestamp: new Date(),
  },
];

type ChatbotModalProps = {
  onClose: () => void;
};

const ChatbotModal: React.FC<ChatbotModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAutomatedResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getAutomatedResponse = (userInput: string): string => {
    const userInputLower = userInput.toLowerCase();
    
    if (userInputLower.includes('سعر') || userInputLower.includes('تكلفة')) {
      return 'تختلف أسعار الخدمات حسب نوع الخدمة والوقت المطلوب. يمكنك الاطلاع على التفاصيل في صفحة الخدمة المحددة أو التواصل مع الفني مباشرة.';
    } else if (userInputLower.includes('وقت') || userInputLower.includes('متى')) {
      return 'يمكنك حجز موعد في أي وقت من خلال التطبيق، وسيتم تأكيد الموعد من قبل الفني في أقرب وقت ممكن.';
    } else if (userInputLower.includes('مشكلة') || userInputLower.includes('عطل')) {
      return 'لتشخيص المشكلة بشكل أفضل، يرجى زيارة قسم "كشف الأعطال" في الصفحة الرئيسية حيث يمكنك وصف المشكلة ورفع صورة لمساعدتك بشكل أفضل.';
    } else if (userInputLower.includes('شكر') || userInputLower.includes('جزيل')) {
      return 'شكرًا لك! نحن سعداء بخدمتك. هل هناك أي شيء آخر يمكننا المساعدة به؟';
    } else {
      return 'شكرًا على تواصلك! سيقوم أحد الفنيين بالرد عليك قريبًا، أو يمكنك تصفح الخدمات المتاحة لدينا للعثور على ما يناسب احتياجاتك.';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 w-[350px] h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Bot className="w-6 h-6 mr-2" />
          <h3 className="font-semibold">المساعد الافتراضي</h3>
        </div>
        <button onClick={onClose} className="text-white hover:bg-blue-600 p-1 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-blue-500 text-white rounded-tr-none'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-tl-none'
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="اكتب رسالتك هنا..."
          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          dir="rtl"
        />
        <Button
          size="icon"
          variant="ghost"
          className="bg-blue-500 text-white hover:bg-blue-600 rounded-full p-2 flex items-center justify-center"
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatbotModal;
