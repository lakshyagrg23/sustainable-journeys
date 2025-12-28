"use client";


import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  MapPin,
  Search,
  SlidersHorizontal,
  Heart,
  Eye,
  Bed,
  Tv,
  Wifi,
  Coffee,
} from 'lucide-react';
import Navbar from '@/components/Navbar';

import useHotelStore from '../../../store/hotelStore';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

// API data interfaces
interface ApiImageFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}

interface ApiImage {
  id: number;
  documentId: string;
  name: string;
  url: string;
  formats?: {
    thumbnail?: ApiImageFormat;
    small?: ApiImageFormat;
    medium?: ApiImageFormat;
    large?: ApiImageFormat;
  };
}

interface HotelApiModel {
  id: number;
  documentId: string;
  name: string;
  description: string;
  About: string;
  price: number;
  location?: string;
  category?: string;
  photo?: ApiImage;
  hero_section?: ApiImage[];
  room?: ApiRoom[];
}

interface ApiRoom {
  id: number;
  name?: string;
  type?: string;
  price?: number;
  Occupancy?: string;
  originalPrice?: number;
}

// Normalized hotel interface for display
// interface Hotel {
//   id: string;
//   documentId: string;
//   name: string;
//   category: string;
//   rating: number;
//   reviewCount: number;
//   location: string;
//   price: number;
//   originalPrice: number | undefined;
//   discount: number;
//   image: string;
//   amenities: string[];
//   roomTypes: string;
//   isPopular: boolean;
// }

const buildAssetUrl = (u?: string) => {
  if (!u) return '';
  if (u.startsWith('http')) return u;
  return `${API_BASE_URL}${u.startsWith('/') ? u : `/${u}`}`;
};

const categories = ["All", "Luxury", "Premium", "Budget"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 - ₹15,000", min: 10000, max: 15000 },
  { label: "Above ₹15,000", min: 15000, max: Infinity }
];

// Helper function to determine category based on hotel data
const getHotelCategory = (hotel: HotelApiModel): string => {
  const name = hotel.name.toLowerCase();
  const description = (hotel.description || '').toLowerCase();

  if (name.includes('luxury') || description.includes('luxury') || hotel.price > 10000) return 'Luxury';
  if (name.includes('premium') || description.includes('premium') || hotel.price > 5000) return 'Premium';
  return 'Budget';
};

// Helper function to extract room types from hotel data
const getRoomTypes = (hotel: HotelApiModel): string => {
  if (hotel.room && hotel.room.length > 0) {
    return hotel.room.map((room: ApiRoom) => room.name || room.type || 'Standard Room').join(', ');
  }

  // Default room types based on category
  const category = getHotelCategory(hotel);
  switch (category) {
    case 'Luxury':
      return 'Ocean Villa, Presidential Suite, Deluxe Ocean View';
    case 'Premium':
      return 'Sea View Suite, Deluxe Room, Beach Cottage';
    default:
      return 'Standard Room, Deluxe Room';
  }
};

const HotelsPage = () => {
  const { hotels, fetchHotels, loading, error } = useHotelStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  // Normalize API data to component format
  const normalizedHotels = useMemo(() => {
    if (!hotels) return [];

    const list: HotelApiModel[] = Array.isArray(hotels) ? hotels : [];

    return list.map(hotel => {
      const rawImg =
        hotel.photo?.formats?.medium?.url ||
        hotel.photo?.formats?.small?.url ||
        hotel.photo?.url ||
        '';

      const price = hotel.price || 0;
      // Since API doesn't have original_price, we'll skip discount calculations
      const originalPrice: number | undefined = undefined;

      return {
        id: hotel.documentId,
        documentId: hotel.documentId,
        name: hotel.name,
        category: getHotelCategory(hotel),
        rating: 4.0, // Default rating since API doesn't have this
        reviewCount: Math.floor(Math.random() * 200) + 50, // Random for now
        location: hotel.location || 'Andaman Islands',
        price: price,
        originalPrice: originalPrice,
        discount: 0,
        image: buildAssetUrl(rawImg) || '/api/placeholder/400/300',
        amenities: ['Free WiFi', 'Restaurant'], // Default amenities Havelock Island
        roomTypes: getRoomTypes(hotel),
        isPopular: Math.random() > 0.7 // Random popularity for now
      };
    });
  }, [hotels]);

  // Filter and sort hotels
  const filteredHotels = normalizedHotels
    .filter(hotel => {
      const matchesCategory = selectedCategory === "All" || hotel.category === selectedCategory;
      const matchesPrice = hotel.price >= selectedPriceRange.min && hotel.price <= selectedPriceRange.max;
      const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popular":
        default:
          return (Number(b.isPopular) - Number(a.isPopular)) || (b.rating - a.rating);
      }
    });

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading hotels...</p>
          </div>
        </div>
        {/* <Footer /> */}
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Hotels</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => fetchHotels()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        {/* <Footer /> */}
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2049&q=80"
              alt="Beautiful tropical resort in Andaman Islands"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Light overlay for text readability */}
          {/* <div className="absolute inset-0 bg-blue-900 bg-opacity-40" /> */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Hotels & <span className="text-yellow-400">Resorts</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto">
                Discover the finest accommodations in the Andaman Islands
              </p>
              <div className="w-16 sm:w-20 lg:w-24 h-1 bg-yellow-400 mx-auto rounded" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 text-gray-500">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search hotels or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-4">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                {/* Price Filter */}
                <select
                  value={priceRanges.findIndex(range => range === selectedPriceRange)}
                  onChange={(e) => setSelectedPriceRange(priceRanges[parseInt(e.target.value)])}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priceRanges.map((range, index) => (
                    <option key={index} value={index}>{range.label}</option>
                  ))}
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={priceRanges.findIndex(range => range === selectedPriceRange)}
                  onChange={(e) => setSelectedPriceRange(priceRanges[parseInt(e.target.value)])}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priceRanges.map((range, index) => (
                    <option key={index} value={index}>{range.label}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-gray-600">
              Showing {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          {/* Hotels Grid */}
          {filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredHotels.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-56 lg:h-64">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {hotel.isPopular && (
                        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Popular
                        </span>
                      )}
                      {hotel.discount > 0 && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {hotel.discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${hotel.category === 'Luxury' ? 'bg-purple-100 text-purple-800' :
                        hotel.category === 'Premium' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                        {hotel.category}
                      </span>
                    </div>

                    {/* Heart Icon */}
                    <button className="absolute bottom-3 right-3 w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all shadow-lg">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {hotel.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(hotel.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                              }`}
                          />
                        ))}
                        {/* <span className="text-sm font-semibold text-gray-900 ml-1">
                          {hotel.rating}
                        </span> */}
                        <span className="text-xs sm:text-sm text-gray-600">
                          reviews ({hotel.reviewCount})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="text-sm">{hotel.location}</span>
                    </div>

                    {/* Static amenity boxes (always shown) */}
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <Tv className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-gray-700">TV</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <Bed className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-gray-700">Bed</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <Coffee className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-gray-700">Breakfast</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <Wifi className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-gray-700">Wi‑Fi</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {hotel.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{hotel.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Room Types */}
                    <div className="mb-4">
                      <div className="flex items-center gap-1 mb-1">
                        <Bed className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-600">Room Types:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">
                        {hotel.roomTypes}
                      </p>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl sm:text-2xl font-bold text-gray-900">
                            ₹{hotel.price.toLocaleString()}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-600">/ night</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/hotel/${hotel.documentId}`}
                          className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // No Results
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedPriceRange(priceRanges[0]);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>


    </>
  );
};

export default HotelsPage;