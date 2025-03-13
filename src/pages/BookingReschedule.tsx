
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, ChevronRight } from 'lucide-react';
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
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    service: 'Electrical Inspection',
    professional: 'Sarah Johnson',
    date: 'Oct 18, 2023',
    time: '2:00 PM - 4:00 PM',
    address: '456 Oak Ave, City',
    status: 'pending',
    image: 'https://randomuser.me/api/portraits/women/1.jpg'
  }
];

// Available dates and time slots
const availableDates = [
  { date: 'October 16, 2023', day: 'Monday' },
  { date: 'October 17, 2023', day: 'Tuesday' },
  { date: 'October 18, 2023', day: 'Wednesday' },
  { date: 'October 19, 2023', day: 'Thursday' },
  { date: 'October 20, 2023', day: 'Friday' }
];

const timeSlots = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '1:00 PM - 3:00 PM',
  '3:00 PM - 5:00 PM',
  '5:00 PM - 7:00 PM'
];

const BookingReschedule = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
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
  
  // Theme-specific primary button class
  const getPrimaryButtonClass = () => {
    if (theme === 'dark') {
      return 'bg-primary hover:bg-primary/90 text-primary-foreground';
    }
    
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue': return 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white';
        case 'dark-emerald': return 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white';
        case 'dark-rose': return 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white';
        default: return 'bg-primary hover:bg-primary/90 text-primary-foreground';
      }
    } else {
      switch(theme) {
        case 'purple': return 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white';
        case 'oceanic': return 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white';
        case 'sunset': return 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white';
        default: return 'bg-primary hover:bg-primary/90 text-primary-foreground';
      }
    }
  };
  
  const handleReschedule = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select both a date and time');
      return;
    }
    
    toast.success('Appointment rescheduled successfully', {
      description: `Your appointment has been rescheduled to ${selectedDate} at ${selectedTime}`
    });
    
    // In a real app, this would make an API call to reschedule
    setTimeout(() => navigate('/bookings'), 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 theme-aware" data-theme={theme}>
      <header className="bg-card p-4 border-b border-border">
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
            <h1 className="text-xl font-semibold">Reschedule Appointment</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto max-w-lg">
        <div className="p-4">
          <div className="bg-card shadow-sm rounded-xl overflow-hidden border border-border mb-6">
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src={booking.image} 
                    alt={booking.professional} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{booking.service}</h3>
                  <p className="text-sm text-muted-foreground">{booking.professional}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center text-sm mb-2">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <span>Current Date: </span>
                <span className="ml-1 font-medium">{booking.date}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <span>Current Time: </span>
                <span className="ml-1 font-medium">{booking.time}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Select New Date</h2>
            <div className="grid grid-cols-1 gap-2">
              {availableDates.map((dateObj, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(dateObj.date)}
                  className={`p-3 rounded-lg border ${
                    selectedDate === dateObj.date 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  } text-left transition-colors`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{dateObj.date}</p>
                      <p className="text-sm text-muted-foreground">{dateObj.day}</p>
                    </div>
                    {selectedDate === dateObj.date && (
                      <ChevronRight className="text-primary h-5 w-5" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Select New Time</h2>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border ${
                    selectedTime === time 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  } text-center transition-colors`}
                >
                  <p className="font-medium">{time}</p>
                </button>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handleReschedule}
            disabled={!selectedDate || !selectedTime}
            className={`w-full ${getPrimaryButtonClass()} rounded-lg`}
          >
            Confirm Reschedule
          </Button>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default BookingReschedule;
