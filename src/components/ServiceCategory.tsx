
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '@/lib/theme';

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
  const { theme } = useThemeStore();
  
  const handleClick = () => {
    navigate(`/services/${id}/professionals`);
  };

  // تحديد ألوان الحاشية والظلال بناءً على السمة الحالية
  const getBorderStyle = () => {
    if (theme === 'dark') {
      return { borderLeftColor: color, borderLeftWidth: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)' };
    } else if (theme.includes('purple')) {
      return { borderLeftColor: '#9b87f5', borderLeftWidth: '4px', boxShadow: '0 4px 6px -1px rgba(155, 135, 245, 0.1)' };
    } else if (theme.includes('oceanic')) {
      return { borderLeftColor: '#0EA5E9', borderLeftWidth: '4px', boxShadow: '0 4px 6px -1px rgba(14, 165, 233, 0.1)' };
    } else if (theme.includes('sunset')) {
      return { borderLeftColor: '#F97316', borderLeftWidth: '4px', boxShadow: '0 4px 6px -1px rgba(249, 115, 22, 0.1)' };
    } else {
      return { borderLeftColor: color, borderLeftWidth: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' };
    }
  };

  return (
    <div 
      className="service-card flex bg-card text-card-foreground rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-lg border border-transparent hover:border-primary/10 dark:hover:border-primary/20 cursor-pointer group transform hover:-translate-y-1 theme-aware"
      onClick={onClick || handleClick}
      style={getBorderStyle()}
      data-theme={theme}
    >
      <div 
        className="w-14 h-14 rounded-full flex items-center justify-center mr-4 transition-all group-hover:scale-110 duration-300 hover-glow" 
        style={{ backgroundColor: `${color}20` }}
      >
        <div className="transform transition-transform group-hover:rotate-3">
          {icon}
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1.5">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">{title}</h3>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full transition-colors duration-300" style={{ backgroundColor: `${color}15`, color }}>
            Available
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center text-sm font-medium group-hover:translate-x-1.5 transition-transform duration-300"
            style={{ color }}
          >
            <span>View Professionals</span>
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 duration-300" />
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
