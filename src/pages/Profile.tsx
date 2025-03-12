
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Settings, LogOut, CreditCard, Bell, Shield, HelpCircle, Star, Moon, Sun, Award, Gift, CheckCircle, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useThemeStore, ThemeColor } from '@/lib/theme';

const Profile = () => {
  const { theme, setTheme } = useThemeStore();

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeColor || 'light';
    setTheme(savedTheme);
  }, [setTheme]);

  const handleLogout = () => {
    toast.info('Logged out successfully');
  };

  const themeOptions: { value: ThemeColor; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light Mode', icon: <Sun className="w-4 h-4" /> },
    { value: 'dark', label: 'Dark Mode', icon: <Moon className="w-4 h-4" /> },
    { value: 'purple', label: 'Purple Theme', icon: <div className="w-4 h-4 rounded-full bg-purple-500" /> },
    { value: 'oceanic', label: 'Oceanic Theme', icon: <div className="w-4 h-4 rounded-full bg-blue-500" /> },
    { value: 'sunset', label: 'Sunset Theme', icon: <div className="w-4 h-4 rounded-full bg-orange-500" /> },
  ];

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
            <div className="flex items-center mt-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full px-4 py-2 flex items-center shadow-md">
                <span className="text-white font-semibold mr-2">120</span>
                <span className="text-yellow-300">⚡</span>
              </div>
              <span className="ml-2 text-sm text-gray-500">Reward Points</span>
            </div>
            <Button variant="outline" className="mt-3">
              Edit Profile
            </Button>
          </div>

          {/* Points information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-4">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-500" />
                Reward Points System
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Earn points by completing these tasks and redeem them for discounts on services.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Complete your profile (20 points)</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Book your first service (50 points)</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Leave a review after service (30 points)</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Refer a friend (100 points)</span>
                </div>
              </div>
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
                <div className="flex items-center">
                  <Gift className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="font-medium">Redeem points:</span>
                </div>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  100 points = 10% discount on your next service
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  500 points = Free standard service
                </p>
              </div>
            </div>
          </div>

          {/* Theme Selector */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-4">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold mb-3 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-blue-500" />
                Theme Settings
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`flex items-center justify-center p-3 rounded-lg border transition-all ${
                      theme === option.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-2">
                        {option.icon}
                      </div>
                      <span className="text-sm font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
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
              <h2 className="font-semibold mb-2">Help & Support</h2>
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
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <HelpCircle className="w-4 h-4 text-efix-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Frequently Asked Questions</h3>
                  </div>
                  <div className="text-gray-400">
                    &rsaquo;
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <HelpCircle className="w-4 h-4 text-efix-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Contact Support</h3>
                  </div>
                  <div className="text-gray-400">
                    &rsaquo;
                  </div>
                </div>
                
                <div 
                  className="flex items-center text-red-500 cursor-pointer"
                  onClick={handleLogout}
                >
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
