
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, MessageCircle, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/lib/theme';
import { toast } from 'sonner';
import BottomNavigation from '@/components/BottomNavigation';

// Mock data (in real app, this would come from an API)
const bookingsData = [
  {
    id: '1',
    service: 'Plumbing Repair',
    professional: 'John Smith',
    date: 'Oct 15, 2023',
    time: '10:00 AM - 12:00 PM',
    address: '123 Main St, City',
    status: 'confirmed',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    description: 'Fixing a leaking sink pipe and replacing faucet in the kitchen.',
    phone: '+1 (555) 123-4567',
    price: '$85',
    services: ['Pipe repair', 'Faucet replacement', 'Water pressure check']
  },
  {
    id: '2',
    service: 'Electrical Inspection',
    professional: 'Sarah Johnson',
    date: 'Oct 18, 2023',
    time: '2:00 PM - 4:00 PM',
    address: '456 Oak Ave, City',
    status: 'pending',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    description: 'Full electrical inspection for safety compliance and outlet testing.',
    phone: '+1 (555) 987-6543',
    price: '$120',
    services: ['Circuit inspection', 'Outlet testing', 'Safety compliance check']
  },
  {
    id: '3',
    service: 'Handyman Services',
    professional: 'David Wilson',
    date: 'Oct 5, 2023',
    time: '1:00 PM - 3:00 PM',
    address: '789 Pine St, City',
    status: 'completed',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: 'Multiple small repairs including door alignment, shelf installation, and window fixes.',
    phone: '+1 (555) 456-7890',
    price: '$95',
    services: ['Door repair', 'Shelf installation', 'Window maintenance']
  }
];

const BookingDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  
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
  
  // Get status-specific color classes
  const getStatusClasses = (status: string) => {
    const baseClasses = "text-xs font-medium px-3 py-1.5 rounded-full";
    
    switch(status) {
      case 'confirmed': 
        return `${baseClasses} ${theme === 'light' || theme === 'dark' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : theme.startsWith('dark-') ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'}`;
      case 'pending':
        return `${baseClasses} ${theme === 'light' || theme === 'dark' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : theme.startsWith('dark-') ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`;
      case 'completed':
        return `${baseClasses} ${theme === 'light' || theme === 'dark' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : theme.startsWith('dark-') ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'}`;
      default:
        return baseClasses;
    }
  };
  
  // Theme-specific primary button class
  const getPrimaryButtonClass = (action = 'primary') => {
    if (theme === 'dark') {
      return action === 'primary' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground';
    }
    
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue': return action === 'primary' ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white' : 'bg-blue-700 hover:bg-blue-800 text-white';
        case 'dark-emerald': return action === 'primary' ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white' : 'bg-emerald-700 hover:bg-emerald-800 text-white';
        case 'dark-rose': return action === 'primary' ? 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white' : 'bg-rose-700 hover:bg-rose-800 text-white';
        default: return 'bg-primary hover:bg-primary/90 text-primary-foreground';
      }
    } else {
      switch(theme) {
        case 'purple': return action === 'primary' ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white';
        case 'oceanic': return action === 'primary' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white';
        case 'sunset': return action === 'primary' ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white' : 'bg-orange-600 hover:bg-orange-700 text-white';
        default: return 'bg-primary hover:bg-primary/90 text-primary-foreground';
      }
    }
  };
  
  const handleReschedule = () => {
    navigate(`/bookings/${bookingId}/reschedule`);
  };
  
  const handleContactProfessional = () => {
    navigate(`/bookings/${bookingId}/contact`);
  };
  
  const handleCancelBooking = () => {
    toast.info('Booking cancellation requested', {
      description: 'A confirmation will be sent to your email.'
    });
    // In a real app, this would make an API call to cancel the booking
    setTimeout(() => navigate('/bookings'), 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 theme-aware" data-theme={theme}>
      <header className="bg-card p-4 border-b border-border">
        <div className="container mx-auto max-w-lg">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/bookings')}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Booking Details</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto max-w-lg">
        <div className="p-4">
          <div className="bg-card shadow-md rounded-xl overflow-hidden border border-border mb-6">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-primary/20">
                    <img 
                      src={booking.image} 
                      alt={booking.professional} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-0.5">{booking.service}</h3>
                    <p className="text-sm text-muted-foreground">{booking.professional}</p>
                  </div>
                </div>
                <div>
                  <span className={getStatusClasses(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 text-sm border-b border-border pb-4 mb-4">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-3 text-primary" />
                  {booking.date}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-4 h-4 mr-3 text-primary" />
                  {booking.time}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-3 text-primary" />
                  {booking.address}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <User className="w-4 h-4 mr-3 text-primary" />
                  {booking.professional}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-4 h-4 mr-3 text-primary" />
                  {booking.phone}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{booking.description}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Services</h4>
                <div className="flex flex-wrap gap-2">
                  {booking.services.map((service, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-accent text-accent-foreground px-2.5 py-1 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-border pt-4">
                <span className="font-semibold">Total Price</span>
                <span className="text-xl font-bold text-primary">{booking.price}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {booking.status !== 'completed' && (
              <>
                <Button 
                  onClick={handleReschedule}
                  className={`w-full ${getPrimaryButtonClass()} rounded-lg`}
                >
                  Reschedule Appointment
                </Button>
                
                <Button 
                  onClick={handleContactProfessional} 
                  variant="outline" 
                  className="w-full rounded-lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> 
                  Contact Professional
                </Button>
                
                {booking.status !== 'pending' && (
                  <Button 
                    onClick={handleCancelBooking} 
                    variant="outline" 
                    className="w-full text-destructive hover:text-destructive rounded-lg"
                  >
                    Cancel Booking
                  </Button>
                )}
              </>
            )}
            
            {booking.status === 'completed' && (
              <>
                <Button 
                  onClick={() => navigate(`/bookings/${bookingId}/review`)}
                  className={`w-full ${getPrimaryButtonClass()} rounded-lg`}
                >
                  Leave a Review
                </Button>
                
                <Button 
                  onClick={handleContactProfessional} 
                  variant="outline" 
                  className="w-full rounded-lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> 
                  Contact Again
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default BookingDetails;
