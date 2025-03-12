
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/lib/theme';
import { toast } from 'sonner';

const Bookings = () => {
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  
  const upcomingBookings = [
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

  const pastBookings = [
    {
      id: '3',
      service: 'Handyman Services',
      professional: 'David Wilson',
      date: 'Oct 5, 2023',
      time: '1:00 PM - 3:00 PM',
      address: '789 Pine St, City',
      status: 'completed',
      image: 'https://randomuser.me/api/portraits/men/2.jpg'
    }
  ];
  
  // تنفيذ إجراءات الأزرار
  const handleViewDetails = (bookingId: string) => {
    // هنا يمكن التنقل إلى صفحة تفاصيل الحجز
    toast.info(`عرض تفاصيل الحجز: ${bookingId}`);
    // navigate(`/bookings/${bookingId}`);
  };
  
  const handleReschedule = (bookingId: string) => {
    toast.info(`جاري إعادة جدولة الحجز: ${bookingId}`, {
      description: "انتقال إلى صفحة إعادة الجدولة"
    });
    // navigate(`/bookings/${bookingId}/reschedule`);
  };
  
  const handleLeaveReview = (bookingId: string) => {
    toast.info(`ترك تقييم للحجز: ${bookingId}`, {
      description: "انتقال إلى صفحة التقييمات"
    });
    // navigate(`/bookings/${bookingId}/review`);
  };
  
  const handleContactAgain = (bookingId: string) => {
    toast.info(`التواصل مجدداً مع مقدم الخدمة للحجز: ${bookingId}`, {
      description: "انتقال إلى صفحة الرسائل"
    });
    // navigate(`/messages/new?bookingId=${bookingId}`);
  };
  
  // تحديد لون الزر بناءً على السمة الحالية
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

  const BookingCard = ({ booking }: { booking: typeof upcomingBookings[0] }) => {
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
    
    return (
      <div className="bg-card text-card-foreground rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 mb-4 border border-border animate-fade-in transform hover:-translate-y-1">
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

        <div className="space-y-3 text-sm mb-4">
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
        </div>

        <div className="flex gap-3 mt-4">
          <Button 
            variant="outline" 
            className="flex-1 rounded-lg hover-lift ripple-button"
            onClick={() => booking.status === 'completed' 
              ? handleContactAgain(booking.id) 
              : handleReschedule(booking.id)
            }
          >
            {booking.status === 'completed' ? 'Contact Again' : 'Reschedule'}
          </Button>
          <Button 
            className={`flex-1 rounded-lg hover-lift ripple-button flex items-center justify-center ${
              getPrimaryButtonClass(booking.status === 'completed' ? 'secondary' : 'primary')
            }`}
            onClick={() => booking.status === 'completed' 
              ? handleLeaveReview(booking.id) 
              : handleViewDetails(booking.id)
            }
          >
            {booking.status === 'completed' ? 'Leave Review' : 'View Details'}
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 theme-aware" data-theme={theme}>
      <Header />
      
      <main className="container mx-auto max-w-lg animate-fade-in">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-5 animate-slide-up">My Bookings</h1>
          
          <div className="mb-6 animate-slide-up" style={{animationDelay: '100ms'}}>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-1.5 h-6 bg-primary rounded-full mr-2 opacity-80"></span>
              Upcoming
            </h2>
            {upcomingBookings.map((booking, index) => (
              <div key={booking.id} className="animate-slide-up" style={{animationDelay: `${(index + 1) * 150}ms`}}>
                <BookingCard booking={booking} />
              </div>
            ))}
          </div>

          <div className="animate-slide-up" style={{animationDelay: '350ms'}}>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-1.5 h-6 bg-muted-foreground rounded-full mr-2 opacity-60"></span>
              Past
            </h2>
            {pastBookings.map((booking, index) => (
              <div key={booking.id} className="animate-slide-up" style={{animationDelay: `${(index + 4) * 150}ms`}}>
                <BookingCard booking={booking} />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Bookings;
