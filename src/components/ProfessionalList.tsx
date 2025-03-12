
import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { professionals, serviceCategories } from '@/data/mockData';
import ProfessionalCard from './ProfessionalCard';
import { ArrowLeft, User2, Info } from 'lucide-react';
import { useThemeStore } from '@/lib/theme';

type ProfessionalListProps = {
  serviceId?: string;
  showAllProfessionals?: boolean;
  title?: string;
};

const ProfessionalList: React.FC<ProfessionalListProps> = ({
  showAllProfessionals = false,
  title = 'All Professionals'
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const serviceId = params.serviceId;
  const { theme } = useThemeStore();
  
  // Get service info if we have a serviceId
  const serviceInfo = serviceId 
    ? serviceCategories.find(s => s.id === serviceId)
    : null;

  // Filter professionals by service if needed
  const filteredProfessionals = serviceId
    ? professionals.filter(p => p.serviceId === serviceId)
    : professionals;

  const pageTitle = serviceInfo 
    ? `${serviceInfo.title} Professionals` 
    : title;
    
  // تحديد لون الخلفية للبطاقة بناءً على السمة ولون الخدمة
  const getServiceCardStyle = () => {
    if (!serviceInfo) return {};
    
    const baseColor = serviceInfo.color;
    
    if (theme === 'dark') {
      return { 
        backgroundColor: `${baseColor}15`,
        borderLeft: `4px solid ${baseColor}`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      };
    } else if (theme.includes('purple')) {
      return { 
        backgroundColor: '#9b87f515',
        borderLeft: `4px solid #9b87f5`,
        boxShadow: '0 4px 6px -1px rgba(155, 135, 245, 0.1)'
      };
    } else if (theme.includes('oceanic')) {
      return { 
        backgroundColor: '#0EA5E915',
        borderLeft: `4px solid #0EA5E9`,
        boxShadow: '0 4px 6px -1px rgba(14, 165, 233, 0.1)'
      };
    } else if (theme.includes('sunset')) {
      return { 
        backgroundColor: '#F9731615',
        borderLeft: `4px solid #F97316`,
        boxShadow: '0 4px 6px -1px rgba(249, 115, 22, 0.1)'
      };
    } else {
      return { 
        backgroundColor: `${baseColor}10`,
        borderLeft: `4px solid ${baseColor}`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      };
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground theme-aware" data-theme={theme}>
      <div className="bg-card shadow-sm">
        <div className="container mx-auto max-w-lg px-4 py-3 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="rounded-full p-2 hover:bg-accent transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold ml-3">
            {pageTitle}
          </h1>
        </div>
      </div>
      
      <main className="container mx-auto max-w-lg p-4 animate-fade-in">
        {serviceInfo && (
          <div 
            className="p-5 rounded-xl mb-5 shadow-sm animate-slide-up"
            style={getServiceCardStyle()}
          >
            <div className="flex items-center">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all hover:scale-105" 
                style={{ backgroundColor: `${serviceInfo.color}20` }}
              >
                {serviceInfo.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{serviceInfo.title}</h3>
                <p className="text-sm text-muted-foreground">{serviceInfo.description}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {filteredProfessionals.map((professional, index) => (
            <div key={professional.id} className="animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
              <ProfessionalCard
                {...professional}
                onClick={() => navigate(`/professionals/${professional.id}`)}
              />
            </div>
          ))}

          {filteredProfessionals.length === 0 && (
            <div className="text-center py-10 animate-fade-in">
              <div className="flex justify-center mb-5">
                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
                  <User2 className="w-10 h-10 text-muted-foreground/60" />
                </div>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border inline-block">
                <div className="flex items-center justify-center mb-4">
                  <Info className="text-primary mr-2" size={20} />
                  <h3 className="text-lg font-semibold">No professionals found</h3>
                </div>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  We couldn't find any professionals for this service category. Try checking back later or browsing other services.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfessionalList;
