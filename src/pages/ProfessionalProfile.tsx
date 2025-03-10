
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { professionals } from '@/data/mockData';
import { Star, MapPin, Calendar, Clock, Award, MessageSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ProfessionalProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const professional = professionals.find(p => p.id === id);

  if (!professional) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Professional Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">The professional you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')} variant="default">
          Return Home
        </Button>
      </div>
    );
  }

  const handleBookNow = () => {
    navigate(`/bookings/new?professionalId=${id}`);
    toast.success(`Booking initiated with ${professional.name}`);
  };

  const handleContactProfessional = () => {
    navigate(`/messages`);
    toast.info(`Started conversation with ${professional.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] dark:from-gray-900 dark:to-gray-800 pb-16">
      {/* Custom header for this page */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto max-w-lg px-4 py-3 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-medium ml-2">Professional Profile</h1>
        </div>
      </div>
      
      <main className="container mx-auto max-w-lg">
        {/* Hero Section */}
        <div className="relative">
          <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <div className="absolute top-20 left-4 w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white">
            <img 
              src={professional.image} 
              alt={professional.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="px-4 pt-16 pb-4">
          <h1 className="text-2xl font-bold">{professional.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{professional.specialty}</p>
          
          <div className="flex items-center mt-2">
            <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300 ml-1">{professional.rating.toFixed(1)}</span>
            </div>
            <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">${professional.price}/hr</span>
            <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
            <span 
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                professional.available 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {professional.available ? 'Available' : 'Busy'}
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="px-4 mb-6 flex space-x-2">
          <Button 
            variant="outline" 
            className="flex-1 py-6"
            onClick={handleContactProfessional}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Message
          </Button>
          <Button 
            variant={professional.available ? "default" : "secondary"}
            className="flex-1 py-6"
            onClick={handleBookNow}
            disabled={!professional.available}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Now
          </Button>
        </div>
        
        {/* About Section */}
        <div className="px-4 py-4">
          <h2 className="text-xl font-semibold mb-3">About</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {professional.name} is a professional {professional.specialty.toLowerCase()} with over 5 years of experience. 
            Specializing in quality repairs and exceptional customer service, they have maintained a {professional.rating.toFixed(1)} star rating.
          </p>
          
          <h3 className="font-medium mb-2">Qualifications</h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-blue-500 mr-2" />
              <span>Certified Professional {professional.specialty}</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 text-blue-500 mr-2" />
              <span>5+ Years Experience</span>
            </div>
          </div>
          
          <h3 className="font-medium mb-2">Service Area</h3>
          <div className="flex items-start mb-4">
            <MapPin className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
            <span>Serves up to 20 miles from downtown</span>
          </div>
          
          <h3 className="font-medium mb-2">Availability</h3>
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
            <div>
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 3:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Reviews</h2>
            <button className="text-blue-500 text-sm font-medium">See All</button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-3">
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://randomuser.me/api/portraits/women/12.jpg" 
                    alt="Reviewer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">Sarah Johnson</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Exceptional service! Arrived on time and fixed everything quickly. Very professional and knowledgeable.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://randomuser.me/api/portraits/men/34.jpg" 
                    alt="Reviewer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">Michael Thompson</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500">1 week ago</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Great work at a fair price. Would definitely hire again for future projects.
            </p>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfessionalProfile;
