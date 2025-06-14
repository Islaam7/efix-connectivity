
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (user) {
          navigate('/');
        } else {
          navigate('/auth');
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, loading, navigate]);

  if (!isVisible) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center">
      <div className="text-center animate-pulse">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">eFix</h1>
          <p className="text-xl text-blue-100">Your trusted repair service</p>
        </div>
        
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
