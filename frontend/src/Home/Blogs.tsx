'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBlogStore } from '../../store/blogStore';
import { format } from 'date-fns';

interface BlogImage {
  id: number;
  formats: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
  url: string;
}

interface BlogApiData {
  id: number;
  documentId: string;
  title: string;
  short_description: string;
  paragraph: string;
  author_name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover_image: BlogImage;
  gallery: BlogImage[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

// Helper function to build full image URL
const buildImageUrl = (url?: string) => {
  if (!url) return '';
  return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

};

// Helper to format date
const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'MMMM d, yyyy');
  } catch {
    return dateString;
  }
};

const BlogSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  // const [showFilters, setShowFilters] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { blogs, fetchBlogs, loading, error } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Use real data if available, otherwise use sample data
  const blogData = useMemo(() => {
    return blogs?.length > 0 ? blogs : [];
  }, [blogs]);

  // Filter and sort blogs based on selected criteria
  const filteredBlogs = useMemo(() => {
    let filtered = [...blogData];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => {
        const title = blog.title?.toLowerCase() || '';
        const description = blog.short_description?.toLowerCase() || '';

        switch (selectedCategory) {
          case 'Travel Guide':
            return title.includes('guide') || title.includes('tips') || description.includes('guide');
          case 'Adventure':
            return title.includes('adventure') || title.includes('activity') || description.includes('adventure');
          case 'Culture':
            return title.includes('culture') || title.includes('local') || description.includes('culture');
          case 'Food':
            return title.includes('food') || title.includes('cuisine') || description.includes('food');
          default:
            return true;
        }
      });
    }

    // Sort blogs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'latest':
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });

    return filtered;
  }, [blogData, selectedCategory, sortBy]);

  // Reset current index when filters change
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory, sortBy]);

  const categories = ['All', 'Travel Guide', 'Adventure', 'Culture', 'Food'];
  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'title', label: 'A-Z' }
  ];

  const hasActiveFilters = selectedCategory !== 'All' || sortBy !== 'latest';

  const clearFilters = () => {
    setSelectedCategory('All');
    setSortBy('latest');
  };

  const nextSlide = () => {
    if (currentIndex < filteredBlogs.length - 3) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Loop back to beginning
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      // Loop to end
      setCurrentIndex(filteredBlogs.length - 3 > 0 ? filteredBlogs.length - 3 : 0);
    }
  };

  // For smooth scrolling on mobile
  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;

    const scrollAmount = direction === 'left' ? -sliderRef.current.offsetWidth : sliderRef.current.offsetWidth;
    sliderRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Travel Stories & Tips
            </h2>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">Error loading blog posts: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (blogData.length === 0 && !loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Travel Stories & Tips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover insights, guides, and inspiration for your Nepal adventure
            </p>
          </div>

          {/* Beautiful empty state */}
          <div className="max-w-lg mx-auto text-center">
            <div className="relative mb-8">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full opacity-20 transform scale-110"></div>

              {/* Icon container */}
              <div className="relative bg-white rounded-full p-8 shadow-lg border border-gray-100 inline-block">
                <svg className="w-16 h-16 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Stories Coming Soon
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We&apos;re crafting amazing travel stories and insider tips about the beautiful Nepal Regions.
              Our blog will feature stunning destinations, local experiences, and practical travel guides.
            </p>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">What to expect:</h4>
              <ul className="space-y-2 text-left text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Hidden gems and secret beaches
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Local culture and traditions
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Adventure activity guides
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Travel tips and recommendations
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/treks"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Explore Treks
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Smart Header with Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          {/* Title Section */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Travel Stories & Tips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl lg:max-w-none">
              Discover insights, guides, and inspiration for your Nepal adventure
            </p>
          </div>

          {/* Filters Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 lg:flex-shrink-0">
            {/* Category Pills */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Summary */}
        {(hasActiveFilters || filteredBlogs.length !== blogData.length) && (
          <div className="mb-6 text-center lg:text-left">
            <p className="text-sm text-gray-600">
              Showing {filteredBlogs.length} of {blogData.length} blog posts
              {selectedCategory !== 'All' && (
                <span className="ml-1">in &ldquo;{selectedCategory}&rdquo;</span>
              )}
            </p>
          </div>
        )}

        {/* No Results Message */}
        {filteredBlogs.length === 0 && blogData.length > 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h3>
                <p className="text-gray-600 mb-4">
                  No blog posts match your current filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Blog Content */}
        {filteredBlogs.length > 0 && (
          <>
            {/* Desktop Slider */}
            <div className="relative hidden md:block">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
                >
                  {filteredBlogs.map((post: BlogApiData) => {
                    // Get best available image URL
                    const imageUrl =
                      post.cover_image?.formats?.large?.url ||
                      post.cover_image?.formats?.medium?.url ||
                      post.cover_image?.formats?.small?.url ||
                      post.cover_image?.url ||
                      '';

                    return (
                      <div
                        key={post.id}
                        className="w-1/3 flex-shrink-0 px-3"
                      >
                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                          <div className="h-48 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                            <Image
                              src={buildImageUrl(imageUrl)}
                              alt={post.title}
                              fill
                              sizes="(max-width:1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-6 flex flex-col flex-grow">
                            <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                              <span>{formatDate(post.publishedAt)}</span>
                              <span>By {post.author_name}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{post.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{post.short_description}</p>
                            <Link
                              href={`/blog/${post.documentId}`}
                              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                            >
                              Read More
                              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 border border-gray-200"
                aria-label="Previous blog posts"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 border border-gray-200"
                aria-label="Next blog posts"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Mobile Slider */}
            <div className="md:hidden relative">
              <div className="overflow-x-auto hide-scrollbar" ref={sliderRef}>
                <div className="flex space-x-4 py-2 px-1 snap-x snap-mandatory">
                  {filteredBlogs.map((post: BlogApiData) => {
                    // Get best available image URL
                    const imageUrl =
                      post.cover_image?.formats?.medium?.url ||
                      post.cover_image?.formats?.small?.url ||
                      post.cover_image?.url ||
                      '';

                    return (
                      <div
                        key={post.id}
                        className="w-[85vw] flex-shrink-0 snap-center"
                      >
                        <div className="bg-white rounded-xl overflow-hidden shadow-md h-full flex flex-col">
                          <div className="h-52 overflow-hidden relative">
                            <Image
                              src={buildImageUrl(imageUrl)}
                              alt={post.title}
                              fill
                              sizes="85vw"
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                              <span>{formatDate(post.publishedAt)}</span>
                              <span className="truncate ml-2">By {post.author_name}</span>
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">{post.title}</h3>
                            <p className="text-gray-600 text-xs mb-4 flex-grow line-clamp-2">{post.short_description}</p>
                            <Link
                              href={`/blog/${post.documentId}`}
                              className="inline-flex items-center text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors"
                            >
                              Read More
                              <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Controls */}
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={() => scrollSlider('left')}
                  className="bg-white rounded-full p-3 shadow hover:bg-gray-50 border border-gray-200 active:scale-95 transition-all"
                  aria-label="Previous blog post"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => scrollSlider('right')}
                  className="bg-white rounded-full p-3 shadow hover:bg-gray-50 border border-gray-200 active:scale-95 transition-all"
                  aria-label="Next blog post"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* View All Blogs Button */}
            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                View All Blogs
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </>
        )}

        <style jsx global>{`
          /* Hide scrollbar but allow scrolling */
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;  /* Chrome, Safari, Opera */
          }
        `}</style>
      </div>
    </section>
  );
};

export default BlogSection;