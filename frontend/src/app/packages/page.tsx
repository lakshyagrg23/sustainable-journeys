"use client";
// metadata moved to server layout for this route to avoid exporting metadata from a client component
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useTravelStore from '../../../store/travelStore';

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

interface PackageApiModel {
  id: number;
  documentId: string;
  title: string;
  short_description: string;
  duration: string;
  discount: number;
  price: number;
  original_price: number;
  rating: number;
  number_of_reviews: number;
  detailed_description: string;
  images?: ApiImage;
  gallery?: ApiImage[];
  category?: string;
  person?: string;
}

// Normalized package interface for display
interface Package {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: string;
  location: string;
  image: string;
  features: string[];
  category: string;
  rating: number;
  reviews: number;
  person?: string;
}

const buildAssetUrl = (u?: string) => {
  if (!u) return '';
  if (u.startsWith('http')) return u;
  return `${API_BASE_URL}${u.startsWith('/') ? u : `/${u}`}`;
};

const categoryColors = {
  Romance: "bg-pink-500",
  Family: "bg-green-500",
  Adventure: "bg-yellow-500",
  Honeymoon: "bg-rose-500",
  Group: "bg-indigo-500",
};

// Price ranges for filtering
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  //{ label: 'Under ₹20,000', min: 0, max: 20000 },
  { label: '₹20,000 - ₹40,000', min: 20000, max: 40000 },
  { label: '₹40,000 - ₹60,000', min: 40000, max: 60000 },
  { label: 'Above ₹60,000', min: 60000, max: Infinity }
];

// Categories for filtering (fixed set as requested)
const categories = ['All', 'Family', 'Honeymoon', 'Adventure', 'Group'];

// Helper function to determine category based on package data
const getPackageCategory = (pkg: PackageApiModel): string => {
  const title = pkg.title.toLowerCase();
  const description = (pkg.short_description || pkg.detailed_description || '').toLowerCase();

  // Classify as Adventure if descriptions mention trek/boat/diving/adventure keywords or price in mid-range
  const adventureKeywords = ['adventure', 'trek', 'dive', 'diving', 'snorkel', 'snorkeling', 'surf', 'jet-ski', 'boat', 'hike', 'rafting', 'kayak', 'water sports'];
  if (adventureKeywords.some(k => title.includes(k) || description.includes(k))) return 'Adventure';
  if (title.includes('group') || description.includes('group') || description.includes('groups')) return 'Group';
  if (title.includes('family') || description.includes('family')) return 'Family';
  if (title.includes('romance') || title.includes('honeymoon') || description.includes('romantic') || description.includes('couple')) return 'Honeymoon';
  if (title.includes('budget') || description.includes('budget') || pkg.price < 20000) return 'Budget';
  return 'Family'; // Default to Family
};

// Helper function to extract features from package data
const getPackageFeatures = (pkg: PackageApiModel): string[] => {
  const features = [];
  if (pkg.price > 40000) {
    features.push('Luxury Resort', 'Premium Service', 'Gourmet Dining');
  } else if (pkg.price > 25000) {
    features.push('4-Star Hotels', 'Guided Tours', 'Meals Included');
  } else {
    features.push('Budget Accommodation', 'Group Tours', 'Basic Meals');
  }

  // Add common features
  features.push('Transportation');

  return features;
};

