
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

  const handleViewProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/professionals/${id}`);
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!available) {
      toast.error(`${name} is currently not available for booking`);
      return;
    }
    
    navigate(`/bookings/new?professionalId=${id}`);
  };

  return (
    <div 
      className="professional-card bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-100 dark:hover:border-gray-700"
      onClick={onClick}
    >
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-100 dark:border-blue-900">
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
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {available ? 'Available' : 'Busy'}
          </span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          className="flex-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700" 
          onClick={handleViewProfile}
        >
          View Profile
        </Button>
        <Button 
          variant={available ? "default" : "secondary"}
          className={`flex-1 ${available ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : ''}`}
          onClick={handleBookNow}
          disabled={!available}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default ProfessionalCard;
