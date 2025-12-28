'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Star,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Waves,
  Mountain,
  TreePine,
  Car,
  Phone,
  Mail,
  Calendar,
  Heart,
  Share2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIslandPageStore } from '../../../store/island';

// Type definitions
interface ImageType {
  id: number;
  url: string;
  formats?: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
  };
}

interface AttractionType {
  id: number;
  name: string;
  short_description: string;
  rating: number;
}

interface TagType {
  id: number;
  name: string;
}

export default function IslandPage({ params }: { params: Promise<{ slug: string }> }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { singlePage, loading, error, fetchPageByDocumentId } = useIslandPageStore();

  // Unwrap params using React.use()
  const unwrappedParams = React.use(params);

  // Fetch island data using documentId from params (slug is actually documentId)
  useEffect(() => {
    if (unwrappedParams.slug) {
      fetchPageByDocumentId(unwrappedParams.slug);
    }
  }, [unwrappedParams.slug, fetchPageByDocumentId]);

  // Show loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading island details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Show error state
  if (error || !singlePage) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Island Not Found</h1>
            <p className="text-gray-600 mb-4">{error || 'The requested island could not be found.'}</p>
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const islandData = singlePage;

  // Helper function to get image URL
  const getImageUrl = (image: ImageType) => {
    if (!image) return null;
    return image.formats?.large?.url || image.formats?.medium?.url || image.url;
  };

  // Gallery images (combine hero_section and gallery)
  const allImages = [
    ...(islandData.hero_section || []),
    ...(islandData.gallery || [])
  ];

  const nextImage = () => {
    if (allImages.length > 0) {
      setCurrentImageIndex((prev: number) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (allImages.length > 0) {
      setCurrentImageIndex((prev: number) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Gallery Section */}
        <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-gray-900">
          {allImages.length > 0 && (
            <Image
              src={getImageUrl(allImages[currentImageIndex]) || '/placeholder.jpg'}
              alt={`${islandData.name} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          )}
          {/* <div className="absolute inset-0 bg-black bg-opacity-30" /> */}

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 sm:p-3 transition-all shadow-lg"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 sm:p-3 transition-all shadow-lg"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {allImages.length > 0 && (
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center space-x-2">
              <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">{currentImageIndex + 1} / {allImages.length}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex space-x-2 sm:space-x-3">
            <button className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 sm:p-3 transition-all shadow-lg">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>
            <button className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 sm:p-3 transition-all shadow-lg">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-white">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
              {islandData.name}
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-200 mb-2 sm:mb-4">
              {islandData.short_description}
            </p>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 text-gray-300">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">Andaman & Nicobar Islands</span>
              </div>
            </div>
          </div>
        </div>        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 lg:-mt-12 relative z-10">
          <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              {/* Overview Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="text-sm text-gray-500">Best Time</span>
                      <p className="text-sm font-semibold text-gray-900">{islandData.best_time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <div>
                      <span className="text-sm text-gray-500">Duration</span>
                      <p className="text-sm font-semibold text-gray-900">{islandData.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Description with better formatting */}
                <div className="mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">About {islandData.name}</h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {islandData.short_description}
                  </p>
                </div>

                {/* Enhanced Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="group flex flex-col items-center text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                      <Waves className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      Pristine Beaches
                    </h3>
                    <p className="text-xs text-gray-600">
                      Crystal Clear Waters
                    </p>
                  </div>
                  <div className="group flex flex-col items-center text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="text-green-600 mb-3 group-hover:scale-110 transition-transform">
                      <Mountain className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      Adventure Sports
                    </h3>
                    <p className="text-xs text-gray-600">
                      Scuba & Snorkeling
                    </p>
                  </div>
                  <div className="group flex flex-col items-center text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                      <TreePine className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      Nature Walks
                    </h3>
                    <p className="text-xs text-gray-600">
                      Tropical Forests
                    </p>
                  </div>
                  <div className="group flex flex-col items-center text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="text-orange-600 mb-3 group-hover:scale-110 transition-transform">
                      <Car className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      Easy Access
                    </h3>
                    <p className="text-xs text-gray-600">
                      Regular Ferry Service
                    </p>
                  </div>
                </div>
              </div>

              {/* Hero Section Gallery */}
              {islandData.hero_section && islandData.hero_section.length > 0 && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                    Featured Views
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {islandData.hero_section.map((image: ImageType, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className="group relative aspect-[4/3] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <Image
                          src={getImageUrl(image) || '/placeholder.jpg'}
                          alt={`Featured view ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs font-medium">Featured View {index + 1}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Photo Gallery Section */}
              {islandData.gallery && islandData.gallery.length > 0 && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    Photo Gallery
                    <span className="text-sm font-normal text-gray-500 ml-2">({islandData.gallery.length} photos)</span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                    {islandData.gallery.slice(0, 12).map((image: ImageType, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(islandData.hero_section?.length + index || index)}
                        className="group relative aspect-square rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <Image
                          src={getImageUrl(image) || '/placeholder.jpg'}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="absolute top-2 right-2 bg-white/80 rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs font-semibold text-gray-800">{index + 1}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {islandData.gallery.length > 12 && (
                    <div className="mt-4 text-center">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        View all {islandData.gallery.length} photos →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Top Attractions with Enhanced Design */}
              {islandData.top_attractions && islandData.top_attractions.length > 0 && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                    Top Attractions
                    <span className="text-sm font-normal text-gray-500 ml-2">({islandData.top_attractions.length} places)</span>
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {islandData.top_attractions.map((attraction: AttractionType, index: number) => (
                      <div key={index} className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        {/* Use hero section images for attractions */}
                        {islandData.hero_section && islandData.hero_section[index] ? (
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={getImageUrl(islandData.hero_section[index]) || '/placeholder.jpg'}
                              alt={attraction.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            {/* Rating Badge */}
                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-sm font-bold text-gray-800">{attraction.rating}</span>
                            </div>
                            {/* Category Tag */}
                            <div className="absolute bottom-3 left-3 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                              <span className="text-xs font-semibold">Must Visit</span>
                            </div>
                          </div>
                        ) : (
                          <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                            <Star className="w-12 h-12 text-blue-300" />
                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-sm font-bold text-gray-800">{attraction.rating}</span>
                            </div>
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {attraction.name}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed mb-3">
                            {attraction.short_description}
                          </p>
                          {/* Action buttons */}
                          <div className="flex gap-2">
                            <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors">
                              Learn More
                            </button>
                            <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors">
                              <Heart className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Activities/Tags Section with Enhanced Design */}
              {islandData.tags && islandData.tags.length > 0 && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                    <Mountain className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    Activities & Experiences
                    <span className="text-sm font-normal text-gray-500 ml-2">({islandData.tags.length} activities)</span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {islandData.tags.map((tag: TagType, index: number) => (
                      <div key={index} className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Icon based on tag name */}
                        <div className="relative z-10 mb-3">
                          {tag.name.toLowerCase().includes('diving') || tag.name.toLowerCase().includes('snorkel') ? (
                            <Waves className="w-6 h-6 text-blue-600 mx-auto" />
                          ) : tag.name.toLowerCase().includes('trek') || tag.name.toLowerCase().includes('hike') ? (
                            <Mountain className="w-6 h-6 text-green-600 mx-auto" />
                          ) : tag.name.toLowerCase().includes('beach') ? (
                            <Waves className="w-6 h-6 text-blue-500 mx-auto" />
                          ) : (
                            <TreePine className="w-6 h-6 text-emerald-600 mx-auto" />
                          )}
                        </div>

                        <span className="relative z-10 text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                          {tag.name}
                        </span>

                        {/* Hover effect overlay */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 sm:top-8 space-y-4 sm:space-y-6">
                {/* Quick Info Card */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Quick Info
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-gray-700 font-medium">Best Time:</span>
                      <span className="text-sm font-bold text-blue-700">{islandData.best_time}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm text-gray-700 font-medium">Duration:</span>
                      <span className="text-sm font-bold text-green-700">{islandData.duration}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm text-gray-700 font-medium">Difficulty:</span>
                      <span className="text-sm font-bold text-orange-700">Easy</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm text-gray-700 font-medium">Activities:</span>
                      <span className="text-sm font-bold text-purple-700">{islandData.tags?.length || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    Plan Your Visit
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="tel:+918944999448"
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                    >
                      <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-200 transition-colors">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-green-700">Call Us</span>
                        <p className="text-xs text-green-600">+91 8944999448</p>
                      </div>
                    </a>
                    <a
                      href="mailto:info@saarthiandaman.com"
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                    >
                      <div className="bg-blue-100 p-2 rounded-full group-hover:bg-blue-200 transition-colors">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-blue-700">Email Us</span>
                        <p className="text-xs text-blue-600">info@saarthiandaman.com</p>
                      </div>
                    </a>
                    <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Inquire About Your Trip</span>
                    </button>
                  </div>
                </div>

                {/* Gallery Thumbnails */}
                {allImages.length > 0 && (
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Camera className="w-5 h-5 text-purple-600" />
                      Gallery
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {allImages.slice(0, 6).map((image: ImageType, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${currentImageIndex === index
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-transparent hover:border-gray-300'
                            }`}
                        >
                          <Image
                            src={getImageUrl(image) || '/placeholder.jpg'}
                            alt={`Gallery ${index + 1}`}
                            width={100}
                            height={100}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                          />
                        </button>
                      ))}
                    </div>
                    {allImages.length > 6 && (
                      <div className="mt-3 text-center">
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                          +{allImages.length - 6} more photos
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Weather Widget */}
                {/* <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-2">
                    <Waves className="w-5 h-5" />
                    Weather Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-100">Temperature:</span>
                      <span className="text-sm font-bold">28°C - 32°C</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-100">Season:</span>
                      <span className="text-sm font-bold">Tropical</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-100">Humidity:</span>
                      <span className="text-sm font-bold">70-80%</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}