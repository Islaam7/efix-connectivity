
import React from 'react';
import { Search, Clock, Award } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-6 h-6 text-efix-primary" />,
      title: "Find services",
      description: "Browse and find the perfect service for your needs"
    },
    {
      icon: <Clock className="w-6 h-6 text-efix-primary" />,
      title: "Book appointment",
      description: "Schedule a time that works best for you"
    },
    {
      icon: <Award className="w-6 h-6 text-efix-primary" />,
      title: "Get service and rate",
      description: "Receive quality service and share your experience"
    }
  ];

  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold mb-4">How It Works</h2>
      <div className="grid grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3">
              {step.icon}
            </div>
            <h3 className="font-medium mb-1">{step.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
