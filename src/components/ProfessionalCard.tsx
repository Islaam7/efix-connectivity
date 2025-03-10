
import React from 'react';
import { Star } from 'lucide-react';

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
  name,
  specialty,
  rating,
  price,
  available,
  image,
  onClick,
}) => {
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
        <button className="flex-1 py-2 text-sm border border-efix-primary text-efix-primary rounded-lg">
          View Profile
        </button>
        <button className="flex-1 py-2 text-sm bg-efix-primary text-white rounded-lg">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ProfessionalCard;
