
import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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

  const handleViewProfile = () => {
    navigate(`/professionals/${id}`);
    // If we don't have the profile page yet, show a toast
    toast.info(`Viewing ${name}'s profile`);
  };

  const handleBookNow = () => {
    if (!available) {
      toast.error(`${name} is currently not available for booking`);
      return;
    }
    
    navigate(`/bookings/new?professionalId=${id}`);
    // If we don't have the booking page yet, show a toast
    toast.success(`Booking initiated with ${name}`);
  };

  return (
    <div 
      className="professional-card flex flex-col"
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{specialty}</p>
          
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
            <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
            <span className="text-sm font-medium">${price}/hr</span>
          </div>
        </div>
        <div>
          <span 
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              available 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {available ? 'Available' : 'Busy'}
          </span>
        </div>
      </div>
      
      <div className="flex space-x-2 mt-4">
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={(e) => {
            e.stopPropagation();
            handleViewProfile();
          }}
        >
          View Profile
        </Button>
        <Button 
          variant={available ? "default" : "secondary"}
          className="flex-1" 
          onClick={(e) => {
            e.stopPropagation();
            handleBookNow();
          }}
          disabled={!available}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default ProfessionalCard;
