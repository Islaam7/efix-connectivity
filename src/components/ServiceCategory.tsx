
import React from 'react';
import { ChevronRight } from 'lucide-react';

export type ServiceCategoryProps = {
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  onClick?: () => void;
};

const ServiceCategory: React.FC<ServiceCategoryProps> = ({ 
  title, 
  icon, 
  description, 
  color, 
  onClick 
}) => {
  return (
    <div 
      className="service-card min-w-[200px] flex flex-col"
      onClick={onClick}
      style={{ borderTopColor: color, borderTopWidth: '4px' }}
    >
      <div className="flex justify-between items-start mb-2">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center" 
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: `${color}15`, color }}>
          Available
        </span>
      </div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex-grow">{description}</p>
      <div className="flex items-center text-efix-primary text-sm font-medium cursor-pointer">
        <span>View Service</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
};

export default ServiceCategory;