function PackagesPage() {
  const { packages, fetchPackages, loading, error } = useTravelStore();

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0); // Index in priceRanges array
  const [sortBy, setSortBy] = useState('name'); // 'name', 'price-low', 'price-high', 'rating'

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const normalizedPackages = useMemo(() => {
    if (!packages) return [];

    const list: PackageApiModel[] = Array.isArray(packages)
      ? packages
      : (packages.data || []);

    return list.map(pkg => {
      const rawImg =
        pkg.images?.formats?.medium?.url ||
        pkg.images?.formats?.small?.url ||
        pkg.images?.url ||
        '';

      // prefer backend category when available, normalized to Title case
      const rawCat = pkg.category ? String(pkg.category).trim() : '';
      const normalizedCat = rawCat
        ? rawCat.charAt(0).toUpperCase() + rawCat.slice(1).toLowerCase()
        : getPackageCategory(pkg);

      return {
        id: pkg.id,
        documentId: pkg.documentId,
        title: pkg.title,
        description: pkg.short_description ||
          (pkg.detailed_description
            ? pkg.detailed_description.slice(0, 140) + '...'
            : 'Experience the beauty and culture of this amazing destination.'),
        price: pkg.price,
        originalPrice: pkg.original_price > pkg.price ? pkg.original_price : undefined,
        duration: pkg.duration || '5 Days / 4 Nights',
        location: 'Andaman Islands', // Default location since not in API
        image: buildAssetUrl(rawImg) || '/api/placeholder/400/300',
        features: getPackageFeatures(pkg),
        category: normalizedCat,
        rating: pkg.rating || 4.5,
        reviews: pkg.number_of_reviews || 0,
        person: pkg.person || 'per person' // Uncomment if 'person' field is added to API
      };
    });
  }, [packages]);

  // Filtered and sorted packages
  const filteredPackages = useMemo(() => {
    let filtered = normalizedPackages;

    // Filter by category
    if (selectedCategory !== 'All') {
      const desired = String(selectedCategory).toLowerCase();
      filtered = filtered.filter(pkg => String(pkg.category || '').toLowerCase() === desired);
    }

    // Filter by price range
    const priceRange = priceRanges[selectedPriceRange];
    filtered = filtered.filter(pkg => pkg.price >= priceRange.min && pkg.price <= priceRange.max);

    // Sort packages
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'name'
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [normalizedPackages, selectedCategory, selectedPriceRange, sortBy]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading packages...</p>
          </div>
        </div>
        <Footer />
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Packages</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => fetchPackages()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
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
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://andamantourtravel.com/assets/img/banner-or3.jpg"
            alt="Andaman Islands"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full text-center text-white px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title Section */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 drop-shadow-2xl">
                Discover Our <span className="text-cyan-400">Travel Packages</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl mb-4 md:mb-6 drop-shadow-lg max-w-2xl mx-auto">
                Embark on extraordinary journeys with our carefully curated travel packages
              </p>
            </div>

            {/* Compact Filter Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl max-w-5xl mx-auto">
              {/* Quick Category Filter */}
              <div className="mb-3 md:mb-4">
                <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 ${selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact Controls */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 items-center">
                {/* Price Range */}
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="text-gray-700 font-medium text-xs md:text-sm whitespace-nowrap hidden sm:inline">Price:</span>
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
                    className="flex-1 border border-gray-300 rounded-lg px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {priceRanges.map((range, index) => (
                      <option key={index} value={index}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="text-gray-700 font-medium text-xs md:text-sm whitespace-nowrap hidden sm:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price ↑</option>
                    <option value="price-high">Price ↓</option>
                    <option value="rating">Rating ↓</option>
                  </select>
                </div>

                {/* Results Count */}
                <div className="text-center col-span-2 md:col-span-1">
                  <span className="text-blue-600 font-bold text-base md:text-lg">{filteredPackages.length}</span>
                  <span className="text-gray-600 text-xs md:text-sm ml-1">packages found</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4">
              {selectedCategory === 'All' ? 'All Packages' : `${selectedCategory} Packages`}
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              {selectedCategory === 'All'
                ? 'From budget-friendly adventures to luxury escapes, discover the perfect journey'
                : `Perfectly crafted ${selectedCategory.toLowerCase()} packages for unforgettable memories`
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredPackages.length === 0 ? (
              <div className="col-span-full text-center py-8 md:py-12">
                <div className="text-gray-400 text-4xl md:text-5xl mb-3 md:mb-4">🔍</div>
                <h3 className="text-lg md:text-xl font-bold text-gray-600 mb-2">No Packages Found</h3>
                <p className="text-sm md:text-base text-gray-500 mb-4">
                  {selectedCategory !== 'All'
                    ? `No packages found in the ${selectedCategory} category with the selected price range.`
                    : 'No packages match your current filters.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedPriceRange(0);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => fetchPackages()}
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                  >
                    Refresh Packages
                  </button>
                </div>
              </div>
            ) : (
              filteredPackages.map((pkg: Package) => (
                <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-100 max-w-sm mx-auto">
                  {/* Package Image - Fixed aspect ratio for 750x750 images */}
                  <div className="relative overflow-hidden bg-gray-50">
                    <div className="relative w-full aspect-square">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Category Badge */}
                      <div className={`absolute top-2 left-2 ${categoryColors[pkg.category as keyof typeof categoryColors]} text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm`}>
                        {pkg.category}
                      </div>

                      {/* Discount Badge */}
                      {pkg.originalPrice && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                          Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                        </div>
                      )}

                      {/* Duration badge */}
                      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full font-medium shadow-sm flex items-center gap-1">
                        <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{pkg.duration}</span>
                      </div>

                      {/* Heart Icon */}
                      <button className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-500 p-1.5 rounded-full transition-all duration-200 shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Package Content - Compact */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {pkg.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3 h-3 fill-current ${i < Math.floor(pkg.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 ml-2 font-medium">{pkg.rating.toFixed(1)}</span>
                    </div>

                    <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-2">
                      {pkg.description}
                    </p>

                    {/* Features - Compact */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {pkg.features.slice(0, 2).map((feature: string, index: number) => (
                          <span key={index} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-medium">
                            {feature}
                          </span>
                        ))}
                        {pkg.features.length > 2 && (
                          <span className="text-xs text-gray-500 font-medium">+{pkg.features.length - 2} more</span>
                        )}
                      </div>
                    </div>

                    {/* Price and CTA - Compact */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-green-600">₹{pkg.price.toLocaleString()}</span>
                          {pkg.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{pkg.person}</span>
                      </div>

                      <Link href={`/packages/${pkg.documentId}`}>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>



      {/* <Footer /> */}
    </>
  );
}

export default PackagesPage;
