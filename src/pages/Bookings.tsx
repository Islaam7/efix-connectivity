
import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Calendar, Clock, MapPin } from 'lucide-react';

const Bookings = () => {
  const upcomingBookings = [
    {
      id: '1',
      service: 'Plumbing Repair',
      professional: 'John Smith',
      date: 'Oct 15, 2023',
      time: '10:00 AM - 12:00 PM',
      address: '123 Main St, City',
      status: 'confirmed',
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: '2',
      service: 'Electrical Inspection',
      professional: 'Sarah Johnson',
      date: 'Oct 18, 2023',
      time: '2:00 PM - 4:00 PM',
      address: '456 Oak Ave, City',
      status: 'pending',
      image: 'https://randomuser.me/api/portraits/women/1.jpg'
    }
  ];

  const pastBookings = [
    {
      id: '3',
      service: 'Handyman Services',
      professional: 'David Wilson',
      date: 'Oct 5, 2023',
      time: '1:00 PM - 3:00 PM',
      address: '789 Pine St, City',
      status: 'completed',
      image: 'https://randomuser.me/api/portraits/men/2.jpg'
    }
  ];

  const BookingCard = ({ booking }: { booking: typeof upcomingBookings[0] }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
            <img 
              src={booking.image} 
              alt={booking.professional} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{booking.service}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{booking.professional}</p>
          </div>
        </div>
        <div>
          <span 
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              booking.status === 'confirmed' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : booking.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            }`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Calendar className="w-4 h-4 mr-2" />
          {booking.date}
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4 mr-2" />
          {booking.time}
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <MapPin className="w-4 h-4 mr-2" />
          {booking.address}
        </div>
      </div>

      <div className="flex space-x-2 mt-4">
        <button className="flex-1 py-2 text-sm border border-efix-primary text-efix-primary rounded-lg">
          Reschedule
        </button>
        <button className="flex-1 py-2 text-sm bg-efix-primary text-white rounded-lg">
          {booking.status === 'completed' ? 'Leave Review' : 'View Details'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-efix-background-light dark:bg-efix-background-dark pb-16">
      <Header />
      
      <main className="container mx-auto max-w-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-3">Upcoming</h2>
            {upcomingBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>

          <div>
            <h2 className="text-lg font-medium mb-3">Past</h2>
            {pastBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Bookings;
