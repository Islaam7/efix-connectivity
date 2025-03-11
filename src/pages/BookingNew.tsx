import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { professionals } from '@/data/mockData';
import { toast } from 'sonner';

const BookingNew = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const professionalId = queryParams.get('professionalId');

  const [professional, setProfessional] = useState<any>(null);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    if (professionalId) {
      const foundProfessional = professionals.find(p => p.id === professionalId);
      if (foundProfessional) {
        setProfessional(foundProfessional);
      }
    }
  }, [professionalId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit booking
      toast.success('Booking submitted successfully!');
      navigate('/bookings');
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-6">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className={`w-12 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
          <div className={`w-12 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            3
          </div>
        </div>
      </div>
    );
  };

  const renderStep1 = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Choose Date & Time</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Select Date
          </label>
          <input 
            type="date" 
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Select Time Slot
          </label>
          <select 
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="">Select a time slot</option>
            <option value="09:00-11:00">9:00 AM - 11:00 AM</option>
            <option value="11:00-13:00">11:00 AM - 1:00 PM</option>
            <option value="13:00-15:00">1:00 PM - 3:00 PM</option>
            <option value="15:00-17:00">3:00 PM - 5:00 PM</option>
          </select>
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-6"
          disabled={!date || !time}
        >
          Continue
        </Button>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Service Details</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Service Address
          </label>
          <input 
            type="text" 
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Describe Your Issue
          </label>
          <textarea 
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 min-h-[120px]"
            placeholder="Please describe what you need help with..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        <div className="flex space-x-3">
          <Button 
            type="button" 
            variant="outline"
            className="flex-1 py-6"
            onClick={() => setStep(1)}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            className="flex-1 py-6"
            disabled={!address || !description}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Review & Confirm</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
              <img 
                src={professional?.image} 
                alt={professional?.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">{professional?.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{professional?.specialty}</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{date}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium">Time</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{time}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{address}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <p className="text-sm font-medium mb-1">Service Description</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="font-semibold mb-3">Payment Summary</h3>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-400">Service fee (estimated)</span>
            <span>${professional?.price}/hr</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-400">Booking fee</span>
            <span>$5.00</span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span>Total (estimated)</span>
              <span>${professional?.price + 5}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Final price may vary based on service duration</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            type="button" 
            variant="outline"
            className="flex-1 py-6"
            onClick={() => setStep(2)}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            className="flex-1 py-6 flex justify-center items-center"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Confirm Booking
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] dark:from-gray-900 dark:to-gray-800">
      {/* Custom header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto max-w-lg px-4 py-3 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-medium ml-2">Book a Service</h1>
        </div>
      </div>
      
      <main className="container mx-auto max-w-lg p-4 pb-8">
        {professional ? (
          <>
            {renderStepIndicator()}
            
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
            </form>
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 text-center">
            <div className="py-10">
              <CheckCircle2 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Professional Not Found</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find the professional you're looking for.
              </p>
              <Button onClick={() => navigate('/')} variant="default">
                Return Home
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookingNew;
