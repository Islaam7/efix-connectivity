
import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Settings, LogOut, CreditCard, Bell, Shield, HelpCircle, Star } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-efix-background-light dark:bg-efix-background-dark pb-16">
      <Header />
      
      <main className="container mx-auto max-w-lg">
        <div className="p-4">
          <div className="flex flex-col items-center pt-4 pb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="User profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-xl font-bold">John Doe</h1>
            <p className="text-gray-500 dark:text-gray-400">john.doe@example.com</p>
            <button className="mt-3 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg">
              Edit Profile
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold mb-2">Account</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <CreditCard className="w-4 h-4 text-efix-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Payment Methods</h3>
                  </div>
                  <div className="text-gray-400">
                    &rsaquo;
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <Bell className="w-4 h-4 text-efix-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Notifications</h3>
                  </div>
                  <div className="text-gray-400">
                    &rsaquo;
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <Shield className="w-4 h-4 text-efix-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Security</h3>
                  </div>
                  <div className="text-gray-400">
                    &rsaquo;
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold mb-2">Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <Settings className="w-4 h-4 text-efix-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">App Settings</h3>
                  </div>
                  <div className="text-gray-400">
                    &rsaquo;
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <Star className="w-4 h-4 text-efix-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">My Reviews</h3>
                  </div>
                  <div className="text-gray-400">
                    &rsaquo;
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h2 className="font-semibold mb-2">Support</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <HelpCircle className="w-4 h-4 text-efix-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Help Center</h3>
                  </div>
                  <div className="text-gray-400">
                    &rsaquo;
                  </div>
                </div>
                
                <div className="flex items-center text-red-500">
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-3">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Log Out</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
