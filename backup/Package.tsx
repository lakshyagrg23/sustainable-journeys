'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import useTravelStore from "../../store/travelStore";
import Image from 'next/image';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

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
  category?: string; // <-- add this if not present
  person?: string;
}

interface NormalizedPackage {
  id: number;
  documentId: string;
  title: string;
  image: string;
  duration: string;
  price: number;
  originalPrice: number;
  discount: number;
  description: string;
  rating: number;
  reviews: number;
  category?: string;
  person?: string;
}

const buildAssetUrl = (u?: string) => {
  if (!u) return '';
  if (u.startsWith('http')) return u;
  return `${API_BASE_URL}${u.startsWith('/') ? u : `/${u}`}`;
};

// Reusable component for the package card
// const PackageCard = ({ pkg }: { pkg: NormalizedPackage }) => {
//   const renderStars = (rating: number) =>
//     Array.from({ length: 5 }, (_, i) => (
//       <svg
//         key={i}
//         className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-orange-400' : 'text-gray-300'} fill-current`}
//         viewBox="0 0 20 20"
//       >
//         <path d="M10 15l-5.878 3.09 1.123-6.545L0 6.91l6.564-.955L10 0l3.436 5.955L20 6.91l-5.245 4.635L15.878 18z" />
//       </svg>
//     ));

