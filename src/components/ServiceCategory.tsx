
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
  
  const handleViewService = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/services/${id}/professionals`);
  };

  return (
    <div 
      className="service-card min-w-[200px] flex flex-col bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm transition-all duration-200 hover:shadow-md border border-transparent hover:border-blue-100 dark:hover:border-gray-700"
      onClick={onClick || handleViewService}
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
      <div 
        className="flex items-center text-sm font-medium cursor-pointer"
        style={{ color }}
        onClick={handleViewService}
      >
        <span>View Service</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
};

export default ServiceCategory;
