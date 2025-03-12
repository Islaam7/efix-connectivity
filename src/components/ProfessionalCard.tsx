
import React from 'react';
import { Star, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useThemeStore } from '@/lib/theme';

export type ProfessionalProps = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  price: number;
  available: boolean;
  image: string;
  onClick?: () => void;
};

const ProfessionalCard: React.FC<ProfessionalProps> = ({
  id,
  name,
  specialty,
  rating,
  price,
  available,
  image,
  onClick,
}) => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();

  const handleViewProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/professionals/${id}`);
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!available) {
      toast.error(`${name} is currently not available for booking`, {
        position: 'top-center',
        style: {
          borderRadius: '8px',
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          border: '1px solid var(--border)'
        }
      });
      return;
    }
    
    navigate(`/bookings/new?professionalId=${id}`);
  };
  
  // تحديد لون الزر بناءً على السمة
  const getButtonClass = () => {
    if (!available) return 'bg-muted text-muted-foreground';
    
    if (theme === 'dark') return 'bg-primary hover:bg-primary/90';
    
    if (theme.startsWith('dark-')) {
      switch(theme) {
        case 'dark-blue': return 'button-gradient-dark-blue';
        case 'dark-emerald': return 'button-gradient-dark-emerald';
        case 'dark-rose': return 'button-gradient-dark-rose';
        default: return 'bg-primary';
      }
    } else {
      switch(theme) {
        case 'purple': return 'button-gradient-purple';
        case 'oceanic': return 'button-gradient-oceanic';
        case 'sunset': return 'button-gradient-sunset';
        default: return 'bg-primary';
      }
    }
  };
  
  // تحديد أسلوب حالة التوفر
  const getAvailabilityStyle = () => {
    if (available) {
      return theme.startsWith('dark') 
        ? 'bg-green-900/30 text-green-300'
        : 'bg-green-100 text-green-800';
    } else {
      return theme.startsWith('dark')
        ? 'bg-gray-800 text-gray-300' 
        : 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div 
      className="professional-card bg-card text-card-foreground rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-border hover:border-primary/20 transform hover:-translate-y-1 theme-aware"
      onClick={onClick}
      data-theme={theme}
    >
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg mb-0.5">{name}</h3>
            <span 
              className={`text-xs font-medium px-3 py-1 rounded-full ${getAvailabilityStyle()}`}
            >
              {available ? 'Available' : 'Busy'}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">{specialty}</p>
          
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1.5 text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
            <span className="mx-2 text-muted-foreground/40">•</span>
            <span className="text-sm font-medium">${price}/hr</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1 bg-card hover:bg-accent rounded-lg hover-lift" 
          onClick={handleViewProfile}
        >
          View Profile
        </Button>
        <Button 
          className={`flex-1 rounded-lg hover-lift group ${getButtonClass()}`}
          onClick={handleBookNow}
          disabled={!available}
        >
          Book Now
          <ArrowRight className="w-4 h-4 ml-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
        </Button>
      </div>
    </div>
  );
};

export default ProfessionalCard;