//   return (
//     <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
//       <div className="relative h-64 bg-gray-200">
//         <Image
//           src={pkg.image}
//           alt={pkg.title}
//           fill
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           className="object-cover"
//           placeholder="empty"
//           onError={(e) => {
//             const target = e.target as HTMLImageElement;
//             target.src = '/path-to-placeholder-image.svg'; // Use a placeholder on error
//           }}
//         />
//         <div className="absolute top-4 left-4 bg-white/90 text-gray-900 rounded-full px-3 py-1 text-xs font-semibold">
//           {pkg.duration}
//         </div>
//         {pkg.discount > 0 && (
//           <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-3 py-1 text-xs font-bold">
//             {pkg.discount}% OFF
//           </div>
//         )}
//       </div>
//       <div className="p-6">
//         <h3 className="text-lg font-bold text-gray-900 mb-2">{pkg.title}</h3>
//         <div className="flex items-center mb-2">
//           {renderStars(pkg.rating)}
//           <span className="ml-2 text-xs text-gray-600">
//             {pkg.rating} ({pkg.reviews} reviews)
//           </span>
//         </div>
//         <p className="text-gray-600 text-sm line-clamp-2 mb-4">{pkg.description}</p>
//         <div className="flex items-center justify-between">
//           <div>
//             <span className="text-xl font-bold text-blue-600">₹{pkg.price.toLocaleString()}</span>
//             {pkg.originalPrice > pkg.price && (
//               <span className="text-sm text-gray-400 line-through ml-2">₹{pkg.originalPrice.toLocaleString()}</span>
//             )}
//           </div>
//           <Link
//             href={`/packages/${pkg.documentId}`}
//             className="inline-block bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
//           >
//             Book Package
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// Main component
const PackageSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const { packages, fetchPackages, loading, error } = useTravelStore();

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const normalizedPackages: NormalizedPackage[] = useMemo(() => {
    if (!packages) return [];
    const list: PackageApiModel[] = Array.isArray(packages) ? packages : (packages.data || []);
    return list.map(pkg => {
      const rawImg = pkg.images?.formats?.medium?.url || pkg.images?.formats?.small?.url || pkg.images?.url || '';
      const computedDiscount = pkg.discount && pkg.discount > 0
        ? pkg.discount
        : (pkg.original_price > pkg.price
          ? Math.round((1 - pkg.price / pkg.original_price) * 100)
          : 0);
      return {
        id: pkg.id,
        documentId: pkg.documentId,
        title: pkg.title,
        image: buildAssetUrl(rawImg),
        duration: pkg.duration || '—',
        price: pkg.price,
        originalPrice: pkg.original_price,
        discount: computedDiscount,
        description: pkg.short_description || (pkg.detailed_description ? pkg.detailed_description.slice(0, 140) + '...' : ''),
        rating: pkg.rating || 4,
        reviews: pkg.number_of_reviews || 0,
        category: pkg.category || '',
        person: pkg.person || '',
      };
    });
  }, [packages]);

  // Get unique categories from backend data, always show Family, Honeymoon, Adventure, Group in filter UI
  const categories = useMemo(() => {
    // Always show these categories in this order
    const baseCats = ['Family', 'Honeymoon', 'Adventure', 'Group'];
    // Get all unique categories from backend (case-insensitive, trimmed)
    const cats = Array.from(new Set(
      normalizedPackages
        .map(pkg => (pkg.category || '').trim().toLowerCase())
        .filter(Boolean)
    ));
    // Capitalize for display
    const displayCats = cats.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1));
    // Ensure baseCats always appear in the filter (even if not in backend data)
    const merged = baseCats.concat(displayCats.filter(c => !baseCats.includes(c) && c.toLowerCase() !== 'premium'));
    // Remove duplicates while preserving order
    const unique = Array.from(new Set(merged));
    return ['All', ...unique];
  }, [normalizedPackages]);

  // Filtered packages: category and price are independent
  const filteredPackages = useMemo(() => {
    let filtered = normalizedPackages;
    // Filter by category (exact match, except 'All')
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(pkg => (pkg.category || '').trim().toLowerCase() === selectedCategory.toLowerCase());
    }
    // Filter by price (dropdown)
    if (priceRange !== 'All') {
      filtered = filtered.filter(pkg => {
        // if (priceRange === 'Under 20000' && pkg.price < 20000) return true;
        if (priceRange === '20000-40000' && pkg.price >= 20000 && pkg.price <= 40000) return true;
        if (priceRange === '40000-80000' && pkg.price >= 40000 && pkg.price <= 80000) return true;
        if (priceRange === 'Above 80000' && pkg.price > 80000) return true;
        return false;
      });
    }
    return filtered;
  }, [normalizedPackages, selectedCategory, priceRange]);

  const totalSlides = filteredPackages.length;

  // Responsive: show 1 card at a time on mobile, 2 on desktop
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const getVisibleCards = () => {
    if (isMobile) {
      return totalSlides > 0 ? [filteredPackages[currentSlide]] : [];
    }
    const num = Math.min(2, totalSlides);
    return Array.from({ length: num }, (_, i) => filteredPackages[(currentSlide + i) % totalSlides]);
  };

  const nextSlide = () => setCurrentSlide(p => (p + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + totalSlides) % totalSlides);

  // ImageBlock for fallback
  const ImageBlock = ({ src, alt }: { src: string; alt: string; isMobileCard?: boolean }) => {//, isMobileCard = false
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
        className="object-contain"
        onError={() => setErr(true)}
        placeholder="empty"
      />
    );
  };

  // ref for category chips container so we can scroll selected chip into view on small screens
  const categoriesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!categoriesContainerRef.current) return;
    try {
      const selector = `[data-cat="${selectedCategory}"]`;
      const btn = categoriesContainerRef.current.querySelector(selector) as HTMLElement | null;
      if (btn && typeof btn.scrollIntoView === 'function') {
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    } catch (e: unknown) {
      console.error('Error scrolling category into view', e);
      // ignore
    }
  }, [selectedCategory]);

  // Preview modal state
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const openPreview = (src?: string) => {
    if (src) setPreviewSrc(src);
  };

  const closePreview = () => setPreviewSrc(null);

  if (loading) {
    return <div className="py-12 text-center  text-black">Loading packages...</div>;
  }
  if (error) {
    return <div className="py-12 text-center text-red-500">{error}</div>;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            🧳 Tour Packages
          </h2>
        </div>

        {/* Filter Section - stack on mobile, row on desktop */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mb-8 bg-gray-50 rounded-xl p-4">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={String(cat)}
                onClick={() => setSelectedCategory(String(cat))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
              >
                {String(cat)}
              </button>
            ))}
          </div>

          {/* Price Range Dropdown */}
          <select
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-black"
          >
            <option value="All">All Prices</option>
            <option value="20000-40000">₹20K - ₹40K</option>
            <option value="40000-80000">₹40K - ₹80K</option>
            <option value="Above 80000">Above ₹80K</option>
          </select>
        </div>


        {/* Package Cards with Navigation */}
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

            {/* Package Cards */}
            <div className={isMobile ? "mx-2" : "mx-8"}>
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-6`}>
                {getVisibleCards().map((pkg) => (
                  <div key={pkg.id}>
                    {/* Mobile Card Design */}
                    {isMobile ? (
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                        {/* Mobile Image Section - Square aspect ratio for 750x750 images */}
                        <div className="relative w-full aspect-square">
                          <div className="w-full h-full cursor-pointer" onClick={() => openPreview(pkg.image)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') openPreview(pkg.image); }}>
                            <ImageBlock src={pkg.image} alt={pkg.title} isMobileCard={true} />
                          </div>
                          {/* Duration Badge */}
                          <div className="absolute top-3 left-3">
                            <div className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                              ⏱️ {pkg.duration}
                            </div>
                          </div>
                          {/* Discount Badge */}
                          {pkg.discount > 0 && (
                            <div className="absolute top-3 right-3">
                              <div className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                                {pkg.discount}% OFF
                              </div>
                            </div>
                          )}
                          {/* Rating Overlay */}
                          <div className="absolute bottom-3 left-3">
                            <div className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <span className="text-yellow-400">⭐</span>
                              <span>{pkg.rating}</span>
                            </div>
                          </div>
                        </div>

                        {/* Mobile Content Section */}
                        <div className="p-4">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                            {pkg.title}
                          </h3>

                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                                {pkg.reviews} reviews
                              </span>
                            </div>
                          </div>

                          {/* Price and Action */}
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-orange-600">₹{pkg.price.toLocaleString()}</span>
                                {pkg.originalPrice > pkg.price && (
                                  <span className="text-sm text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                                )}
                              </div>
                              <span className="text-xs text-gray-500">{pkg.person}</span>
                            </div>
                            <Link
                              href={`/packages/${pkg.documentId}`}
                              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                              View Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Desktop Card Design */
                      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                        <div className="flex flex-col sm:flex-row h-auto sm:h-56">
                          {/* Desktop Image Section */}
                          <div className="relative w-full sm:w-2/5 h-40 sm:h-full">
                            <div className="w-full h-full cursor-pointer" onClick={() => openPreview(pkg.image)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') openPreview(pkg.image); }}>
                              <ImageBlock src={pkg.image} alt={pkg.title} />
                            </div>
                            {pkg.discount > 0 && (
                              <div className="absolute top-3 right-3">
                                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                  {pkg.discount}% OFF
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Desktop Content Section */}
                          <div className="flex-1 p-4 flex flex-col justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                                {pkg.title}
                              </h3>
                              <div className="space-y-1 mb-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <span className="text-orange-500">⏱️</span>
                                  <span>{pkg.duration}</span>
                                </div>
                              </div>
                              <div className="mb-3">
                                <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                                  {pkg.reviews} reviews
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                  <span className="text-yellow-400 text-sm">⭐</span>
                                  <span className="text-sm text-gray-600 ml-1">{pkg.rating}</span>
                                </div>
                                <div>
                                  <span className="text-lg font-bold text-orange-600">₹{pkg.price}</span>
                                  {pkg.originalPrice > pkg.price && (
                                    <span className="text-xs text-gray-400 line-through ml-1">₹{pkg.originalPrice}</span>
                                  )}
                                  <span className="text-xs text-gray-500 ml-1">{pkg.person}</span>
                                </div>
                              </div>
                              <Link
                                href={`/packages/${pkg.documentId}`}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 whitespace-nowrap"
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
            <div className="text-gray-400 text-6xl mb-4">🧳</div>
            <h3 className="text-xl text-gray-600 mb-2">No packages found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            href="/packages"
            className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-300"
          >
            View All Packages
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      {/* Image preview modal with blur background */}
      {previewSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/50"
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-full max-h-full w-full md:w-3/4" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-4 -right-4 z-50 bg-white hover:bg-gray-100 text-black rounded-full p-3 shadow-lg transition-colors duration-200"
              onClick={closePreview}
              aria-label="Close preview"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full h-[70vh] md:h-[80vh] rounded-xl overflow-hidden shadow-2xl">
              <Image
                width={800}
                height={600}
                src={previewSrc}
                alt="Preview"
                className="w-full h-full object-contain bg-blur-50"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PackageSection;