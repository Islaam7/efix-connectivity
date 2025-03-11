
import { Droplets, Zap, Wrench, Paintbrush, Thermometer } from 'lucide-react';
import React from 'react';

export const serviceCategories = [
  {
    id: 'plumbing',
    title: 'Plumbing',
    icon: React.createElement(Droplets),
    description: 'Fix leaks, drains, and installations',
    color: '#3B82F6' // Blue
  },
  {
    id: 'electrical',
    title: 'Electrical',
    icon: React.createElement(Zap),
    description: 'Wiring, fixtures, and installations',
    color: '#F59E0B' // Amber/Yellow
  },
  {
    id: 'handyman',
    title: 'Handyman',
    icon: React.createElement(Wrench),
    description: 'General repairs and maintenance',
    color: '#EC4899' // Pink/Purple
  },
  {
    id: 'painting',
    title: 'Painting',
    icon: React.createElement(Paintbrush),
    description: 'Interior and exterior painting',
    color: '#10B981' // Green
  },
  {
    id: 'hvac',
    title: 'HVAC',
    icon: React.createElement(Thermometer),
    description: 'Heating, cooling, and ventilation',
    color: '#EF4444' // Red
  }
];

export const professionals = [
  {
    id: '1',
    name: 'John Smith',
    specialty: 'Plumbing Expert',
    rating: 4.8,
    price: 45,
    available: true,
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    serviceId: 'plumbing'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    specialty: 'Electrical Specialist',
    rating: 4.9,
    price: 50,
    available: true,
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    serviceId: 'electrical'
  },
  {
    id: '3',
    name: 'David Wilson',
    specialty: 'Handyman',
    rating: 4.7,
    price: 35,
    available: false,
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    serviceId: 'handyman'
  },
  {
    id: '4',
    name: 'Lisa Brown',
    specialty: 'HVAC Technician',
    rating: 4.6,
    price: 55,
    available: true,
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    serviceId: 'hvac'
  }
];
