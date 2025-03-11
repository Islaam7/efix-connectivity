
import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { professionals, serviceCategories } from '@/data/mockData';
import ProfessionalCard from './ProfessionalCard';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from './BottomNavigation';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] dark:from-gray-900 dark:to-gray-800 pb-16">
      <div className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto max-w-lg px-4 py-3 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold ml-2">
            {pageTitle}
          </h1>
        </div>
      </div>
      
      <main className="container mx-auto max-w-lg p-4">
        {serviceInfo && (
          <div 
            className="p-4 rounded-xl mb-4 shadow-sm"
            style={{ 
              backgroundColor: `${serviceInfo.color}10`,
              borderLeft: `4px solid ${serviceInfo.color}`
            }}
          >
            <div className="flex items-center">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3" 
                style={{ backgroundColor: `${serviceInfo.color}20` }}
              >
                {serviceInfo.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{serviceInfo.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{serviceInfo.description}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {filteredProfessionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              {...professional}
              onClick={() => navigate(`/professionals/${professional.id}`)}
            />
          ))}

          {filteredProfessionals.length === 0 && (
            <div className="text-center py-10">
              <div className="text-gray-400 dark:text-gray-500 text-5xl mb-4">¯\_(ツ)_/¯</div>
              <h3 className="text-lg font-semibold mb-2">No professionals found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try checking back later or browsing other services
              </p>
            </div>
          )}
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfessionalList;
