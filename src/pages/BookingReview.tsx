
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/lib/theme';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import BottomNavigation from '@/components/BottomNavigation';

// Mock data
const bookingsData = [
  {
    id: '1',
    service: 'Plumbing Repair',
    professional: 'John Smith',
    date: 'Oct 15, 2023',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    service: 'Electrical Inspection',
    professional: 'Sarah Johnson',
    date: 'Oct 18, 2023',
    image: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: '3',
    service: 'Handyman Services',
    professional: 'David Wilson',
    date: 'Oct 5, 2023',
    image: 'https://randomuser.me/api/portraits/men/2.jpg'
  }
];

const BookingReview = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  
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
  
  // Theme-specific star colors
  const getStarColors = () => {
    let activeColor = 'text-yellow-400';
    let hoverColor = 'text-yellow-300';
    
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue': 
          activeColor = 'text-blue-400';
          hoverColor = 'text-blue-300';
          break;
        case 'dark-emerald': 
          activeColor = 'text-emerald-400';
          hoverColor = 'text-emerald-300';
          break;
        case 'dark-rose': 
          activeColor = 'text-rose-400';
          hoverColor = 'text-rose-300';
          break;
      }
    } else if (theme !== 'light' && theme !== 'dark') {
      switch(theme) {
        case 'purple': 
          activeColor = 'text-purple-500';
          hoverColor = 'text-purple-400';
          break;
        case 'oceanic': 
          activeColor = 'text-cyan-500';
          hoverColor = 'text-cyan-400';
          break;
        case 'sunset': 
          activeColor = 'text-orange-500';
          hoverColor = 'text-orange-400';
          break;
      }
    }
    
    return { activeColor, hoverColor };
  };
  
  const { activeColor, hoverColor } = getStarColors();
  
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
  
  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error('Please rate your experience');
      return;
    }
    
    toast.success('Review submitted successfully', {
      description: 'Thank you for your feedback!'
    });
    
    // In a real app, this would make an API call to submit the review
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
            <h1 className="text-xl font-semibold">Leave a Review</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto max-w-lg">
        <div className="p-4">
          <div className="bg-card shadow-sm rounded-xl overflow-hidden border border-border mb-6">
            <div className="p-4">
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
                  <p className="text-sm text-muted-foreground">By {booking.professional}</p>
                  <p className="text-xs text-muted-foreground">{booking.date}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Rate your experience</h2>
            <div className="flex justify-center space-x-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-2xl transition-colors ${
                    (hoverRating || rating) >= star
                      ? hoverRating >= star ? hoverColor : activeColor
                      : 'text-gray-300'
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star className="w-8 h-8" fill="currentColor" />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mb-4">
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
              {rating === 0 && 'Tap to rate'}
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Write a review</h2>
            <Textarea 
              placeholder="Share your experience with this service..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          
          <Button 
            onClick={handleSubmitReview}
            disabled={rating === 0}
            className={`w-full ${getPrimaryButtonClass()} rounded-lg`}
          >
            Submit Review
          </Button>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default BookingReview;
