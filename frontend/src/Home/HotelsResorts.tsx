'use client';

import React, { useState, useEffect, useMemo } from 'react';
import useHotelStore from "../../store/hotelStore";
import Image from 'next/image';
import Link from 'next/link';

interface ApiHotel {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  About?: string;
  price: number;
  rating?: number; // if backend adds later
  category?: string;
  location?: string;
  photo?: {
    formats?: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
    url?: string;
  };
}

interface Hotel {
  id: number;
  documentId: string;
  name: string;
  image: string;
  rating: number;
  location: string;
  price: number;
  description: string;
}

const HotelsResortsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  // const [showFilters, setShowFilters] = useState(false);

  // Expect your zustand store to expose these
  const { hotels: apiHotels, loading, error, fetchHotels } = useHotelStore();

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  // Reset slide when filters change
  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedCategory, priceRange]);

  // Base URL for images (Strapi). Put in .env.local: NEXT_PUBLIC_API_URL=https://your-domain
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

  // Transform API data to internal shape
  const hotels: Hotel[] = useMemo(() => {
    if (!apiHotels) return [];
    return (apiHotels as ApiHotel[]).map(h => {
      const img =
        h.photo?.formats?.large?.url ||
        h.photo?.formats?.medium?.url ||
        h.photo?.formats?.small?.url ||
        h.photo?.formats?.thumbnail?.url ||
        h.photo?.url ||
        'https://via.placeholder.com/1000x455?text=Hotel';
      return {
        id: h.id,
        documentId: h.documentId,
        name: h.name,
        image: img.startsWith('http') ? img : `${API_BASE}${img}`,
        rating: h.rating ?? 4.5, // fallback until rating available
        location: h.location || 'Andaman & Nicobar Islands',
        price: h.price,
        description: h.description || h.About || 'No description available.'
      };
    });
  }, [apiHotels, API_BASE]);

  // Filter hotels based on category and price range
  const filteredHotels = useMemo(() => {
    let filtered = hotels;

    // Filter by category (based on price range for now)
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(hotel => {
        if (selectedCategory === 'Luxury' && hotel.price >= 15000) return true;
        if (selectedCategory === 'Premium' && hotel.price >= 8000 && hotel.price < 15000) return true;
        if (selectedCategory === 'Budget' && hotel.price < 8000) return true;
        return false;
      });
    }

    // Filter by price range
    if (priceRange !== 'All') {
      filtered = filtered.filter(hotel => {
        if (priceRange === 'Under 5000' && hotel.price < 5000) return true;
        if (priceRange === '5000-10000' && hotel.price >= 5000 && hotel.price <= 10000) return true;
        if (priceRange === '10000-20000' && hotel.price >= 10000 && hotel.price <= 20000) return true;
        if (priceRange === 'Above 20000' && hotel.price > 20000) return true;
        return false;
      });
    }

    return filtered;
  }, [hotels, selectedCategory, priceRange]);

  const totalSlides = filteredHotels.length;

  const nextSlide = () => setCurrentSlide(p => (p + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + totalSlides) % totalSlides);

  // const renderStars = (rating: number) => {
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 !== 0;
  //   const stars = [];
  //   for (let i = 0; i < fullStars; i++) {
  //     stars.push(
  //       <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
  //         <path d="M10 15l-5.878 3.09 1.123-6.545L0 6.91l6.564-.955L10 0l3.436 5.955L20 6.91l-5.245 4.635L15.878 18z" />
  //       </svg>
  //     );
  //   }
  //   if (hasHalfStar) {
  //     stars.push(
  //       <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
  //         <defs>
  //           <linearGradient id="half">
  //             <stop offset="50%" stopColor="currentColor" />
  //             <stop offset="50%" stopColor="transparent" />
  //           </linearGradient>
  //         </defs>
  //         <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L0 6.91l6.564-.955L10 0l3.436 5.955L20 6.91l-5.245 4.635L15.878 18z" />
  //       </svg>
  //     );
  //   }
  //   return stars;
  // };

  const getVisibleCards = () => {
    const num = Math.min(2, totalSlides); // Changed from 3 to 2 for desktop
    return Array.from({ length: num }, (_, i) => filteredHotels[(currentSlide + i) % totalSlides]);
  };

  // Loading / error states
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6  text-black">Hotels & Resorts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-xl shadow p-6 space-y-4"
              >
                <div className="h-40 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Hotels & Resorts</h2>
          <p className="text-red-600 mb-4">Failed to load hotels: {String(error)}</p>
          <button
            onClick={() => fetchHotels()}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  // If no hotels from API, show simple message
  if (hotels.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Hotels & Resorts</h2>
          <p className="text-gray-600">No hotels available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            🏨 Hotels & Resorts
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
            className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-black"
          >
            <option value="All">All Prices</option>
            <option value="Under 5000">Under ₹5K</option>
            <option value="5000-10000">₹5K - ₹10K</option>
            <option value="10000-20000">₹10K - ₹20K</option>
            <option value="Above 20000">Above ₹20K</option>
          </select>

          {/* Action Buttons */}
          <Link
            href="/hotel"
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

        {/* Show message when no hotels found after filtering */}
        {totalSlides === 0 ? (
          <div className="text-center py-8">
            <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
              <div className="text-4xl mb-3">😕</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Hotels Found</h3>
              <p className="text-gray-600 mb-4">
                No hotels match your current filters.
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
            {/* Navigation Arrows - Show when more than 1 hotel on desktop or mobile */}
            {filteredHotels.length > 1 && (
              <>
                {/* Left Arrow */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-30 bg-white hover:bg-orange-500 border-2 border-orange-300 text-orange-600 hover:text-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  aria-label="Previous hotels"
                >
                  <svg className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Right Arrow */}
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-30 bg-white hover:bg-orange-500 border-2 border-orange-300 text-orange-600 hover:text-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  aria-label="Next hotels"
                >
                  <svg className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Desktop Grid View - 2 Cards Horizontal */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {getVisibleCards().slice(0, 2).map((hotel, idx) => (
                <div
                  key={`${hotel.id}-${idx}-${currentSlide}`}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="flex h-48">
                    {/* Image Section */}
                    <div className="relative w-2/5 bg-gray-100 overflow-hidden">
                      <div className="absolute inset-0">
                        <Image
                          src={hotel.image}
                          alt={hotel.name}
                          fill
                          sizes="(max-width:768px) 100vw, (max-width:1200px) 33vw, 400px"
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />

                      {/* Price Badge */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-800">
                        💰 ₹{hotel.price.toLocaleString()}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-3/5 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                          {hotel.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center mb-3">
                          <span className="text-orange-400 mr-1">⭐</span>
                          <span className="text-sm font-semibold text-gray-800">{hotel.rating.toFixed(1)}</span>
                          <span className="text-xs text-gray-500 ml-2">📍 {hotel.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-orange-500">₹{hotel.price.toLocaleString()}</span>
                          <p className="text-xs text-gray-500">per night</p>
                        </div>
                        <Link
                          href={`/hotel/${hotel.documentId}`}
                          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                        >
                          View
                        </Link>
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
                      <Image
                        src={filteredHotels[currentSlide].image}
                        alt={filteredHotels[currentSlide].name}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />

                    {/* Price Badge */}
                    <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-800">
                      💰 ₹{filteredHotels[currentSlide].price.toLocaleString()}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-3/5 p-3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2">
                        {filteredHotels[currentSlide].name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center mb-2">
                        <span className="text-orange-400 mr-1">⭐</span>
                        <span className="text-sm font-semibold text-gray-800">{filteredHotels[currentSlide].rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-orange-500">
                          ₹{filteredHotels[currentSlide].price.toLocaleString()}
                        </span>
                        <p className="text-xs text-gray-500">per night</p>
                      </div>
                      <Link
                        href={`/hotel/${filteredHotels[currentSlide].documentId}`}
                        className="bg-orange-500 hover:bg-orange-600 text-white py-1.5 px-3 rounded-lg text-sm font-medium transition-colors duration-300"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Dots */}
            {filteredHotels.length > 1 && (
              <div className="flex justify-center gap-2 mt-8 md:hidden">
                {filteredHotels.map((_, i) => (
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
            {filteredHotels.length > 2 && (
              <div className="hidden md:flex justify-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(filteredHotels.length / 2) }, (_, i) => (
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

export default HotelsResortsSection;