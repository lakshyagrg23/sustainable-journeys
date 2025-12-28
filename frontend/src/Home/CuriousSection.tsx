'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CruisesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Cruise type filters
  const cruiseTypes = ['All', 'Luxury', 'Premium', 'Budget', 'Adventure'];

  // Filter cruises based on type
  const filteredCruises = useMemo(() => {
    const cruises = [
      {
        id: 1,
        name: "Andaman Luxury Explorer",
        image: "/api/placeholder/300/200",
        type: "Luxury",
        route: "Port Blair → Havelock → Neil → Port Blair",
        duration: "4 Nights / 5 Days",
        price: 49999,
        amenities: ["All Meals", "Private Balcony", "Spa", "Pool", "WiFi"],
        rating: 4.8
      },
      {
        id: 2,
        name: "Budget Island Hopper",
        image: "/api/placeholder/300/200",
        type: "Budget",
        route: "Port Blair → Neil → Havelock → Port Blair",
        duration: "3 Nights / 4 Days",
        price: 19999,
        amenities: ["Buffet Meals", "Deck Access", "Live Music"],
        rating: 4.2
      },
      {
        id: 3,
        name: "Premium Coral Cruise",
        image: "/api/placeholder/300/200",
        type: "Premium",
        route: "Port Blair → Havelock → Long Island → Port Blair",
        duration: "5 Nights / 6 Days",
        price: 34999,
        amenities: ["Fine Dining", "Snorkeling", "Kids Club", "Gym"],
        rating: 4.6
      },
      {
        id: 4,
        name: "Adventure Seafarer",
        image: "/api/placeholder/300/200",
        type: "Adventure",
        route: "Port Blair → Baratang → Rangat → Port Blair",
        duration: "4 Nights / 5 Days",
        price: 27999,
        amenities: ["Kayaking", "Trekking", "Campfire", "Guide"],
        rating: 4.4
      },
      {
        id: 5,
        name: "Family Fun Cruise",
        image: "/api/placeholder/300/200",
        type: "Premium",
        route: "Port Blair → Havelock → Neil → Port Blair",
        duration: "3 Nights / 4 Days",
        price: 25999,
        amenities: ["Kids Activities", "Buffet", "Swimming Pool"],
        rating: 4.5
      },
      {
        id: 6,
        name: "Backpacker Express",
        image: "/api/placeholder/300/200",
        type: "Budget",
        route: "Port Blair → Neil → Port Blair",
        duration: "2 Nights / 3 Days",
        price: 12999,
        amenities: ["Shared Cabins", "Open Deck", "Breakfast"],
        rating: 4.0
      }
    ];
    if (selectedCategory === 'All') return cruises;
    return cruises.filter(cruise => cruise.type === selectedCategory);
  }, [selectedCategory]);

  const totalSlides = filteredCruises.length;

  const nextSlide = () => setCurrentSlide(p => (p + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + totalSlides) % totalSlides);

  // Responsive: show 1 card at a time on mobile, 2 on desktop
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const getVisibleCards = () => {
    if (isMobile) {
      return totalSlides > 0 ? [filteredCruises[currentSlide]] : [];
    }
    const num = Math.min(2, totalSlides);
    return Array.from({ length: num }, (_, i) => filteredCruises[(currentSlide + i) % totalSlides]);
  };

  const ImageBlock = ({ src, alt }: { src: string; alt: string }) => {
    const [err, setErr] = useState(false);
    if (!src || err) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
          No Image
        </div>
      );
    }
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width:768px) 100vw, (max-width:1200px) 33vw, 400px"
        className="object-cover"
        onError={() => setErr(true)}
        placeholder="empty"
      />
    );
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            🚢 Cruises
          </h2>
        </div>

        {/* Compact Filter Section */}
        <div className={`flex flex-wrap items-center justify-center gap-3 mb-8 bg-gray-50 rounded-xl p-4 ${isMobile ? 'overflow-x-auto whitespace-nowrap gap-2' : ''}`}>
          <div className={`flex items-center gap-2 ${isMobile ? 'flex-nowrap overflow-x-auto whitespace-nowrap' : ''}`}>
            {cruiseTypes.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                style={isMobile ? { minWidth: 90 } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cruises Cards with Navigation */}
        {totalSlides > 0 ? (
          <div className="relative">
            {/* Navigation Arrows */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-orange-500 hover:text-white text-gray-600 rounded-full p-3 shadow-lg transition-all duration-300 group"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-orange-500 hover:text-white text-gray-600 rounded-full p-3 shadow-lg transition-all duration-300 group"
                  aria-label="Next slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Cruises Cards */}
            <div className={isMobile ? "mx-2" : "mx-8"}>
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-6`}>
                {getVisibleCards().map((cruise) => (
                  <div key={cruise.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className="flex flex-col sm:flex-row h-auto sm:h-56">
                      {/* Image Section */}
                      <div className="relative w-full sm:w-2/5 h-40 sm:h-full">
                        <ImageBlock src={cruise.image} alt={cruise.name} />
                        <div className="absolute top-3 right-3">
                          <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {cruise.type}
                          </div>
                        </div>
                        <div className="absolute top-3 left-3">
                          <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                            {cruise.duration}
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                            {cruise.name}
                          </h3>
                          <div className="text-sm text-gray-600 mb-1 line-clamp-1">
                            <span className="font-medium">Route:</span> {cruise.route}
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Amenities:</span> {cruise.amenities.join(', ')}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            ⭐ {cruise.rating} &nbsp;|&nbsp; ₹{cruise.price.toLocaleString()}
                          </span>
                          <Link
                            href={`/cruises/${cruise.id}`}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 whitespace-nowrap"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            {totalSlides > (isMobile ? 1 : 2) && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(totalSlides / (isMobile ? 1 : 2)) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index * (isMobile ? 1 : 2))}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${Math.floor(currentSlide / (isMobile ? 1 : 2)) === index
                      ? 'bg-orange-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🚢</div>
            <h3 className="text-xl text-gray-600 mb-2">No cruises found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            href="/cruises"
            className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-300"
          >
            View All Cruises
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CruisesSection;
