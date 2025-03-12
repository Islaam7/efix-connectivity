
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type ServiceCategoryProps = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  onClick?: () => void;
};

const ServiceCategory: React.FC<ServiceCategoryProps> = ({ 
  id,
  title, 
  icon, 
  description, 
  color, 
  onClick 
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/services/${id}/professionals`);
  };

  return (
    <div 
      className="service-card flex bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm transition-all duration-200 hover:shadow-md border border-transparent hover:border-blue-100 dark:hover:border-gray-700 cursor-pointer group"
      onClick={onClick || handleClick}
      style={{ borderLeftColor: color, borderLeftWidth: '4px' }}
    >
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-transform group-hover:scale-105 duration-200" 
        style={{ backgroundColor: `${color}20` }}
      >
        {icon}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-lg">{title}</h3>
          <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: `${color}15`, color }}>
            Available
          </span>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-200"
            style={{ color }}
          >
            <span>View Professionals</span>
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 duration-200" />
          </div>
          
          <div className="text-sm font-medium">
            $25-$75/hr
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCategory;
