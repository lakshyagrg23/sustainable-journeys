"use client";
import React, { useEffect, useState, useMemo } from 'react';
import useActivityStore from '../../../store/activityStore';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Clock,
  Eye
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

// Add TypeScript interfaces
interface ImageFormat {
  url: string;
  width?: number;
  height?: number;
}

interface MediaFormats {
  large?: ImageFormat;
  medium?: ImageFormat;
  small?: ImageFormat;
  thumbnail?: ImageFormat;
}

interface Media {
  url: string;
  formats?: MediaFormats;
}

interface Activity {
  id: number;
  documentId: string;
  title?: string;
  detailed_description?: string;
  short_description?: string;
  location?: string;
  duration?: string;
  price?: number;
  tags?: string;
  category?: 'adventure' | 'waterActivity' | 'beach' | 'travel' | 'sightseeing';
  image?: Media;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const categories = [
  { value: "all", label: "All Activities" },
  { value: "adventure", label: "Adventure" },
  { value: "waterActivity", label: "Water Sports" },
  { value: "beach", label: "Beach Activities" },
  { value: "travel", label: "Travel & Tours" },
  { value: "sightseeing", label: "Sightseeing" }
];

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹2,000", min: 0, max: 2000 },
  { label: "₹2,000 - ₹5,000", min: 2000, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "Above ₹10,000", min: 10000, max: Infinity }
];

const buildAssetUrl = (u?: string) => {
  if (!u) return '';
  if (u.startsWith('http')) return u;
  return `${API_BASE_URL}${u.startsWith('/') ? u : '/' + u}`;
};

function ActivitiesPage() {
  const { activities, loading, error, fetchActivities } = useActivityStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  // ...existing code...
  const [sortBy] = useState("popular");

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Filter and sort activities
  const filteredActivities = useMemo(() => {
    if (!activities) return [];

    const filtered = activities.filter((activity: Activity) => {
      const matchesCategory = selectedCategory === "all" || activity.category === selectedCategory;
      const matchesPrice = !activity.price || (activity.price >= selectedPriceRange.min && activity.price <= selectedPriceRange.max);
      const matchesSearch = !searchTerm ||
        activity.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.tags?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    });

    // Sort activities
    filtered.sort((a: Activity, b: Activity) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "name":
          return (a.title || '').localeCompare(b.title || '');
        case "popular":
        default:
          return 0; // Keep original order for now
      }
    });

    return filtered;
  }, [activities, searchTerm, selectedCategory, selectedPriceRange, sortBy]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto py-10 px-4 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero Section with Integrated Filters */}
      <div className="relative h-[50vh] md:h-[55vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Water activities in Andaman Islands"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/70 to-blue-900/80"></div> */}

        <div className="relative z-10 h-full flex flex-col justify-center text-center text-white px-4">
          <div className="max-w-6xl mx-auto w-full">
            {/* Hero Content */}
            <div className="mb-6 md:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 drop-shadow-lg">
                Adventures & <span className="text-yellow-400">Activities</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto drop-shadow-md mb-3 sm:mb-4">
                Discover thrilling experiences in the beautiful Andaman Islands
              </p>
              <div className="w-12 sm:w-20 h-0.5 sm:h-1 bg-yellow-400 mx-auto rounded"></div>
            </div>

            {/* Filtration - only type search and 4 category buttons, placed just below hero */}
            <div className="max-w-4xl mx-auto px-2 py-3 -mt-8 md:-mt-12 flex flex-col gap-3 items-center">
              {/* <div className="flex gap-3 justify-center w-full mb-2">
                {[{ value: "all", label: "All" },
                { value: "adventure", label: "Adventure" },
                { value: "waterActivity", label: "Water Sports" },
                { value: "beach", label: "Beach" }
                ].map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center px-5 py-2 rounded-full font-bold transition-all duration-300 text-sm shadow-sm
                      ${selectedCategory === category.value
                        ? 'bg-blue-600 text-white shadow-md scale-105'
                        : 'text-gray-700 bg-gray-100 hover:bg-blue-50'}
                    `}
                  >
                    {category.label}
                  </button>
                ))}
              </div> */}
              <div className="w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search by type or island..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-blue-500 bg-white rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing {filteredActivities.length} activit{filteredActivities.length !== 1 ? 'ies' : 'y'}
              {selectedCategory !== "all" && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
              Amazing Activities Await
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              From thrilling water sports to peaceful island tours, create unforgettable memories
            </p>
          </div>

          {/* Activities Grid */}
          {filteredActivities && filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filteredActivities.map((activity: Activity) => {
                const imageUrl = activity.image?.formats?.medium?.url ||
                  activity.image?.formats?.small?.url ||
                  activity.image?.url;

                // Get category display info
                // const categoryInfo = categories.find(c => c.value === activity.category);
                // const categoryColors = {
                //   adventure: 'bg-orange-100 text-orange-800',
                //   waterActivity: 'bg-blue-100 text-blue-800',
                //   beach: 'bg-yellow-100 text-yellow-800',
                //   travel: 'bg-green-100 text-green-800',
                //   sightseeing: 'bg-purple-100 text-purple-800'
                // };

                return (
                  <div key={activity.id} className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col border border-blue-200/60 hover:border-blue-500/80">
                    {/* Card Image */}
                    <div className="relative h-48 sm:h-56 lg:h-60 w-full overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={buildAssetUrl(imageUrl)}
                          alt={activity.title || 'Activity'}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-200 to-green-200 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">No Image</span>
                        </div>
                      )}

                      {/* Badges */}
                      {/* <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                        {activity.category && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[activity.category] || 'bg-gray-100 text-gray-800'}`}>
                            {categoryInfo?.label || activity.category}
                          </span>
                        )}
                      </div> */}

                      {/* Price Badge */}
                      {activity.price && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold text-xs z-10">
                          ₹{activity.price}
                        </div>
                      )}


                    </div>

                    {/* Card Content - Enhanced UI */}
                    <div className="flex-1 flex flex-col p-4 bg-gradient-to-br from-blue-50 via-white to-cyan-50 border border-blue-00 rounded-b-2xl shadow-inner">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {activity.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3 max-h-12 overflow-hidden transition-all duration-300 group-hover:max-h-40">
                        {activity.short_description || activity.detailed_description || 'No description available'}
                      </p>
                      {/* Tags: smart pill row below description */}
                      {activity.tags && (
                        <div className="flex gap-2 overflow-x-auto pb-2 mb-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
                          {Array.from(new Set(activity.tags.split(/[, ]+/).filter(Boolean))).map((tag, idx) => (
                            <span key={tag + idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Activity Details */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        {activity.location && (
                          <div className="flex items-center text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{activity.location}</span>
                          </div>
                        )}

                        {activity.duration && (
                          <div className="flex items-center text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1">
                            <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span>{activity.duration}</span>
                          </div>
                        )}
                        {/* Mileage or other info can be added here if available */}
                      </div>

                      <div className="mt-auto flex items-center justify-end">
                        <Link
                          href={`/activities/${activity.documentId}`}
                          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // No Results
            <div className="text-center py-8 sm:py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">No activities found</h3>
              <p className="text-sm text-gray-600 mb-3">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedPriceRange(priceRanges[0]);
                }}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-8 sm:mt-12 text-center">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                Ready for Your Adventure?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 max-w-2xl mx-auto">
                Contact us to book your perfect Andaman experience or get a customized package
                tailored to your preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <button className="bg-green-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm hover:bg-green-700 transition-colors">
                  Contact Us
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 hover:text-white transition-colors">
                  View Packages
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default ActivitiesPage;