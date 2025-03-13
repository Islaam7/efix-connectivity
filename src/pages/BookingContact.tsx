
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, Image, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/lib/theme';
import { Input } from '@/components/ui/input';
import BottomNavigation from '@/components/BottomNavigation';

// Mock data
const bookingsData = [
  {
    id: '1',
    service: 'Plumbing Repair',
    professional: 'John Smith',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    service: 'Electrical Inspection',
    professional: 'Sarah Johnson',
    image: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: '3',
    service: 'Handyman Services',
    professional: 'David Wilson',
    image: 'https://randomuser.me/api/portraits/men/2.jpg'
  }
];

// Mock conversation
const initialMessages = [
  {
    id: 1,
    sender: 'professional',
    text: 'Hello! I see you have a booking with us. How can I help you?',
    time: '10:30 AM'
  }
];

const BookingContact = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  
  // Find the booking data
  const booking = bookingsData.find(b => b.id === bookingId);
  
  if (!booking) {
    // Handle case when booking is not found
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Booking Not Found</h1>
          <p className="mb-4">The booking you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/bookings')}>
            Return to Bookings
          </Button>
        </div>
      </div>
    );
  }
  
  // Get theme-specific message bubble styles
  const getMessageStyles = (isUser: boolean) => {
    // Default styles
    let bgClass = isUser 
      ? 'bg-primary text-primary-foreground' 
      : 'bg-muted text-foreground';
    
    if (theme.startsWith('dark-')) {
      if (isUser) {
        switch(theme) {
          case 'dark-blue': 
            bgClass = 'bg-blue-600 text-white';
            break;
          case 'dark-emerald': 
            bgClass = 'bg-emerald-600 text-white';
            break;
          case 'dark-rose': 
            bgClass = 'bg-rose-600 text-white';
            break;
        }
      }
    } else if (theme !== 'light' && theme !== 'dark') {
      if (isUser) {
        switch(theme) {
          case 'purple': 
            bgClass = 'bg-purple-600 text-white';
            break;
          case 'oceanic': 
            bgClass = 'bg-cyan-600 text-white';
            break;
          case 'sunset': 
            bgClass = 'bg-orange-600 text-white';
            break;
        }
      }
    }
    
    return bgClass;
  };
  
  // Theme-specific send button color
  const getSendButtonClass = () => {
    if (theme === 'dark') {
      return 'bg-primary text-primary-foreground hover:bg-primary/90';
    }
    
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue': return 'bg-blue-600 text-white hover:bg-blue-700';
        case 'dark-emerald': return 'bg-emerald-600 text-white hover:bg-emerald-700';
        case 'dark-rose': return 'bg-rose-600 text-white hover:bg-rose-700';
        default: return 'bg-primary text-primary-foreground hover:bg-primary/90';
      }
    } else {
      switch(theme) {
        case 'purple': return 'bg-purple-600 text-white hover:bg-purple-700';
        case 'oceanic': return 'bg-cyan-600 text-white hover:bg-cyan-700';
        case 'sunset': return 'bg-orange-600 text-white hover:bg-orange-700';
        default: return 'bg-primary text-primary-foreground hover:bg-primary/90';
      }
    }
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newUserMessage]);
    setMessage('');
    
    // Simulate professional response after a delay
    setTimeout(() => {
      const professionalResponses = [
        "I'll check that information for you right away.",
        "Thank you for reaching out. I'll get back to you shortly.",
        "Let me see what I can do to help with that.",
        "I understand your concern. Let me look into this for you."
      ];
      
      const randomResponse = professionalResponses[Math.floor(Math.random() * professionalResponses.length)];
      
      const newProfessionalMessage = {
        id: messages.length + 2,
        sender: 'professional',
        text: randomResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prevMessages => [...prevMessages, newProfessionalMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 theme-aware" data-theme={theme}>
      <header className="bg-card p-4 border-b border-border sticky top-0 z-10">
        <div className="container mx-auto max-w-lg">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(`/bookings/${bookingId}`)}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img 
                  src={booking.image} 
                  alt={booking.professional} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-base">{booking.professional}</h3>
                <p className="text-xs text-muted-foreground">{booking.service}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto max-w-lg flex flex-col h-[calc(100vh-64px-64px)]">
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender !== 'user' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                    <img 
                      src={booking.image} 
                      alt={booking.professional} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className={`max-w-[75%] px-4 py-2 rounded-lg ${getMessageStyles(msg.sender === 'user')}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-1">
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-border bg-card sticky bottom-16 z-10">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Image className="h-5 w-5" />
            </Button>
            <Input 
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button variant="ghost" size="icon" className="rounded-full">
              <Smile className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              className={`rounded-full ${getSendButtonClass()}`}
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default BookingContact;
