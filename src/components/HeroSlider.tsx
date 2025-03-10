
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const slides = [
  {
    id: 1,
    title: "Summer Special Offer",
    description: "Get 20% off on all cleaning services",
    gradient: "from-blue-600 to-blue-400",
    image: "/lovable-uploads/465abb46-dff1-4f48-a1aa-e82a21d2ff09.png"
  },
  {
    id: 2,
    title: "Home Repair Collection",
    description: "Professional handyman services",
    gradient: "from-purple-600 to-pink-400",
    image: "/lovable-uploads/4208162c-1cb2-4fd3-ad0d-95e4eab78bdc.png"
  },
  {
    id: 3,
    title: "New Services Available",
    description: "Explore our expanded service catalog",
    gradient: "from-green-600 to-emerald-400",
    image: "/lovable-uploads/26a4f0a0-81eb-41bc-b705-8d80df3ea5d1.png"
  }
];

const HeroSlider = () => {
  return (
    <Carousel className="w-full" opts={{ loop: true }}>
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className={`relative h-64 w-full bg-gradient-to-r ${slide.gradient} rounded-xl overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 p-6 text-white h-full flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                <p className="text-white/90">{slide.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default HeroSlider;
