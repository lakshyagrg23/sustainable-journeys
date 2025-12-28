'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BikeSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');

  // Filter bikes based on category and price range
  const filteredBikes = useMemo(() => {
    const bikeRentals = [
      {
        id: 1,
        name: "Royal Enfield Classic 350",
        image: "/api/placeholder/300/200",
        price: 1200,
        rating: 4.8,
        features: ["350cc Engine", "Comfortable Ride", "Perfect for Long Tours", "Fuel Efficient"],
        location: "Andaman Islands",
        category: "Premium"
      },
      {
        id: 2,
        name: "Honda Activa 6G",
        image: "/api/placeholder/300/200",
        price: 800,
        rating: 4.6,
        features: ["110cc Engine", "Easy to Ride", "Great for City Tours", "Lightweight"],
        location: "Port Blair",
        category: "Budget"
      },
      {
        id: 3,
        name: "TVS Apache RTR 160",
        image: "/api/placeholder/300/200",
        price: 1000,
        rating: 4.7,
        features: ["160cc Engine", "Sporty Design", "Excellent Performance", "Smooth Handling"],
        location: "Havelock Island",
        category: "Premium"
      },
      {
        id: 4,
        name: "Yamaha FZ-S V3",
        image: "/api/placeholder/300/200",
        price: 1100,
        rating: 4.5,
        features: ["149cc Engine", "Stylish Look", "Good Mileage", "Comfortable Seating"],
        location: "Neil Island",
        category: "Premium"
      },
      {
        id: 5,
        name: "Hero Splendor Plus",
        image: "/api/placeholder/300/200",
        price: 600,
        rating: 4.3,
        features: ["97cc Engine", "Great Mileage", "Easy Handling", "Reliable"],
        location: "Port Blair",
        category: "Budget"
      },
      {
        id: 6,
        name: "Bajaj Pulsar NS200",
        image: "/api/placeholder/300/200",
        price: 1400,
        rating: 4.6,
        features: ["200cc Engine", "Sport Performance", "Advanced Features", "Stylish Design"],
        location: "Havelock Island",
        category: "Luxury"
      }
    ];
    let filtered = bikeRentals;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(bike => bike.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== 'All') {
      filtered = filtered.filter(bike => {
        if (priceRange === 'Under 800' && bike.price < 800) return true;
        if (priceRange === '800-1200' && bike.price >= 800 && bike.price <= 1200) return true;
        if (priceRange === 'Above 1200' && bike.price > 1200) return true;
        return false;
      });
    }

    return filtered;
  }, [selectedCategory, priceRange]);

  const totalSlides = filteredBikes.length;

  const nextSlide = () => setCurrentSlide(p => (p + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + totalSlides) % totalSlides);

  const getVisibleCards = () => {
    const num = Math.min(2, totalSlides);
    return Array.from({ length: num }, (_, i) => filteredBikes[(currentSlide + i) % totalSlides]);
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
            🚲 Bike Rentals
          </h2>
        </div>

        {/* Compact Filter Section */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 bg-gray-50 rounded-xl p-4">
          {/* Category Filters */}
          <div className="flex items-center gap-2">
            {['All', 'Budget', 'Premium', 'Luxury'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
          >
            <option value="All">All Prices</option>
            <option value="Under 800">Under ₹800</option>
            <option value="800-1200">₹800 - ₹1200</option>
            <option value="Above 1200">Above ₹1200</option>
          </select>

          {/* Action Buttons */}
          <Link
            href="/bikes"
            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors duration-300"
          >
            View All
          </Link>

          {(selectedCategory !== 'All' || priceRange !== 'All') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setPriceRange('All');
              }}
              className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors duration-300"
              title="Clear filters"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Show message when no bikes found after filtering */}
        {totalSlides === 0 ? (
          <div className="text-center py-8">
            <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
              <div className="text-4xl mb-3">😕</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Bikes Found</h3>
              <p className="text-gray-600 mb-4">
                No bikes match your current filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setPriceRange('All');
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Navigation Arrows - Show when more than 1 bike */}
            {filteredBikes.length > 1 && (
              <>
                {/* Left Arrow */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-30 bg-white hover:bg-orange-500 border-2 border-orange-300 text-orange-600 hover:text-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  aria-label="Previous bikes"
                >
                  <svg className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Right Arrow */}
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-30 bg-white hover:bg-orange-500 border-2 border-orange-300 text-orange-600 hover:text-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  aria-label="Next bikes"
                >
                  <svg className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Desktop Grid View - 2 Cards Horizontal */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {getVisibleCards().map((bike, idx) => (
                <div
                  key={`${bike.id}-${idx}-${currentSlide}`}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="flex h-48">
                    {/* Image Section */}
                    <div className="relative w-2/5 bg-gray-100 overflow-hidden">
                      <div className="absolute inset-0">
                        <ImageBlock src={bike.image} alt={bike.name} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />

                      {/* Location Badge */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-800">
                        📍 {bike.location}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-3/5 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                          {bike.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center mb-3">
                          <span className="text-orange-400 mr-1">⭐</span>
                          <span className="text-sm font-semibold text-gray-800">{bike.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({Math.floor(bike.rating * 100)} reviews)</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-orange-500">₹{bike.price.toLocaleString()}</span>
                          <p className="text-xs text-gray-500">per day</p>
                        </div>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Single Card View - Horizontal */}
            <div className="md:hidden">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="flex h-40">
                  {/* Image Section */}
                  <div className="relative w-2/5 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0">
                      <ImageBlock
                        src={filteredBikes[currentSlide].image}
                        alt={filteredBikes[currentSlide].name}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />

                    {/* Location Badge */}
                    <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-800">
                      📍 {filteredBikes[currentSlide].location}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-3/5 p-3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2">
                        {filteredBikes[currentSlide].name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center mb-2">
                        <span className="text-orange-400 mr-1">⭐</span>
                        <span className="text-sm font-semibold text-gray-800">{filteredBikes[currentSlide].rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({Math.floor(filteredBikes[currentSlide].rating * 100)})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-orange-500">
                          ₹{filteredBikes[currentSlide].price.toLocaleString()}
                        </span>
                        <p className="text-xs text-gray-500">per day</p>
                      </div>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white py-1.5 px-3 rounded-lg text-sm font-medium transition-colors duration-300">
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Dots */}
            {filteredBikes.length > 1 && (
              <div className="flex justify-center gap-2 mt-8 md:hidden">
                {filteredBikes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentSlide
                      ? 'bg-orange-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>
            )}

            {/* Desktop Navigation Dots */}
            {filteredBikes.length > 2 && (
              <div className="hidden md:flex justify-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(filteredBikes.length / 2) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i * 2)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${Math.floor(currentSlide / 2) === i
                      ? 'bg-orange-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BikeSection;
